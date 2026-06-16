import { useEffect, useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import type { Order, OrderStatus } from "@/api/types";

const COLUMNS: { id: OrderStatus; title: string; tone: "info" | "warning" | "success" | "muted" | "danger" }[] = [
  { id: "novo", title: "Novo Pedido", tone: "info" },
  { id: "preparo", title: "Em Preparo", tone: "warning" },
  { id: "entrega", title: "Saiu p/ Entrega", tone: "info" },
  { id: "finalizado", title: "Finalizado", tone: "success" },
  { id: "cancelado", title: "Cancelado", tone: "danger" },
];

export function KanbanBoard({
  orders,
  onStatusChange,
}: {
  orders: Order[];
  onStatusChange?: (id: string, status: OrderStatus) => void;
}) {
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);
  const [dragId, setDragId] = useState<string | null>(null);

  useEffect(() => { setLocalOrders(orders); }, [orders]);

  const move = (id: string, status: OrderStatus) => {
    setLocalOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    onStatusChange?.(id, status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
      {COLUMNS.map((col) => {
        const items = localOrders.filter((o) => o.status === col.id);
        return (
          <KanbanColumn
            key={col.id}
            col={col}
            items={items}
            onDragStart={(id) => setDragId(id)}
            onDrop={() => {
              if (dragId) {
                move(dragId, col.id);
                setDragId(null);
              }
            }}
          />
        );
      })}
    </div>
  );
}
