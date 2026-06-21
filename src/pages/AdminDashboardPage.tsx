import { Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { KpiCard } from "@/components/atoms/KpiCard";
import { StatusPill } from "@/components/atoms/StatusPill";
import { useAdminDashboardSummary } from "@/api/services/admin/dashboard.service";
import { useAdminClients } from "@/api/services/admin/clients.service";
import { CLIENT_STATUS_TONE, CLIENT_STATUS_LABEL } from "@/components/organisms/ClientsTable";
import { ArrowRight } from "lucide-react";

function fmtMoney(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function AdminDashboardPage() {
  const { data: summary } = useAdminDashboardSummary();
  const { data: clientsData } = useAdminClients({ limit: 5 });
  const s = summary?.data;
  const recent = clientsData?.data ?? [];

  return (
    <AdminLayout title="Visão Geral">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
          Painel SINAL
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Visão geral dos clientes</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <KpiCard label="Total de Clientes"   value={s ? String(s.totalClients)      : "—"} delayMs={0} />
        <KpiCard label="Clientes Ativos"     value={s ? String(s.activeClients)     : "—"} deltaTone="success" delayMs={80} />
        <KpiCard label="Em Trial"            value={s ? String(s.trialingClients)   : "—"} deltaTone="muted" delayMs={160} />
        <KpiCard label="Suspensos"           value={s ? String(s.suspendedClients)  : "—"} deltaTone="danger" delayMs={240} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <KpiCard label="Instâncias Conectadas" value={s ? String(s.instancesConnected)    : "—"} delayMs={0} />
        <KpiCard label="Instâncias Desconectadas" value={s ? String(s.instancesDisconnected) : "—"} deltaTone="danger" delayMs={80} />
        <KpiCard label="MRR" value={s ? fmtMoney(s.mrr) : "—"} delta={s ? `+${s.newClientsThisMonth} este mês` : undefined} delayMs={160} />
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="font-bold tracking-tight text-sm">Clientes recentes</h2>
          <Link to="/admin/clients" className="text-xs font-semibold text-accent hover:underline flex items-center gap-1">
            Ver todos <ArrowRight className="size-3" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recent.map((c) => (
            <Link
              key={c.id}
              to="/admin/clients/$clientId"
              params={{ clientId: c.id }}
              className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
            >
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.ownerName}</p>
              </div>
              <StatusPill tone={CLIENT_STATUS_TONE[c.status]} dot>
                {CLIENT_STATUS_LABEL[c.status]}
              </StatusPill>
            </Link>
          ))}
          {recent.length === 0 && (
            <p className="px-4 py-8 text-center text-xs text-muted-foreground">
              Nenhum cliente cadastrado ainda.
            </p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
