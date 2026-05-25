import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { SALES_DATA, TOP_PRODUCTS, ORDERS } from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RefreshCw, Smartphone } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Sinal" }] }),
  component: DashboardPage,
});

function FakeQR() {
  // pseudo-random grid for visual QR
  const cells = Array.from({ length: 21 * 21 }, (_, i) => {
    const x = i % 21;
    const y = Math.floor(i / 21);
    const corner =
      (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
    const inner =
      ((x === 0 || x === 6) && y >= 0 && y <= 6) ||
      ((y === 0 || y === 6) && x >= 0 && x <= 6) ||
      ((x === 14 || x === 20) && y <= 6) ||
      ((y === 0 || y === 6) && x >= 14 && x <= 20) ||
      ((x === 0 || x === 6) && y >= 14) ||
      ((y === 14 || y === 20) && x <= 6) ||
      (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
      (x >= 16 && x <= 18 && y >= 2 && y <= 4) ||
      (x >= 2 && x <= 4 && y >= 16 && y <= 18);
    if (corner) return inner;
    return (x * 7 + y * 13 + ((x * y) % 5)) % 3 === 0;
  });
  return (
    <div
      className="grid bg-stone-50 dark:bg-muted p-3 rounded-lg"
      style={{ gridTemplateColumns: "repeat(21, 1fr)", width: 192, height: 192 }}
    >
      {cells.map((on, i) => (
        <div key={i} className={on ? "bg-foreground" : "bg-transparent"} />
      ))}
    </div>
  );
}

function DashboardPage() {
  const recent = ORDERS.slice(0, 5);

  return (
    <AppLayout title="Dashboard">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
            Visão Geral
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Bem-vindo de volta, Matheus</h1>
        </div>
        <span className="text-xs font-mono text-muted-foreground uppercase">
          Última atualização: 14:32:01
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Vendas Hoje" value="R$ 4.829,00" delta="+12%" delayMs={0} />
        <KpiCard label="Ticket Médio" value="R$ 84,20" delta="+4%" delayMs={80} />
        <KpiCard label="Pedidos Ativos" value="14" delta="Estável" deltaTone="muted" delayMs={160} />
        <KpiCard label="Tempo Resposta" value="1.2min" delta="-32%" deltaTone="success" delayMs={240} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Conversas Ativas" value="38" delayMs={0} />
        <KpiCard label="Taxa de Conversão" value="42,3%" delta="+6%" delayMs={80} />
        <KpiCard label="Pedidos Finalizados" value="126" delayMs={160} />
        <KpiCard label="Cancelados" value="4" delta="-2" deltaTone="muted" delayMs={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold tracking-tight">Status do Canal</h2>
            <StatusPill tone="success" dot>
              Conectado
            </StatusPill>
          </div>

          <div className="flex flex-col items-center justify-center">
            <FakeQR />
            <div className="text-center mt-5">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold">
                <Smartphone className="size-3.5" />
                iPhone 14 Pro Max • Matriz
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                +55 11 99312-1100 · Evolution API
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Mensagens
              </div>
              <div className="text-sm font-bold mt-1 font-mono">1.284</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Última sync
              </div>
              <div className="text-sm font-bold mt-1 font-mono">2min</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Latência
              </div>
              <div className="text-sm font-bold mt-1 font-mono text-accent">98ms</div>
            </div>
          </div>

          <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition-all">
            <RefreshCw className="size-3.5" /> Sincronizar canal
          </button>
        </div>

        <div className="lg:col-span-7 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold tracking-tight">Vendas da semana</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Comparativo com semana anterior
              </p>
            </div>
            <div className="flex gap-1 text-[10px] font-bold uppercase tracking-widest">
              {["7D", "30D", "90D"].map((p, i) => (
                <button
                  key={p}
                  className={
                    i === 0
                      ? "px-2.5 py-1 bg-primary text-primary-foreground rounded"
                      : "px-2.5 py-1 text-muted-foreground hover:bg-muted rounded"
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={SALES_DATA}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="vendas"
                stroke="var(--color-accent)"
                strokeWidth={2}
                fill="url(#g1)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
              {recent.map((o) => (
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

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance">
            <h2 className="font-bold tracking-tight mb-4">Produtos mais vendidos</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={TOP_PRODUCTS} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} width={110} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="vendas" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 bg-primary rounded-xl text-primary-foreground flex items-center justify-between animate-entrance">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-1">
                Próxima Automação
              </p>
              <h4 className="text-sm font-medium">
                Reengajamento de clientes inativos (30 dias)
              </h4>
            </div>
            <div className="flex -space-x-2">
              <div className="size-8 rounded-full border-2 border-primary bg-primary/70 flex items-center justify-center text-[10px] font-bold">
                +4
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
