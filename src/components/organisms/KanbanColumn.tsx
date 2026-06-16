import { OrderCard } from "@/components/molecules/OrderCard";
import { StatusPill } from "@/components/atoms/StatusPill";
import type { Order, OrderStatus } from "@/api/types";

type ColumnConfig = {
  id: OrderStatus;
  title: string;
  tone: "info" | "warning" | "success" | "muted" | "danger";
};

export function KanbanColumn({
  col,
  items,
  onDragStart,
  onDrop,
}: {
  col: ColumnConfig;
  items: Order[];
  onDragStart: (id: string) => void;
  onDrop: () => void;
}) {
  const total = items.reduce((s, i) => s + i.total, 0);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
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
        {items.map((o) => (
          <OrderCard key={o.id} order={o} onDragStart={() => onDragStart(o.id)} />
        ))}
        {items.length === 0 && (
          <div className="text-center text-[11px] text-muted-foreground py-8 border border-dashed border-border rounded-lg">
            Sem pedidos
          </div>
        )}
      </div>
    </div>
  );
}
