import { useTopProducts } from "@/api/services/analytics.service";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function TopProductsChart() {
  const { data } = useTopProducts({ limit: 5 });
  const chartData = data?.data ?? [];

  return (
    <div className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance">
      <h2 className="font-bold tracking-tight mb-4">Produtos mais vendidos</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis dataKey="name" type="category" stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} width={110} />
          <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
          <Bar dataKey="vendas" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
