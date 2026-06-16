import { useState, useEffect } from "react";
import { WhatsappProductPreview } from "@/components/molecules/WhatsappProductPreview";
import type { Product, Category } from "@/api/types";
import { Plus, X, Upload, Save, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function ProdutoDialog({
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
    if (isEdit && onUpdate) onUpdate(payload);
    else if (onCreate) onCreate(payload);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-5 sm:px-6 pt-6 pb-4 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">Cardápio</p>
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
                  {catNames.map((c) => <option key={c} value={c}>{c}</option>)}
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
                    className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${active ? "bg-emerald-500" : "bg-muted-foreground/30"}`}
                  >
                    <span className={`absolute top-0.5 size-4 bg-white rounded-full shadow transition-transform ${active ? "translate-x-4" : "translate-x-0.5"}`} />
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
                {isEdit ? <><Save className="size-3.5" /> Salvar alterações</> : <><Plus className="size-3.5" /> Salvar produto</>}
              </button>
            </DialogFooter>
          </form>

          <aside className="order-1 lg:order-2 bg-muted/40 border-b lg:border-b-0 lg:border-l border-border p-5 sm:p-6 flex flex-col gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 mb-1 flex items-center gap-1.5">
                <Smartphone className="size-3" /> Preview do WhatsApp
              </p>
              <p className="text-[11px] text-muted-foreground">Como o cliente vai visualizar este produto no chat.</p>
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
