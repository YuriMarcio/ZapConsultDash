import { Link } from "@tanstack/react-router";
import { StatusPill } from "@/components/atoms/StatusPill";
import { RefreshCw, Loader2 } from "lucide-react";
import type { AdminWhatsappInstance } from "@/api/types";

const STATUS_LABEL: Record<string, string> = {
  connected:      "Conectado",
  disconnected:   "Desconectado",
  awaiting_scan:  "Aguard. scan",
  sincronizando:  "Sincronizando",
  pending:        "Pendente",
};

const STATUS_TONE: Record<string, "success" | "warning" | "muted" | "danger" | "info"> = {
  connected:     "success",
  disconnected:  "danger",
  awaiting_scan: "warning",
  sincronizando: "info",
  pending:       "muted",
};

export function InstancesTable({
  instances,
  reconnectingId,
  onReconnect,
}: {
  instances: AdminWhatsappInstance[];
  reconnectingId?: string | number;
  onReconnect: (instance: AdminWhatsappInstance) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead className="bg-muted/40 border-b border-border">
            <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="text-left font-semibold px-4 py-3">Cliente</th>
              <th className="text-left font-semibold px-4 py-3">Número</th>
              <th className="text-left font-semibold px-4 py-3">Status</th>
              <th className="text-right font-semibold px-4 py-3">Latência</th>
              <th className="text-left font-semibold px-4 py-3">Última sync</th>
              <th className="text-right font-semibold px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {instances.map((i) => (
              <tr key={i.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold">
                  <Link to="/admin/clients/$clientId" params={{ clientId: i.clientId }} className="hover:underline">
                    {i.clientName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{i.phone ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusPill tone={STATUS_TONE[i.status]} dot>{STATUS_LABEL[i.status]}</StatusPill>
                </td>
                <td className="px-4 py-3 text-right font-mono">
                  {i.latencyMs != null ? `${i.latencyMs}ms` : "—"}
                </td>
                <td className="px-4 py-3 text-xs">{i.lastSync ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => onReconnect(i)}
                      disabled={reconnectingId === i.id}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-muted transition disabled:opacity-60"
                      title="Reconectar"
                    >
                      {reconnectingId === i.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <RefreshCw className="size-3.5" />
                      )}
                      Reconectar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {instances.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-xs text-muted-foreground">
                  Nenhuma instância encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
