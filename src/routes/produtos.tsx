import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusPill } from "@/components/ui/StatusPill";
import { PRODUCTS } from "@/lib/mock-data";
import { Plus, Search, Edit3, ImagePlus } from "lucide-react";

export const Route = createFileRoute("/produtos")({
  head: () => ({ meta: [{ title: "Produtos — Sinal" }] }),
  component: ProdutosPage,
});

function ProdutosPage() {
  const categories = ["Todos", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const [filter, setFilter] = useState("Todos");

  const items = PRODUCTS.filter((p) => filter === "Todos" || p.category === filter);

  return (
    <AppLayout title="Produtos">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
            Cardápio
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Produtos & Estoque</h1>
        </div>
        <button className="px-3 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded flex items-center gap-2 hover:opacity-90">
          <Plus className="size-3.5" /> Novo produto
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex gap-1 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${filter === c
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:bg-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            placeholder="Buscar produto..."
            className="bg-transparent text-xs outline-none w-48"
          />
        </div>
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
                {p.active ? <StatusPill tone="success" dot>Ativo</StatusPill> : <StatusPill tone="muted">Inativo</StatusPill>}
              </div>
              <button className="absolute top-2 right-2 size-7 rounded bg-background/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 className="size-3.5" />
              </button>
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
    </AppLayout>
  );
}
