import { useState } from "react";
import { StatusPill } from "@/components/atoms/StatusPill";
import { SOURCE_META, type OrderSource } from "@/lib/mock-data";
import { Check, Settings2, ExternalLink, Loader2 } from "lucide-react";
import { useConnectIntegration, useDisconnectIntegration } from "@/api/services/integrations.service";
import type { Integration, IntegrationKey } from "@/api/types";

type IntegrationCardKey = Extract<OrderSource, "ifood" | "rappi" | "ubereats" | "99food" | "cardapio">;

export interface IntegrationCfg {
  key: IntegrationCardKey;
  description: string;
  authType: "merchant" | "store" | "link";
  docsUrl: string;
}

export function IntegrationCard({
  cfg,
  integration,
}: {
  cfg: IntegrationCfg;
  integration?: Integration;
}) {
  const connected = integration?.connected ?? false;
  const [open, setOpen]         = useState(false);
  const [merchantId, setMerchantId] = useState(integration?.merchantId ?? "");
  const [token, setToken]       = useState("");

  const connect    = useConnectIntegration();
  const disconnect = useDisconnectIntegration();
  const meta       = SOURCE_META[cfg.key];

  const authLabel =
    cfg.authType === "merchant"
      ? "Merchant ID"
      : cfg.authType === "store"
        ? "Store ID"
        : "Slug do cardápio";

  const handleConnect = () => {
    connect.mutate(
      { key: cfg.key as IntegrationKey, body: { merchantId, token: token || undefined } },
      { onSuccess: () => setOpen(false) },
    );
  };

  const handleDisconnect = () => {
    disconnect.mutate(cfg.key as IntegrationKey);
  };

  return (
    <div className="border border-border rounded-lg p-4 bg-background hover:border-accent/40 transition flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`size-10 rounded-lg flex items-center justify-center font-bold text-sm ${meta.color} ${meta.text} shrink-0`}
          >
            {meta.short}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-tight truncate">{meta.label}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {cfg.authType === "link" ? "Cardápio próprio" : "Marketplace"}
            </div>
          </div>
        </div>
        {connected ? (
          <StatusPill tone="success" dot>Conectado</StatusPill>
        ) : (
          <StatusPill tone="muted">Inativo</StatusPill>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed flex-1">
        {cfg.description}
      </p>

      {open && (
        <div className="space-y-2 mb-3 pt-3 border-t border-border">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {authLabel}
            </label>
            <input
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              placeholder={cfg.authType === "link" ? "minha-loja" : "0000-0000"}
              className="mt-1 w-full bg-card border border-border rounded px-2.5 py-1.5 text-xs font-mono outline-none focus:border-accent"
            />
          </div>
          {cfg.authType !== "link" && (
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Token de acesso
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="••••••••••••"
                className="mt-1 w-full bg-card border border-border rounded px-2.5 py-1.5 text-xs font-mono outline-none focus:border-accent"
              />
            </div>
          )}
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <a
              href={cfg.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              Onde encontrar? <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 pt-3 border-t border-border">
        {connected ? (
          <>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest border border-border rounded hover:bg-muted inline-flex items-center justify-center gap-1.5"
            >
              <Settings2 className="size-3" /> Configurar
            </button>
            <button
              onClick={handleDisconnect}
              disabled={disconnect.isPending}
              className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 rounded disabled:opacity-60"
            >
              {disconnect.isPending ? <Loader2 className="size-3 animate-spin" /> : "Desconectar"}
            </button>
          </>
        ) : open ? (
          <button
            onClick={handleConnect}
            disabled={connect.isPending || !merchantId}
            className={`flex-1 px-3 py-2 text-[11px] font-bold uppercase tracking-widest rounded inline-flex items-center justify-center gap-1.5 ${meta.color} ${meta.text} hover:opacity-90 disabled:opacity-60`}
          >
            {connect.isPending ? (
              <Loader2 className="size-3 animate-spin" />
            ) : (
              <Check className="size-3" />
            )}
            {connect.isPending ? "Conectando..." : `Salvar ${meta.label}`}
          </button>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className={`flex-1 px-3 py-2 text-[11px] font-bold uppercase tracking-widest rounded inline-flex items-center justify-center gap-1.5 ${meta.color} ${meta.text} hover:opacity-90`}
          >
            <Check className="size-3" /> Conectar {meta.label}
          </button>
        )}
      </div>
    </div>
  );
}
