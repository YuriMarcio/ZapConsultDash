import type { CampaignPlan } from "@/api/types";
import { Rocket } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function formatRange(a: number, b: number) {
  return `${a.toLocaleString("pt-BR")} – ${b.toLocaleString("pt-BR")}`;
}

export function CampaignSuccessDialog({
  open,
  onClose,
  plan,
}: {
  open: boolean;
  onClose: () => void;
  plan: CampaignPlan;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="size-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-2">
            <Rocket className="size-6" />
          </div>
          <DialogTitle className="text-xl font-bold">Campanha enviada!</DialogTitle>
          <DialogDescription className="text-xs">
            Sua campanha <strong>{plan.name}</strong> entrou na fila de aprovação da Meta. Você
            receberá uma notificação assim que ela começar a rodar (normalmente em até 24h).
          </DialogDescription>
        </DialogHeader>
        <div className="bg-muted/50 rounded p-3 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Investimento</span>
            <span className="font-mono font-semibold">R$ {plan.price.toFixed(2).replace(".", ",")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duração</span>
            <span className="font-semibold">{plan.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Alcance estimado</span>
            <span className="font-mono font-semibold">{formatRange(plan.reachMin, plan.reachMax)}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded hover:opacity-90"
        >
          Entendi
        </button>
      </DialogContent>
    </Dialog>
  );
}
