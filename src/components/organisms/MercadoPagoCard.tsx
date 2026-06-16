import { StatusPill } from "@/components/atoms/StatusPill";
import { Link as LinkIcon, ShieldCheck } from "lucide-react";

export function MercadoPagoCard() {
  return (
    <div className="lg:col-span-4 bg-card border border-border rounded-xl p-6 ring-1 ring-black/5 animate-entrance">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold tracking-tight">Mercado Pago</h2>
        <StatusPill tone="success" dot>Conectado</StatusPill>
      </div>
      <p className="text-xs text-muted-foreground mb-6">
        Recebe pagamentos automaticamente via Pix e cartão.
      </p>

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
  );
}
