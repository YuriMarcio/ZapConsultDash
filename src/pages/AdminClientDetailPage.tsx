import { useParams, Link } from "@tanstack/react-router";
import { Loader2, Smartphone, WifiOff, ArrowLeft, Pause, Play } from "lucide-react";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { StatusPill } from "@/components/atoms/StatusPill";
import { useAdminClient, useUpdateClientStatus } from "@/api/services/admin/clients.service";
import { useAdminInstances, useReconnectInstance } from "@/api/services/admin/instances.service";
import { CLIENT_STATUS_LABEL, CLIENT_STATUS_TONE } from "@/components/organisms/ClientsTable";
import type { ClientStatus } from "@/api/types";

export function AdminClientDetailPage() {
  const { clientId } = useParams({ from: "/admin/clients/$clientId" });

  const { data, isLoading } = useAdminClient(clientId);
  const { data: instancesData } = useAdminInstances();
  const updateStatus = useUpdateClientStatus();

  const client = data?.data;
  const instance = instancesData?.data?.find((i) => i.clientId === clientId);

  const reconnect = useReconnectInstance();

  if (isLoading || !client) {
    return (
      <AdminLayout title="Cliente">
        <div className="flex items-center justify-center min-h-[40vh]">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  const toggleStatus = () => {
    const nextStatus: ClientStatus = client.status === "suspended" ? "active" : "suspended";
    updateStatus.mutate({ id: client.id, body: { status: nextStatus } });
  };

  return (
    <AdminLayout title={client.name}>
      <Link to="/admin/clients" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="size-3.5" /> Voltar para clientes
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">Painel SINAL</p>
          <h1 className="text-2xl font-bold tracking-tight">{client.name}</h1>
        </div>
        <button
          onClick={toggleStatus}
          disabled={updateStatus.isPending}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest border border-border rounded hover:bg-muted transition disabled:opacity-60"
        >
          {client.status === "suspended" ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          {client.status === "suspended" ? "Reativar cliente" : "Suspender cliente"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
          <h2 className="font-bold tracking-tight mb-4">Dados do cliente</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">Responsável</dt>
              <dd className="font-semibold">{client.ownerName}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">E-mail</dt>
              <dd className="font-semibold">{client.ownerEmail}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">Telefone</dt>
              <dd className="font-semibold">{client.ownerPhone || "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">Plano</dt>
              <dd className="font-semibold">{client.plan}</dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">Status</dt>
              <dd><StatusPill tone={CLIENT_STATUS_TONE[client.status]} dot>{CLIENT_STATUS_LABEL[client.status]}</StatusPill></dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase text-muted-foreground tracking-wider mb-1">Cliente desde</dt>
              <dd className="font-semibold">
                {new Date(client.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
          <h2 className="font-bold tracking-tight mb-4">Instância WhatsApp</h2>

          {!instance && (
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                <WifiOff className="size-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Nenhuma instância provisionada para este cliente.</p>
            </div>
          )}

          {instance && instance.status === "connected" && (
            <div className="flex flex-col items-center gap-2 py-2 text-center">
              <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Smartphone className="size-5 text-accent" />
              </div>
              <div className="text-sm font-semibold">{instance.device ?? "Dispositivo"}</div>
              <p className="text-xs text-muted-foreground">{instance.phone} · Evolution API</p>
              <StatusPill tone="success" dot>Conectado</StatusPill>
            </div>
          )}

          {instance && instance.status !== "connected" && (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              {reconnect.data?.data.qr_code ? (
                <img
                  src={reconnect.data.data.qr_code}
                  width={160}
                  height={160}
                  alt="QR Code WhatsApp"
                  className="rounded-lg border border-border"
                />
              ) : (
                <StatusPill tone={instance.status === "awaiting_scan" ? "warning" : "muted"}>
                  {instance.status === "awaiting_scan" ? "Aguardando scan" : "Desconectado"}
                </StatusPill>
              )}
              <button
                onClick={() => reconnect.mutate(instance.id)}
                disabled={reconnect.isPending}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition disabled:opacity-60"
              >
                {reconnect.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Smartphone className="size-3.5" />}
                Gerar novo QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
