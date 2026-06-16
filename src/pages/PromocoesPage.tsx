import { useState } from "react";
import { AppLayout } from "@/components/templates/AppLayout";
import { KpiSmall } from "@/components/molecules/KpiSmall";
import { PromotionsTable } from "@/components/organisms/PromotionsTable";
import { PromocaoDialog } from "@/components/dialogs/PromocaoDialog";
import { ProdutosTabs } from "@/components/ui/ProdutosTabs";
import {
  usePromotions,
  useCreatePromotion,
  useUpdatePromotion,
  useDeletePromotion,
} from "@/api/services/promotions.service";
import type { Promotion } from "@/api/types";
import { Calendar, Percent, Plus, Search, Tag, TrendingDown } from "lucide-react";

function statusOf(p: Promotion): { label: string } {
  if (!p.active) return { label: "Pausada" };
  const today = new Date().toISOString().slice(0, 10);
  if (p.endDate < today) return { label: "Encerrada" };
  if (p.startDate > today) return { label: "Agendada" };
  return { label: "Ativa" };
}

export function PromocoesPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Promotion | null>(null);
  const [search, setSearch] = useState("");

  const { data } = usePromotions();
  const createPromotion = useCreatePromotion();
  const updatePromotion = useUpdatePromotion();
  const deletePromotion = useDeletePromotion();

  const promotions = data?.data ?? [];

  const filtered = promotions.filter((p) =>
    [p.name, p.productName].join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  const activeCount    = promotions.filter((p) => statusOf(p).label === "Ativa").length;
  const scheduledCount = promotions.filter((p) => statusOf(p).label === "Agendada").length;
  const avgDiscount =
    promotions.length === 0
      ? 0
      : Math.round(
          promotions.reduce(
            (acc, p) => acc + ((p.originalPrice - p.promoPrice) / p.originalPrice) * 100,
            0,
          ) / promotions.length,
        );

  const upsert = (p: Promotion) => {
    const close = () => { setOpen(false); setEditing(null); };
    if (editing) {
      updatePromotion.mutate({ id: p.id, body: p }, { onSuccess: close });
    } else {
      createPromotion.mutate(p, { onSuccess: close });
    }
  };

  const remove = (id: string) => deletePromotion.mutate(id);

  return (
    <AppLayout title="Promoções">
      <ProdutosTabs />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
            Campanhas internas
          </p>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Promoções & Cupons</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Crie promoções vinculadas a produtos do cardápio com janela de vigência.
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setOpen(true); }}
          className="px-3 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded flex items-center justify-center gap-2 hover:opacity-90 w-full sm:w-auto"
        >
          <Plus className="size-3.5" /> Nova promoção
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiSmall label="Promoções ativas" value={String(activeCount)}    icon={Tag}         tone="emerald" />
        <KpiSmall label="Agendadas"         value={String(scheduledCount)} icon={Calendar}    tone="amber"   />
        <KpiSmall label="Desconto médio"    value={`${avgDiscount}%`}      icon={Percent}     tone="violet"  />
        <KpiSmall label="Conversão extra"   value="+18%"                   icon={TrendingDown} tone="sky"    />
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded mb-4 w-full sm:max-w-xs">
        <Search className="size-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar promoção..."
          className="bg-transparent text-xs outline-none w-full"
        />
      </div>

      <PromotionsTable
        promotions={filtered}
        onEdit={(p) => { setEditing(p); setOpen(true); }}
        onRemove={remove}
      />

      <PromocaoDialog
        open={open}
        promotion={editing}
        onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null); }}
        onSubmit={upsert}
      />
    </AppLayout>
  );
}
