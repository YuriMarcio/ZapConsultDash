import { useState } from "react";
import { AppLayout } from "@/components/templates/AppLayout";
import { StatusPill } from "@/components/atoms/StatusPill";
import { ProdutoDialog } from "@/components/dialogs/ProdutoDialog";
import { CategoriasDialog } from "@/components/dialogs/CategoriasDialog";
import { WhatsappPreviewDialog } from "@/components/dialogs/WhatsappPreviewDialog";
import { ProdutosTabs } from "@/components/ui/ProdutosTabs";
import { useProducts, useCreateProduct, useUpdateProduct } from "@/api/services/products.service";
import { useCategories } from "@/api/services/categories.service";
import type { Product, Category } from "@/api/types";
import { Edit3, FolderPlus, ImagePlus, Plus, Search, Smartphone } from "lucide-react";

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
      className={`shrink-0 w-[120px] h-[88px] rounded-2xl overflow-hidden relative text-left transition-all duration-300 snap-start ${
        active
          ? "ring-[2.5px] ring-primary scale-[1.03] shadow-lg shadow-primary/10"
          : "ring-1 ring-border/60 hover:ring-accent/40 hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {image ? (
        <img src={image} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${color || "from-muted to-muted/40"}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />
      <div className="absolute top-2 right-2 bg-white/95 backdrop-blur text-[9px] font-bold font-mono px-1.5 py-[2px] rounded-md leading-none shadow-sm">
        {count}
      </div>
      <div className="absolute bottom-2.5 left-2.5 right-2.5">
        <div className="text-[11px] font-bold text-white leading-tight line-clamp-2 drop-shadow-sm">{label}</div>
      </div>
      {active && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-white rounded-full shadow" />
      )}
    </button>
  );
}

export function ProdutosPage() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: productsData } = useProducts();
  const { data: catsData } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const products = productsData?.data ?? [];
  const cats: Category[] = catsData?.data ?? [];

  const items = products.filter(
    (p) =>
      (filter === "Todos" || p.category === filter) &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase())),
  );

  const handleCreate = (p: Product) => {
    createProduct.mutate(p, { onSuccess: () => setOpen(false) });
  };

  const handleUpdate = (updated: Product) => {
    updateProduct.mutate(
      { id: updated.id, body: updated },
      { onSuccess: () => setEditingProduct(null) },
    );
  };

  return (
    <AppLayout title="Produtos">
      <ProdutosTabs />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">Cardápio</p>
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

      <div className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2.5 pb-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide">
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
            className="shrink-0 w-[100px] h-[88px] rounded-2xl border-2 border-dashed border-border/80 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-accent/50 hover:text-accent hover:bg-accent/[0.04] transition-all duration-200 snap-start"
          >
            <Plus className="size-5 stroke-[2.5]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.15em]">Nova</span>
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
                  <StatusPill tone="success" dot>Ativo</StatusPill>
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
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Preço</div>
                  <div className="text-base font-bold font-mono">
                    R$ {p.price.toFixed(2).replace(".", ",")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Estoque</div>
                  <div className={`text-base font-bold font-mono ${p.stock === 0 ? "text-rose-500" : p.stock < 10 ? "text-amber-500" : ""}`}>
                    {p.stock}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProdutoDialog open={open} onOpenChange={setOpen} onCreate={handleCreate} categories={cats} />
      <ProdutoDialog
        product={editingProduct}
        open={!!editingProduct}
        onOpenChange={(v) => !v && setEditingProduct(null)}
        onUpdate={handleUpdate}
        categories={cats}
      />
      <WhatsappPreviewDialog product={previewProduct} onClose={() => setPreviewProduct(null)} />
      <CategoriasDialog
        open={catOpen}
        onOpenChange={setCatOpen}
        categories={cats}
        products={products}
      />
    </AppLayout>
  );
}
