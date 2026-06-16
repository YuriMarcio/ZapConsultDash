import { useState, useRef } from "react";
import type { Category, Product } from "@/api/types";
import { useCreateCategory, useDeleteCategory } from "@/api/services/categories.service";
import { Plus, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function CategoriasDialog({
  open,
  onOpenChange,
  categories,
  products,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  categories: Category[];
  products: Product[];
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();

  const handleFile = (f: File | null | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createCategory.mutate(
      { name: name.trim(), image, color: "from-accent/30 to-primary/20" },
      {
        onSuccess: () => {
          setName("");
          setImage(undefined);
          if (fileRef.current) fileRef.current.value = "";
        },
      },
    );
  };

  const remove = (id: string) => deleteCategory.mutate(id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="px-5 sm:px-6 pt-6 pb-4 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">Organização</p>
          <DialogTitle className="text-xl font-bold tracking-tight">Categorias</DialogTitle>
          <DialogDescription className="text-xs">
            Crie categorias com foto para destacar visualmente seu cardápio.
          </DialogDescription>
        </DialogHeader>

        <div className="px-5 sm:px-6 py-5 space-y-6">
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
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
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
            <button type="submit" className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 flex items-center gap-2 justify-center">
              <Plus className="size-3.5" /> Adicionar
            </button>
          </form>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
              {categories.length} categorias cadastradas
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.name).length;
                return (
                  <div key={c.id} className="relative rounded-2xl overflow-hidden border border-border/80 bg-card group shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="aspect-[4/3] relative">
                      {c.image ? (
                        <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${c.color || "from-muted to-muted/40"} flex items-center justify-center`}>
                          <ImageIcon className="size-7 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <button
                        onClick={() => remove(c.id)}
                        disabled={count > 0}
                        title={count > 0 ? "Remova os produtos vinculados primeiro" : "Excluir"}
                        className="absolute top-2 right-2 size-7 rounded-lg bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-rose-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-background/90 disabled:hover:text-current shadow-sm"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <div className="text-[12px] font-bold text-white leading-tight drop-shadow-sm">{c.name}</div>
                        <div className="text-[10px] text-white/70 font-mono mt-0.5">{count} {count === 1 ? "item" : "itens"}</div>
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
