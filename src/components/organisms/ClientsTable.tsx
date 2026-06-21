import { Link } from "@tanstack/react-router";
import { StatusPill } from "@/components/atoms/StatusPill";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye, Pause, Play, Trash2 } from "lucide-react";
import type { AdminClient, ClientStatus } from "@/api/types";

export const CLIENT_STATUS_LABEL: Record<ClientStatus, string> = {
  trialing:  "Em trial",
  active:    "Ativo",
  suspended: "Suspenso",
  inactive:  "Inativo",
};

export const CLIENT_STATUS_TONE: Record<ClientStatus, "success" | "warning" | "muted" | "danger"> = {
  trialing:  "warning",
  active:    "success",
  suspended: "danger",
  inactive:  "muted",
};

const WHATSAPP_LABEL: Record<string, string> = {
  connected:      "Conectado",
  disconnected:   "Desconectado",
  awaiting_scan:  "Aguard. scan",
  sincronizando:  "Sincronizando",
  pending:        "Pendente",
};

const WHATSAPP_TONE: Record<string, "success" | "warning" | "muted" | "danger" | "info"> = {
  connected:     "success",
  disconnected:  "muted",
  awaiting_scan: "warning",
  sincronizando: "info",
  pending:       "muted",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
}

function daysUntil(iso: string) {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

export function ClientsTable({
  clients,
  onToggleStatus,
  onDelete,
}: {
  clients: AdminClient[];
  onToggleStatus: (client: AdminClient) => void;
  onDelete: (client: AdminClient) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead className="bg-muted/40 border-b border-border">
            <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="text-left font-semibold px-4 py-3">Loja</th>
              <th className="text-left font-semibold px-4 py-3">Responsável</th>
              <th className="text-left font-semibold px-4 py-3">Plano</th>
              <th className="text-left font-semibold px-4 py-3">Status</th>
              <th className="text-left font-semibold px-4 py-3">WhatsApp</th>
              <th className="text-left font-semibold px-4 py-3">Criado em</th>
              <th className="text-right font-semibold px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-semibold">{c.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  <div>{c.ownerName || "—"}</div>
                  <div className="text-xs">{c.ownerEmail || "—"}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-muted">
                    {c.plan}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusPill tone={CLIENT_STATUS_TONE[c.status]} dot>
                    {CLIENT_STATUS_LABEL[c.status]}
                  </StatusPill>
                  {c.isExpiringSoon && c.expiresAt && (
                    <div className="mt-1">
                      <StatusPill tone="warning" dot>
                        Vence em {daysUntil(c.expiresAt)}d
                      </StatusPill>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusPill tone={WHATSAPP_TONE[c.whatsappStatus]} dot>
                    {WHATSAPP_LABEL[c.whatsappStatus]}
                  </StatusPill>
                </td>
                <td className="px-4 py-3 text-xs">{formatDate(c.createdAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      to="/admin/clients/$clientId"
                      params={{ clientId: c.id }}
                      className="size-8 flex items-center justify-center rounded hover:bg-muted"
                      title="Ver detalhes"
                    >
                      <Eye className="size-3.5" />
                    </Link>
                    <button
                      onClick={() => onToggleStatus(c)}
                      className="size-8 flex items-center justify-center rounded hover:bg-muted"
                      title={c.status === "suspended" ? "Reativar" : "Suspender"}
                    >
                      {c.status === "suspended" ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="size-8 flex items-center justify-center rounded hover:bg-muted hover:text-rose-600"
                          title="Excluir"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir cliente</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir <strong>{c.name}</strong>? O cliente deixará
                            de aparecer na lista e perderá acesso ao painel.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDelete(c)}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-xs text-muted-foreground">
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
