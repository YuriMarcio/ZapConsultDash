import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusPill } from "@/components/ui/StatusPill";
import { PRODUCTS, CATEGORIES, type Product, type Category } from "@/lib/mock-data";
import { Plus, Search, Edit3, ImagePlus, X, Upload, Smartphone, Save, FolderPlus, Trash2, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { WhatsappProductPreview } from "@/components/ui/WhatsappProductPreview";
import { ProdutosTabs } from "@/components/ui/ProdutosTabs";

export const Route = createFileRoute("/produtos")({
  head: () => ({ meta: [{ title: "Produtos — Sinal" }] }),
  component: ProdutosPage,
});


function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cats, setCats] = useState<Category[]>(CATEGORIES);
  const categoryNames = cats.map((c) => c.name);
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);


  const items = products.filter(
    (p) =>
      (filter === "Todos" || p.category === filter) &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase())),
  );

  const handleCreate = (p: Product) => {
    setProducts((prev) => [p, ...prev]);
    setOpen(false);
  };

  const handleUpdate = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    setEditingProduct(null);
  };

  return (
    <AppLayout title="Produtos">
      <ProdutosTabs />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
            Cardápio
          </p>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Produtos & Estoque</h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setCatOpen(true)}
            className="px-3 py-2 text-xs font-bold uppercase tracking-widest border border-border bg-card rounded flex items-center justify-center gap-2 hover:bg-muted flex-1 sm:flex-initial"
          >
            <FolderPlus className="size-3.5" /> Categorias
          </button>
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded flex items-center justify-center gap-2 hover:opacity-90 flex-1 sm:flex-initial"
          >
            <Plus className="size-3.5" /> Novo produto
          </button>
        </div>
      </div>

      {/* Strip de categorias com foto */}
      <div className="mb-5 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
        <div className="flex gap-3 pb-2 min-w-max">
          <CategoryChip
            label="Todos"
            count={products.length}
            active={filter === "Todos"}
            onClick={() => setFilter("Todos")}
          />
          {cats.map((c) => (
            <CategoryChip
              key={c.id}
              label={c.name}
              image={c.image}
              color={c.color}
              count={products.filter((p) => p.category === c.name).length}
              active={filter === c.name}
              onClick={() => setFilter(c.name)}
            />
          ))}
          <button
            onClick={() => setCatOpen(true)}
            className="shrink-0 w-[100px] h-[120px] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1.5 text-muted-foreground hover:border-accent/60 hover:text-accent hover:bg-accent/5 transition"
          >
            <Plus className="size-5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Nova</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded mb-6 w-full sm:w-72">
        <Search className="size-3.5 text-muted-foreground shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produto..."
          className="bg-transparent text-xs outline-none w-full"
        />
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((p, i) => (
          <div
            key={p.id}
            className="bg-card border border-border rounded-xl overflow-hidden ring-1 ring-black/5 animate-entrance group"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/40 flex items-center justify-center relative">
              <ImagePlus className="size-8 text-muted-foreground/50" />
              <div className="absolute top-2 left-2">
                {p.active ? (
                  <StatusPill tone="success" dot>
                    Ativo
                  </StatusPill>
                ) : (
                  <StatusPill tone="muted">Inativo</StatusPill>
                )}
              </div>
              <div className="absolute top-2 right-2 flex gap-1.5">
                <button
                  onClick={() => setPreviewProduct(p)}
                  title="Ver no WhatsApp"
                  className="size-7 rounded bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-emerald-500 hover:text-white"
                >
                  <Smartphone className="size-3.5" />
                </button>
                <button
                  onClick={() => setEditingProduct(p)}
                  title="Editar"
                  className="size-7 rounded bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="size-3.5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                {p.category}
              </div>
              <h3 className="text-sm font-bold tracking-tight mb-1">{p.name}</h3>
              <p className="text-[11px] text-muted-foreground mb-3 line-clamp-2 min-h-[2rem]">
                {p.description}
              </p>
              <div className="flex items-end justify-between pt-3 border-t border-border">
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
                    Preço
                  </div>
                  <div className="text-base font-bold font-mono">
                    R$ {p.price.toFixed(2).replace(".", ",")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wider">
                    Estoque
                  </div>
                  <div
                    className={`text-base font-bold font-mono ${
                      p.stock === 0 ? "text-rose-500" : p.stock < 10 ? "text-amber-500" : ""
                    }`}
                  >
                    {p.stock}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProdutoDialog
        open={open}
        onOpenChange={setOpen}
        onCreate={handleCreate}
        categories={cats}
      />
      <ProdutoDialog
        product={editingProduct}
        open={!!editingProduct}
        onOpenChange={(v) => !v && setEditingProduct(null)}
        onUpdate={handleUpdate}
        categories={cats}
      />
      <WhatsappPreviewDialog
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
      />
      <CategoriasDialog
        open={catOpen}
        onOpenChange={setCatOpen}
        categories={cats}
        onChange={setCats}
        products={products}
      />
    </AppLayout>
  );
}

function CategoryChip({
  label,
  image,
  color,
  count,
  active,
  onClick,
}: {
  label: string;
  image?: string;
  color?: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 w-[100px] h-[120px] rounded-xl overflow-hidden relative text-left transition ring-1 ${
        active
          ? "ring-2 ring-primary scale-[1.02] shadow-md"
          : "ring-border hover:ring-accent/40"
      }`}
    >
      {image ? (
        <img src={image} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${color || "from-muted to-muted/40"}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute top-1.5 right-1.5 bg-white/95 text-black text-[10px] font-bold font-mono px-1.5 rounded">
        {count}
      </div>
      <div className="absolute bottom-2 left-2 right-2">
        <div className="text-[11px] font-bold text-white leading-tight line-clamp-2">{label}</div>
      </div>
    </button>
  );
}

function CategoriasDialog({
  open,
  onOpenChange,
  categories,
  onChange,
  products,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  categories: Category[];
  onChange: (c: Category[]) => void;
  products: Product[];
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newCat: Category = {
      id: `cat${Date.now()}`,
      name: name.trim(),
      image,
      color: "from-accent/30 to-primary/20",
    };
    onChange([...categories, newCat]);
    setName("");
    setImage(undefined);
    if (fileRef.current) fileRef.current.value = "";
  };

  const remove = (id: string) => {
    onChange(categories.filter((c) => c.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-5 sm:px-6 pt-6 pb-4 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">
            Organização
          </p>
          <DialogTitle className="text-xl font-bold tracking-tight">Categorias</DialogTitle>
          <DialogDescription className="text-xs">
            Crie categorias com foto para destacar visualmente seu cardápio.
          </DialogDescription>
        </DialogHeader>

        <div className="px-5 sm:px-6 py-5 space-y-6">
          {/* Form criação */}
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-3 items-end">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Foto
              </label>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full h-[88px] border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground hover:border-accent/50 hover:bg-muted/50 transition overflow-hidden relative"
              >
                {image ? (
                  <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <Upload className="size-5" />
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Nome da categoria
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Açaí, Vegano, Especiais…"
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 flex items-center gap-2 justify-center"
            >
              <Plus className="size-3.5" /> Adicionar
            </button>
          </form>

          {/* Lista atual */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
              {categories.length} categorias cadastradas
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.name).length;
                return (
                  <div
                    key={c.id}
                    className="relative rounded-xl overflow-hidden border border-border bg-card group"
                  >
                    <div className="aspect-[4/3] relative">
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${c.color || "from-muted to-muted/40"} flex items-center justify-center`}>
                          <ImageIcon className="size-6 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
                      <button
                        onClick={() => remove(c.id)}
                        disabled={count > 0}
                        title={count > 0 ? "Remova os produtos vinculados primeiro" : "Excluir"}
                        className="absolute top-1.5 right-1.5 size-7 rounded bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-rose-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-background/90 disabled:hover:text-current"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-xs font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-white/70 font-mono">{count} {count === 1 ? "item" : "itens"}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="px-5 sm:px-6 py-4 border-t border-border">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90"
          >
            Concluído
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


function WhatsappPreviewDialog({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={!!product} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md p-0 gap-0 bg-card">
        <DialogHeader className="px-5 pt-5 pb-3 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 mb-1 flex items-center gap-1.5">
            <Smartphone className="size-3" /> Pré-visualização WhatsApp
          </p>
          <DialogTitle className="text-base font-bold">Como o cliente vai ver</DialogTitle>
          <DialogDescription className="text-xs">
            Esta é uma simulação fiel do card enviado no chat do WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><circle cx=%221%22 cy=%221%22 r=%221%22 fill=%22%23d4cdbf%22 opacity=%220.3%22/></svg>')] bg-[#e5ddd5] dark:bg-[#0b141a] flex items-center justify-center">
          {product && (
            <WhatsappProductPreview
              name={product.name}
              price={product.price}
              description={product.description}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProdutoDialog({
  open,
  onOpenChange,
  onCreate,
  onUpdate,
  product,
  categories,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreate?: (p: Product) => void;
  onUpdate?: (p: Product) => void;
  product?: Product | null;
  categories: Category[];
}) {
  const isEdit = !!product;
  const catNames = categories.map((c) => c.name);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(catNames[0] || "");

  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price.toFixed(2).replace(".", ","));
      setStock(String(product.stock));
      setDescription(product.description || "");
      setActive(product.active);
    } else {
      reset();
    }
  }, [product]);

  const reset = () => {
    setName("");
    setCategory(catNames[0] || "");
    setPrice("");
    setStock("");
    setDescription("");
    setActive(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    const payload: Product = {
      id: product?.id || `p${Date.now()}`,
      name: name.trim(),
      category,
      price: parseFloat(price.replace(",", ".")) || 0,
      stock: parseInt(stock) || 0,
      active,
      description: description.trim(),
    };

    if (isEdit && onUpdate) {
      onUpdate(payload);
    } else if (onCreate) {
      onCreate(payload);
    }
    reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-5 sm:px-6 pt-6 pb-4 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">
            Cardápio
          </p>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {isEdit ? "Editar produto" : "Novo produto"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {isEdit
              ? "Atualize as informações do produto no cardápio."
              : "Adicione um item ao seu cardápio. Ele ficará disponível no atendimento via WhatsApp."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-[1fr_320px]">
          <form onSubmit={submit} className="px-5 sm:px-6 py-5 space-y-5 order-2 lg:order-1">
            {/* Upload image */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Foto do produto
              </label>
              <button
                type="button"
                className="w-full aspect-[16/7] sm:aspect-[16/5] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted/50 hover:border-accent/50 transition-colors text-muted-foreground"
              >
                <Upload className="size-5" />
                <span className="text-xs font-semibold">Clique para enviar imagem</span>
                <span className="text-[10px]">PNG, JPG até 5MB · 4:3 recomendado</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                  Nome do produto *
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: X-Bacon Especial"
                  required
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                  Categoria *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                >
                  {catNames.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                  Preço (R$) *
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0,00"
                  inputMode="decimal"
                  required
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm font-mono outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                  Estoque
                </label>
                <input
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="0"
                  inputMode="numeric"
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm font-mono outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 px-3 py-2 bg-card border border-border rounded w-full cursor-pointer hover:bg-muted/50 transition">
                  <button
                    type="button"
                    onClick={() => setActive(!active)}
                    className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${
                      active ? "bg-emerald-500" : "bg-muted-foreground/30"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 size-4 bg-white rounded-full shadow transition-transform ${
                        active ? "translate-x-4" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                  <div className="flex-1">
                    <div className="text-xs font-semibold">{active ? "Ativo" : "Inativo"}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {active ? "Visível no cardápio" : "Oculto no WhatsApp"}
                    </div>
                  </div>
                </label>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ingredientes, modo de preparo, observações…"
                  rows={3}
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
                />
              </div>
            </div>

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-border -mx-5 sm:-mx-6 px-5 sm:px-6 pt-5">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-border rounded hover:bg-muted transition flex items-center justify-center gap-2"
              >
                <X className="size-3.5" /> Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                {isEdit ? (
                  <>
                    <Save className="size-3.5" /> Salvar alterações
                  </>
                ) : (
                  <>
                    <Plus className="size-3.5" /> Salvar produto
                  </>
                )}
              </button>
            </DialogFooter>
          </form>

          {/* Live WhatsApp preview */}
          <aside className="order-1 lg:order-2 bg-muted/40 border-b lg:border-b-0 lg:border-l border-border p-5 sm:p-6 flex flex-col gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 mb-1 flex items-center gap-1.5">
                <Smartphone className="size-3" /> Preview do WhatsApp
              </p>
              <p className="text-[11px] text-muted-foreground">
                Como o cliente vai visualizar este produto no chat.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center rounded-xl py-6 px-3 bg-[#e5ddd5] dark:bg-[#0b141a] ring-1 ring-black/10">
              <WhatsappProductPreview
                name={name}
                price={parseFloat(price.replace(",", ".")) || 0}
                description={description}
              />
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
