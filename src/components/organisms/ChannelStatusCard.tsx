import { useEffect, useState } from "react";
import { RefreshCw, Smartphone, Wifi, WifiOff, Loader2 } from "lucide-react";
import { StatusPill } from "@/components/atoms/StatusPill";
import {
  useWhatsappChannel,
  useConnectWhatsapp,
  useDisconnectWhatsapp,
  useSyncChannel,
} from "@/api/services/channels.service";
import { useQueryClient } from "@tanstack/react-query";
import { convKeys } from "@/api/services/conversations.service";

function fmt(n: number) {
  return n.toLocaleString("pt-BR");
}

export function ChannelStatusCard() {
  const { data, isLoading } = useWhatsappChannel();
  const channel = data?.data;
  const status  = channel?.status;

  const [qrCode, setQrCode] = useState<string | null>(null);

  const connect    = useConnectWhatsapp();
  const disconnect = useDisconnectWhatsapp();
  const sync       = useSyncChannel();
  const qc         = useQueryClient();

  // Fall back to the QR code persisted on the server (e.g. after a page
  // reload, before the connect mutation has run again in this session).
  const effectiveQrCode = qrCode ?? channel?.qrCode ?? null;

  // Clear QR and refresh conversations when WhatsApp connects
  useEffect(() => {
    if (status === "connected") {
      setQrCode(null);
      qc.invalidateQueries({ queryKey: convKeys.all() });
    }
  }, [status, qc]);

  if (isLoading) {
    return (
      <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance flex items-center justify-center min-h-[280px]">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="lg:col-span-5 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold tracking-tight">Status do Canal</h2>
        {status === "connected" && <StatusPill tone="success" dot>Conectado</StatusPill>}
        {status === "awaiting_scan" && <StatusPill tone="warning" dot>Aguardando scan</StatusPill>}
        {status === "disconnected" && <StatusPill tone="muted">Desconectado</StatusPill>}
        {status === "sincronizando" && <StatusPill tone="info" dot>Sincronizando</StatusPill>}
        {(!status || status === "disconnected" || status === "pending") && (
          <StatusPill tone="muted">Desconectado</StatusPill>
        )}
      </div>

      {/* DISCONNECTED — show connect button */}
      {(!status || status === "disconnected" || status === "pending") && (
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="size-16 rounded-full bg-muted flex items-center justify-center">
            <WifiOff className="size-7 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">WhatsApp desconectado</p>
            <p className="text-xs text-muted-foreground mt-1">
              Conecte para receber e enviar mensagens
            </p>
          </div>
          <button
            onClick={() =>
              connect.mutate(undefined, {
                onSuccess: (res) => setQrCode(res.data.qr_code),
              })
            }
            disabled={connect.isPending}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition-all disabled:opacity-60"
          >
            {connect.isPending ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Wifi className="size-3.5" />
            )}
            {connect.isPending ? "Gerando QR..." : "Conectar WhatsApp"}
          </button>
        </div>
      )}

      {/* AWAITING SCAN — show real QR code */}
      {(status === "awaiting_scan" || (effectiveQrCode && status !== "connected")) && effectiveQrCode && (
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={`data:image/png;base64,${effectiveQrCode}`}
            width={192}
            height={192}
            alt="QR Code WhatsApp"
            className="rounded-lg border border-border"
          />
          <div className="text-center">
            <p className="text-sm font-semibold">Escaneie com seu WhatsApp</p>
            <p className="text-xs text-muted-foreground mt-1">
              WhatsApp → Dispositivos conectados → Escanear QR
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="size-3 animate-spin" />
            Aguardando conexão...
          </div>
        </div>
      )}

      {/* AWAITING SCAN but no qrCode yet (just triggered) */}
      {status === "awaiting_scan" && !effectiveQrCode && (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Gerando QR Code...</p>
        </div>
      )}

      {/* CONNECTED — show device info */}
      {status === "connected" && (
        <>
          <div className="flex flex-col items-center justify-center gap-2 py-2">
            <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Smartphone className="size-5 text-accent" />
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold">{channel?.device ?? "Dispositivo"}</div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {channel?.phone} · Evolution API
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Mensagens</div>
              <div className="text-sm font-bold mt-1 font-mono">{fmt(channel?.messages ?? 0)}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Última sync</div>
              <div className="text-sm font-bold mt-1 font-mono">{channel?.lastSync ?? "—"}</div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Latência</div>
              <div className="text-sm font-bold mt-1 font-mono text-accent">
                {channel?.latencyMs != null ? `${channel.latencyMs}ms` : "—"}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() => sync.mutate()}
              disabled={sync.isPending}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition-all disabled:opacity-60"
            >
              <RefreshCw className={`size-3.5 ${sync.isPending ? "animate-spin" : ""}`} />
              Sincronizar
            </button>
            <button
              onClick={() => disconnect.mutate()}
              disabled={disconnect.isPending}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 rounded transition-all disabled:opacity-60"
            >
              {disconnect.isPending ? <Loader2 className="size-3.5 animate-spin" /> : "Desconectar"}
            </button>
          </div>
        </>
      )}

      {/* SINCRONIZANDO */}
      {status === "sincronizando" && (
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <Loader2 className="size-6 animate-spin text-accent" />
          <p className="text-xs text-muted-foreground">Sincronizando canal...</p>
        </div>
      )}
    </div>
  );
}
