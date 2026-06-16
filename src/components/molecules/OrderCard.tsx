import { StatusPill } from "@/components/atoms/StatusPill";
import { SourceBadge, SourceDot } from "@/components/atoms/SourceBadge";
import { SOURCE_META, type Order } from "@/lib/mock-data";
import { Clock, CreditCard } from "lucide-react";

export function OrderCard({
  order,
  onDragStart,
}: {
  order: Order;
  onDragStart: () => void;
}) {
  const src = SOURCE_META[order.source];

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="relative bg-card border border-border rounded-lg overflow-hidden cursor-grab active:cursor-grabbing hover:border-accent/50 hover:shadow-sm transition-all ring-1 ring-black/5"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${src.color}`} />
      <div className="p-3 pl-4">
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <SourceDot source={order.source} />
            <span className="text-[10px] font-mono font-bold truncate">#{order.id}</span>
          </div>
          <StatusPill
            tone={
              order.paymentStatus === "Aprovado"
                ? "success"
                : order.paymentStatus === "Pendente"
                  ? "warning"
                  : "danger"
            }
          >
            {order.paymentStatus}
          </StatusPill>
        </div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-xs font-semibold truncate">{order.customer}</p>
          <SourceBadge source={order.source} size="xs" />
        </div>
        <p className="text-[11px] text-muted-foreground mb-3 line-clamp-2">
          {order.items.join(", ")}
        </p>
        {order.notes && (
          <p className="text-[10px] text-warning-foreground bg-amber-100 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded px-2 py-1 mb-2">
            ⚠ {order.notes}
          </p>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <Clock className="size-3" />
            <span className="font-mono">{order.time}</span>
            <span>·</span>
            <CreditCard className="size-3" />
            <span>{order.payment}</span>
          </div>
          <span className="text-xs font-bold font-mono">
            R$ {order.total.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>
    </div>
  );
}
