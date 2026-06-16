import { AppLayout } from "@/components/templates/AppLayout";
import { KpiCard } from "@/components/atoms/KpiCard";
import { ChannelStatusCard } from "@/components/organisms/ChannelStatusCard";
import { SalesChartCard } from "@/components/organisms/SalesChartCard";
import { RecentOrdersTable } from "@/components/organisms/RecentOrdersTable";
import { TopProductsChart } from "@/components/organisms/TopProductsChart";
import { useDashboardSummary } from "@/api/services/analytics.service";
import { useOrders } from "@/api/services/orders.service";

function fmt(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function DashboardPage() {
  const { data: summary } = useDashboardSummary();
  const { data: ordersData } = useOrders({ limit: 5 });
  const s = summary?.data;
  const recent = ordersData?.data ?? [];

  return (
    <AppLayout title="Dashboard">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
            Visão Geral
          </p>
          <h1 className="text-2xl font-bold tracking-tight">Bem-vindo de volta</h1>
        </div>
        <span className="text-xs font-mono text-muted-foreground uppercase">
          Última atualização: {new Date().toLocaleTimeString("pt-BR")}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Vendas Hoje"    value={s ? fmt(s.salesToday)    : "—"} delta="+12%"   delayMs={0}   />
        <KpiCard label="Ticket Médio"   value={s ? fmt(s.avgTicket)     : "—"} delta="+4%"    delayMs={80}  />
        <KpiCard label="Pedidos Ativos" value={s ? String(s.activeOrders) : "—"} delta="Estável" deltaTone="muted" delayMs={160} />
        <KpiCard label="Tempo Resposta" value={s ? `${s.responseTimeMin}min` : "—"} delta="-32%" deltaTone="success" delayMs={240} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard label="Conversas Ativas"  value={s ? String(s.activeConversations)              : "—"} delayMs={0}   />
        <KpiCard label="Taxa de Conversão" value={s ? `${s.conversionRate.toFixed(1)}%`          : "—"} delta="+6%" delayMs={80}  />
        <KpiCard label="Pedidos Finalizados" value={s ? String(s.completedOrders)                : "—"} delayMs={160} />
        <KpiCard label="Cancelados"        value={s ? String(s.cancelledOrders)                  : "—"} delta="-2" deltaTone="muted" delayMs={240} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-5">
          <ChannelStatusCard />
        </div>
        <div className="lg:col-span-7">
          <SalesChartCard />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RecentOrdersTable orders={recent} />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <TopProductsChart />
          <div className="p-6 bg-primary rounded-xl text-primary-foreground flex items-center justify-between animate-entrance">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-1">
                Próxima Automação
              </p>
              <h4 className="text-sm font-medium">
                Reengajamento de clientes inativos (30 dias)
              </h4>
            </div>
            <div className="size-8 rounded-full border-2 border-primary bg-primary/70 flex items-center justify-center text-[10px] font-bold">
              +4
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
