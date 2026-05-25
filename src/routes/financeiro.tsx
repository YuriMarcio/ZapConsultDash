import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusPill } from "@/components/ui/StatusPill";
import { FINANCE } from "@/lib/mock-data";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownToLine, Link as LinkIcon, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro — Sinal" }] }),
  component: FinanceiroPage,
});

const MONTHLY = [
  { mes: "Jan", receita: 28400 },
  { mes: "Fev", receita: 31200 },
  { mes: "Mar", receita: 29800 },
  { mes: "Abr", receita: 34500 },
  { mes: "Mai", receita: 38900 },
  { mes: "Jun", receita: 42300 },
];

function FinanceiroPage() {
  return (
    <AppLayout title="Financeiro">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
            Carteira
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
        </div>
        <button className="px-3 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded flex items-center gap-2 hover:opacity-90">
          <ArrowDownToLine className="size-3.5" /> Solicitar saque
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Saldo Disponível" value="R$ 12.480,30" delta="Sacar" deltaTone="success" />
        <KpiCard label="A Receber" value="R$ 3.210,00" delayMs={80} />
        <KpiCard label="Faturamento Mensal" value="R$ 42.300,00" delta="+8,7%" delayMs={160} />
        <KpiCard label="Taxas (mês)" value="R$ 1.847,20" delta="-4%" deltaTone="muted" delayMs={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
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
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="receita" stroke="var(--color-accent)" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-4 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold tracking-tight">Mercado Pago</h2>
            <StatusPill tone="success" dot>Conectado</StatusPill>
          </div>
          <p className="text-xs text-muted-foreground mb-6">Recebe pagamentos automaticamente via Pix e cartão.</p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Conta</span>
              <span className="font-mono font-semibold">mateus@central...</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Webhook</span>
              <span className="font-mono font-semibold text-accent flex items-center gap-1">
                <ShieldCheck className="size-3" /> Verificado
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Taxa Pix</span>
              <span className="font-mono font-semibold">0,49%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Taxa cartão</span>
              <span className="font-mono font-semibold">3,79%</span>
            </div>
          </div>

          <button className="w-full px-3 py-2 text-xs font-semibold border border-border rounded bg-muted flex items-center justify-center gap-2 hover:bg-muted/60">
            <LinkIcon className="size-3.5" /> Gerenciar integração
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl ring-1 ring-black/5 overflow-hidden animate-entrance">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-bold tracking-tight">Extrato</h2>
          <div className="flex gap-1 text-[10px] font-bold uppercase tracking-widest">
            {["Tudo", "Aprovados", "Pendentes", "Estornados"].map((t, i) => (
              <button key={t} className={i === 0 ? "px-2.5 py-1 bg-primary text-primary-foreground rounded" : "px-2.5 py-1 text-muted-foreground hover:bg-muted rounded"}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <tr>
              <th className="px-5 py-3">Descrição</th>
              <th className="px-5 py-3">Data</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {FINANCE.map((f) => (
              <tr key={f.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4 text-xs font-medium">{f.description}</td>
                <td className="px-5 py-4 text-xs text-muted-foreground font-mono">{f.date}</td>
                <td className="px-5 py-4">
                  {f.status === "Aprovado" && <StatusPill tone="success">Aprovado</StatusPill>}
                  {f.status === "Pendente" && <StatusPill tone="warning">Pendente</StatusPill>}
                  {f.status === "Estornado" && <StatusPill tone="danger">Estornado</StatusPill>}
                </td>
                <td className={`px-5 py-4 text-right font-mono text-xs font-bold ${f.amount > 0 ? "text-accent" : "text-rose-500"}`}>
                  {f.amount > 0 ? "+" : ""}R$ {Math.abs(f.amount).toFixed(2).replace(".", ",")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
