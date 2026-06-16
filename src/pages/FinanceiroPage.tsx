import { useState } from "react";
import { AppLayout } from "@/components/templates/AppLayout";
import { KpiCard } from "@/components/atoms/KpiCard";
import { FinanceiroChart } from "@/components/organisms/FinanceiroChart";
import { MercadoPagoCard } from "@/components/organisms/MercadoPagoCard";
import { FinanceiroExtrato } from "@/components/organisms/FinanceiroExtrato";
import { useFinanceSummary, useWithdraw } from "@/api/services/finance.service";
import { ArrowDownToLine } from "lucide-react";

function fmt(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function FinanceiroPage() {
  const { data } = useFinanceSummary();
  const withdraw = useWithdraw();
  const [pixKey, setPixKey] = useState("");
  const s = data?.data;

  const handleWithdraw = () => {
    if (!s?.balance || !pixKey.trim()) return;
    withdraw.mutate({ amount: s.balance, pixKey });
  };

  return (
    <AppLayout title="Financeiro">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
            Carteira
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
        </div>
        <button
          onClick={handleWithdraw}
          disabled={withdraw.isPending}
          className="px-3 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded flex items-center gap-2 hover:opacity-90 disabled:opacity-60"
        >
          <ArrowDownToLine className="size-3.5" />
          {withdraw.isPending ? "Solicitando..." : "Solicitar saque"}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Saldo Disponível"   value={s ? fmt(s.balance)         : "—"} delta="Sacar"  deltaTone="success" />
        <KpiCard label="A Receber"          value={s ? fmt(s.toReceive)       : "—"} delayMs={80}   />
        <KpiCard label="Faturamento Mensal" value={s ? fmt(s.monthlyRevenue)  : "—"} delta="+8,7%"  delayMs={160} />
        <KpiCard label="Taxas (mês)"        value={s ? fmt(s.monthlyFees)     : "—"} delta="-4%"    deltaTone="muted" delayMs={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-8">
          <FinanceiroChart />
        </div>
        <div className="lg:col-span-4">
          <MercadoPagoCard />
        </div>
      </div>

      <FinanceiroExtrato />
    </AppLayout>
  );
}
