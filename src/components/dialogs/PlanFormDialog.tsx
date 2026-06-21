import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCreatePlan, useUpdatePlan } from "@/api/services/admin/plans.service";
import type { ApiError, Plan } from "@/api/types";

export const FEATURE_CATALOG = [
  { key: "dashboard", label: "Dashboard" },
  { key: "conversas", label: "Conversas (WhatsApp)" },
  { key: "pedidos", label: "Pedidos" },
  { key: "produtos", label: "Produtos" },
  { key: "marketing", label: "Marketing" },
  { key: "financeiro", label: "Financeiro" },
  { key: "automacao", label: "Automação" },
  { key: "integracoes_externas", label: "Integrações externas (iFood, Rappi, UberEats...)" },
  { key: "pedidos_multi_canal", label: "Pedidos multi-canal (além do WhatsApp)" },
];

export function PlanFormDialog({
  open,
  onOpenChange,
  plan,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  plan?: Plan | null;
}) {
  const isEditing = !!plan;
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [commission, setCommission] = useState("0");
  const [features, setFeatures] = useState<string[]>([]);
  const [error, setError] = useState("");

  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();
  const isPending = createPlan.isPending || updatePlan.isPending;

  useEffect(() => {
    if (open) {
      setSlug(plan?.slug ?? "");
      setName(plan?.name ?? "");
      setCommission(String(plan?.marketingCommissionPercent ?? 0));
      setFeatures(plan?.features ?? []);
      setError("");
    }
  }, [open, plan]);

  const toggleFeature = (key: string) => {
    setFeatures((prev) => (prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const body = {
      slug,
      name,
      marketingCommissionPercent: Number(commission) || 0,
      features,
    };
    const onError = (err: unknown) =>
      setError((err as ApiError)?.message || "Não foi possível salvar o plano.");

    if (isEditing) {
      updatePlan.mutate({ id: plan!.id, body }, { onSuccess: () => onOpenChange(false), onError });
    } else {
      createPlan.mutate(body, { onSuccess: () => onOpenChange(false), onError });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">Painel SINAL</p>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {isEditing ? "Editar plano" : "Novo plano"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Defina o nome, a comissão de marketing e os módulos liberados para este plano.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-md px-3 py-2.5">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Slug *
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="whatsapp"
                required
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Nome *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="WhatsApp"
                required
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
              Comissão de marketing (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
              Módulos liberados
            </label>
            <div className="space-y-2">
              {FEATURE_CATALOG.map((f) => (
                <label key={f.key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={features.includes(f.key)}
                    onChange={() => toggleFeature(f.key)}
                    className="size-4 accent-primary"
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-border rounded hover:bg-muted transition flex items-center justify-center gap-2"
            >
              <X className="size-3.5" /> Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Plus className="size-3.5" />}
              {isEditing ? "Salvar" : "Criar plano"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
