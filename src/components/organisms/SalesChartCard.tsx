import { useState } from "react";
import { useSalesChart } from "@/api/services/analytics.service";
import type { SalesChartRequest } from "@/api/types";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const PERIOD_MAP: { label: string; period: SalesChartRequest["period"] }[] = [
  { label: "7D", period: "week" },
  { label: "30D", period: "month" },
  { label: "90D", period: "month" },
];

export function SalesChartCard() {
  const [periodIdx, setPeriodIdx] = useState(0);
  const { data } = useSalesChart({ period: PERIOD_MAP[periodIdx].period });
  const chartData = data?.data ?? [];

  return (
    <div className="lg:col-span-7 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold tracking-tight">Vendas da semana</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Comparativo com semana anterior</p>
        </div>
        <div className="flex gap-1 text-[10px] font-bold uppercase tracking-widest">
          {PERIOD_MAP.map(({ label }, i) => (
            <button
              key={label}
              onClick={() => setPeriodIdx(i)}
              className={
                i === periodIdx
                  ? "px-2.5 py-1 bg-primary text-primary-foreground rounded"
                  : "px-2.5 py-1 text-muted-foreground hover:bg-muted rounded"
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
          <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
          <Area type="monotone" dataKey="vendas" stroke="var(--color-accent)" strokeWidth={2} fill="url(#g1)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
