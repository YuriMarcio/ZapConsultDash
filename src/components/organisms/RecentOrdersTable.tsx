import { StatusPill } from "@/components/atoms/StatusPill";
import type { Order } from "@/api/types";

export function RecentOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="lg:col-span-7 bg-card border border-border rounded-xl ring-1 ring-black/5 overflow-hidden animate-entrance">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h2 className="font-bold tracking-tight">Pedidos recentes</h2>
        <button className="text-xs font-medium text-muted-foreground hover:text-foreground">
          Ver todos →
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-muted/50 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <tr>
            <th className="px-5 py-3">Pedido</th>
            <th className="px-5 py-3">Cliente</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map((o) => (
            <tr key={o.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-5 py-4 font-mono text-xs">#{o.id}</td>
              <td className="px-5 py-4">
                <div className="text-xs font-semibold">{o.customer}</div>
                <div className="text-[10px] text-muted-foreground">{o.phone}</div>
              </td>
              <td className="px-5 py-4">
                {o.status === "novo" && <StatusPill tone="info">Novo</StatusPill>}
                {o.status === "preparo" && <StatusPill tone="warning">Em preparo</StatusPill>}
                {o.status === "entrega" && <StatusPill tone="info">Saiu p/ entrega</StatusPill>}
                {o.status === "finalizado" && <StatusPill tone="success">Entregue</StatusPill>}
                {o.status === "cancelado" && <StatusPill tone="danger">Cancelado</StatusPill>}
              </td>
              <td className="px-5 py-4 text-right font-mono text-xs font-semibold">
                R$ {o.total.toFixed(2).replace(".", ",")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
