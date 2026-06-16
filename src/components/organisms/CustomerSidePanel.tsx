import { AvatarInitials } from "@/components/atoms/AvatarInitials";
import { StatusPill } from "@/components/atoms/StatusPill";
import { Tag, User } from "lucide-react";
import type { Conversation } from "@/api/types";

export function CustomerSidePanel({ conversation }: { conversation: Conversation }) {
  return (
    <div className="hidden lg:flex col-span-3 border-l border-border flex-col min-h-0">
      <div className="p-5 border-b border-border">
        <div className="flex flex-col items-center text-center">
          <AvatarInitials name={conversation.name} size="lg" />
          <p className="text-sm font-semibold mt-3">{conversation.name}</p>
          <p className="text-[11px] text-muted-foreground font-mono mt-1">{conversation.phone}</p>
        </div>
      </div>
      <div className="p-5 space-y-4 overflow-y-auto flex-1">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
            <Tag className="size-3" /> Etiquetas
          </div>
          <div className="flex flex-wrap gap-1.5">
            <StatusPill tone="success">VIP</StatusPill>
            <StatusPill tone="info">Pedido aberto</StatusPill>
            <StatusPill tone="muted">Bairro Jardins</StatusPill>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
            <User className="size-3" /> Histórico
          </div>
          <div className="text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pedidos totais</span>
              <span className="font-mono font-semibold">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ticket médio</span>
              <span className="font-mono font-semibold">R$ 87,40</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cliente desde</span>
              <span className="font-mono">jan/2024</span>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Mensagens rápidas
          </div>
          <div className="space-y-1.5">
            {["Pedido confirmado ✅", "Saiu para entrega 🛵", "Qual seu endereço?"].map((m) => (
              <button
                key={m}
                className="w-full text-left text-xs px-3 py-2 bg-muted hover:bg-muted/60 rounded border border-border"
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
