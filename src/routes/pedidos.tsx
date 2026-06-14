import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusPill } from "@/components/ui/StatusPill";
import { SourceBadge, SourceDot } from "@/components/ui/SourceBadge";
import {
  ORDERS as INITIAL_ORDERS,
  SOURCE_META,
  type Order,
  type OrderStatus,
  type OrderSource,
} from "@/lib/mock-data";
import { Bell, Search, Clock, CreditCard } from "lucide-react";

export const Route = createFileRoute("/pedidos")({
  head: () => ({ meta: [{ title: "Pedidos — Sinal" }] }),
  component: PedidosPage,
});

const COLUMNS: { id: OrderStatus; title: string; tone: "info" | "warning" | "success" | "muted" | "danger" }[] = [
  { id: "novo", title: "Novo Pedido", tone: "info" },
  { id: "preparo", title: "Em Preparo", tone: "warning" },
  { id: "entrega", title: "Saiu p/ Entrega", tone: "info" },
  { id: "finalizado", title: "Finalizado", tone: "success" },
  { id: "cancelado", title: "Cancelado", tone: "danger" },
];

const SOURCE_FILTERS: (OrderSource | "all")[] = [
  "all",
  "whatsapp",
  "ifood",
  "rappi",
  "ubereats",
  "99food",
  "cardapio",
];

function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [dragId, setDragId] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<OrderSource | "all">("all");
  const [search, setSearch] = useState("");

  const visible = orders.filter(
    (o) =>
      (sourceFilter === "all" || o.source === sourceFilter) &&
      (search === "" ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase())),
  );

  const move = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <AppLayout title="Pedidos">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
            Operação
          </p>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Quadro de Pedidos</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded flex-1 sm:flex-none min-w-0">
            <Search className="size-3.5 text-muted-foreground shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar pedido ou cliente..."
              className="bg-transparent text-xs outline-none w-full sm:w-56"
            />
          </div>
          <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded flex items-center gap-2 hover:opacity-90">
            <Bell className="size-3.5" /> Sons ON
          </button>
        </div>
      </div>

      {/* Source filter chips */}
      <div className="mb-6 flex gap-1.5 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
        {SOURCE_FILTERS.map((s) => {
          const active = sourceFilter === s;
          const count = s === "all" ? orders.length : orders.filter((o) => o.source === s).length;
          const label = s === "all" ? "Todos os canais" : SOURCE_META[s].label;
          return (
            <button
              key={s}
              onClick={() => setSourceFilter(s)}
              className={`shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition ${
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {s !== "all" && (
                <span
                  className={`size-2 rounded-full ${SOURCE_META[s].color}`}
                  aria-hidden
                />
              )}
              {label}
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                  active ? "bg-background/15" : "bg-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {COLUMNS.map((col) => {
          const items = visible.filter((o) => o.status === col.id);
          const total = items.reduce((s, i) => s + i.total, 0);
          return (
            <div
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) {
                  move(dragId, col.id);
                  setDragId(null);
                }
              }}
              className="bg-muted/40 border border-border rounded-xl p-3 min-h-[420px] animate-entrance"
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest">{col.title}</h3>
                  <span className="text-[10px] px-1.5 py-0.5 bg-card border border-border rounded font-mono">
                    {items.length}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">
                  R$ {total.toFixed(0)}
                </span>
              </div>

              <div className="space-y-2">
                {items.map((o) => {
                  const src = SOURCE_META[o.source];
                  return (
                    <div
                      key={o.id}
                      draggable
                      onDragStart={() => setDragId(o.id)}
                      className={`relative bg-card border border-border rounded-lg overflow-hidden cursor-grab active:cursor-grabbing hover:border-accent/50 hover:shadow-sm transition-all ring-1 ring-black/5`}
                    >
                      {/* Source color stripe */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${src.color}`} />
                      <div className="p-3 pl-4">
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <SourceDot source={o.source} />
                            <span className="text-[10px] font-mono font-bold truncate">
                              #{o.id}
                            </span>
                          </div>
                          <StatusPill
                            tone={
                              o.paymentStatus === "Aprovado"
                                ? "success"
                                : o.paymentStatus === "Pendente"
                                  ? "warning"
                                  : "danger"
                            }
                          >
                            {o.paymentStatus}
                          </StatusPill>
                        </div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="text-xs font-semibold truncate">{o.customer}</p>
                          <SourceBadge source={o.source} size="xs" />
                        </div>
                        <p className="text-[11px] text-muted-foreground mb-3 line-clamp-2">
                          {o.items.join(", ")}
                        </p>
                        {o.notes && (
                          <p className="text-[10px] text-warning-foreground bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded px-2 py-1 mb-2">
                            ⚠ {o.notes}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <Clock className="size-3" />
                            <span className="font-mono">{o.time}</span>
                            <span>·</span>
                            <CreditCard className="size-3" />
                            <span>{o.payment}</span>
                          </div>
                          <span className="text-xs font-bold font-mono">
                            R$ {o.total.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {items.length === 0 && (
                  <div className="text-center text-[11px] text-muted-foreground py-8 border border-dashed border-border rounded-lg">
                    Sem pedidos
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
