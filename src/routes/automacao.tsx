import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AUTOMATIONS } from "@/lib/mock-data";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/automacao")({
  head: () => ({ meta: [{ title: "Automações — Sinal" }] }),
  component: AutomacaoPage,
});

function AutomacaoPage() {
  const [items, setItems] = useState(AUTOMATIONS.map((a) => ({ ...a })));
  const [selectedId, setSelectedId] = useState(items[0].id);
  const selected = items.find((i) => i.id === selectedId)!;

  const toggle = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i)));
  };

  const updateBody = (body: string) => {
    setItems((prev) => prev.map((i) => (i.id === selectedId ? { ...i, body } : i)));
  };

  const preview = selected.body
    .replace(/{{nome}}/g, "Ana Clara")
    .replace(/{{pedido}}/g, "10293")
    .replace(/{{valor}}/g, "142,50");

  return (
    <AppLayout title="Automação">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
          Mensagens
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Automações</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure respostas automáticas e disparos por evento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-2">
          {items.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${selectedId === a.id
                ? "bg-card border-accent ring-1 ring-accent/30"
                : "bg-card border-border hover:border-muted-foreground/40"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`size-8 rounded flex items-center justify-center ${a.enabled ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"}`}>
                    <Zap className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">{a.title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                      {a.body}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(a.id);
                  }}
                  className={`w-9 h-5 rounded-full relative transition-colors shrink-0 ${a.enabled ? "bg-accent" : "bg-muted-foreground/30"}`}
                >
                  <span className={`absolute top-0.5 size-4 bg-white rounded-full transition-transform ${a.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold tracking-tight">{selected.title}</h2>
              <span className="text-[10px] font-mono text-muted-foreground">
                {selected.enabled ? "ATIVO" : "INATIVO"}
              </span>
            </div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Mensagem
            </label>
            <textarea
              value={selected.body}
              onChange={(e) => updateBody(e.target.value)}
              rows={5}
              className="mt-2 w-full bg-muted border border-border rounded-md p-3 text-sm outline-none focus:border-accent resize-none"
            />
            <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
              {["{{nome}}", "{{pedido}}", "{{valor}}"].map((v) => (
                <code key={v} className="px-2 py-1 bg-muted border border-border rounded font-mono">
                  {v}
                </code>
              ))}
            </div>
          </div>

          <div className="bg-primary text-primary-foreground rounded-xl p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">
              Preview
            </p>
            <div className="bg-accent text-accent-foreground rounded-2xl rounded-br-sm p-3 max-w-md text-sm">
              {preview}
              <div className="text-[10px] mt-1 text-accent-foreground/70 text-right">14:32 ✓✓</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
