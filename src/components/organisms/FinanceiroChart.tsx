import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const MONTHLY = [
  { mes: "Jan", receita: 28400 },
  { mes: "Fev", receita: 31200 },
  { mes: "Mar", receita: 29800 },
  { mes: "Abr", receita: 34500 },
  { mes: "Mai", receita: 38900 },
  { mes: "Jun", receita: 42300 },
];

export function FinanceiroChart() {
  return (
    <div className="lg:col-span-8 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance">
      <h2 className="font-bold tracking-tight mb-1">Receita mensal</h2>
      <p className="text-xs text-muted-foreground mb-6">Últimos 6 meses</p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={MONTHLY}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="mes" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis
            stroke="var(--color-muted-foreground)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Area type="monotone" dataKey="receita" stroke="var(--color-accent)" strokeWidth={2} fill="url(#rev)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
