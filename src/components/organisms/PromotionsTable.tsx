import { StatusPill } from "@/components/atoms/StatusPill";
import { Edit3, Trash2 } from "lucide-react";
import type { Promotion, PromotionType } from "@/api/types";

const TYPE_LABEL: Record<PromotionType, string> = {
  percent: "% Desconto",
  fixed: "Preço fixo",
  combo: "Combo",
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

function statusOf(p: Promotion): { label: string; tone: "success" | "warning" | "muted" | "danger" } {
  if (!p.active) return { label: "Pausada", tone: "muted" };
  const today = new Date().toISOString().slice(0, 10);
  if (p.endDate < today) return { label: "Encerrada", tone: "danger" };
  if (p.startDate > today) return { label: "Agendada", tone: "warning" };
  return { label: "Ativa", tone: "success" };
}

export function PromotionsTable({
  promotions,
  onEdit,
  onRemove,
}: {
  promotions: Promotion[];
  onEdit: (p: Promotion) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead className="bg-muted/40 border-b border-border">
            <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="text-left font-semibold px-4 py-3">Promoção</th>
              <th className="text-left font-semibold px-4 py-3">Produto</th>
              <th className="text-left font-semibold px-4 py-3">Tipo</th>
              <th className="text-right font-semibold px-4 py-3">De / Por</th>
              <th className="text-left font-semibold px-4 py-3">Vigência</th>
              <th className="text-left font-semibold px-4 py-3">Status</th>
              <th className="text-right font-semibold px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((p) => {
              const st = statusOf(p);
              return (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-semibold">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.productName}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-muted">
                      {TYPE_LABEL[p.type]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    <span className="text-muted-foreground line-through text-xs mr-2">
                      R$ {p.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="font-bold text-emerald-600">
                      R$ {p.promoPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {formatDate(p.startDate)} → {formatDate(p.endDate)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill tone={st.tone} dot>{st.label}</StatusPill>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(p)}
                        className="size-8 flex items-center justify-center rounded hover:bg-muted"
                        title="Editar"
                      >
                        <Edit3 className="size-3.5" />
                      </button>
                      <button
                        onClick={() => onRemove(p.id)}
                        className="size-8 flex items-center justify-center rounded hover:bg-rose-500/10 hover:text-rose-500"
                        title="Excluir"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {promotions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-xs text-muted-foreground">
                  Nenhuma promoção encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
