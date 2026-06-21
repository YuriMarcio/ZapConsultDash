import { useState } from "react";
import { AppLayout } from "@/components/templates/AppLayout";
import { SourceFilterBar } from "@/components/organisms/SourceFilterBar";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { useOrders } from "@/api/services/orders.service";
import { useUpdateOrder } from "@/api/services/orders.service";
import { useMe } from "@/api/services/auth.service";
import type { OrderSource, OrderStatus } from "@/api/types";
import { Bell, Search } from "lucide-react";

const SOURCES: (OrderSource | "all")[] = ["all", "whatsapp", "ifood", "rappi", "ubereats", "99food", "cardapio"];

export function PedidosPage() {
  const { data: me } = useMe();
  const hasMultiChannel = (me?.data?.features ?? []).includes("pedidos_multi_canal");

  const [sourceFilter, setSourceFilter] = useState<OrderSource | "all">("all");
  const [search, setSearch] = useState("");

  const { data } = useOrders();
  const updateOrder = useUpdateOrder();
  const allOrders = data?.data ?? [];

  const effectiveSourceFilter = hasMultiChannel ? sourceFilter : "whatsapp";

  const visible = allOrders.filter(
    (o) =>
      (effectiveSourceFilter === "all" || o.source === effectiveSourceFilter) &&
      (search === "" ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase())),
  );

  const counts = Object.fromEntries(
    SOURCES.map((s) => [
      s,
      s === "all" ? allOrders.length : allOrders.filter((o) => o.source === s).length,
    ]),
  ) as Record<OrderSource | "all", number>;

  const handleStatusChange = (id: string, status: OrderStatus) => {
    updateOrder.mutate({ id, body: { status } });
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

      {hasMultiChannel && (
        <SourceFilterBar active={sourceFilter} counts={counts} onChange={setSourceFilter} />
      )}

      <KanbanBoard orders={visible} onStatusChange={handleStatusChange} />
    </AppLayout>
  );
}

