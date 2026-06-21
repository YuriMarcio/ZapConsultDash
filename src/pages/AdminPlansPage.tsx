import { useState } from "react";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { PlanFormDialog, FEATURE_CATALOG } from "@/components/dialogs/PlanFormDialog";
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
import { useAdminPlans, useDeletePlan } from "@/api/services/admin/plans.service";
import type { Plan } from "@/api/types";
import { Pencil, Plus, Trash2 } from "lucide-react";

function featureLabel(key: string) {
  return FEATURE_CATALOG.find((f) => f.key === key)?.label ?? key;
}

export function AdminPlansPage() {
  const { data } = useAdminPlans();
  const plans = data?.data ?? [];
  const deletePlan = useDeletePlan();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Plan | null>(null);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (plan: Plan) => {
    setEditing(plan);
    setOpen(true);
  };

  return (
    <AdminLayout title="Planos">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">Painel SINAL</p>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Planos</h1>
        </div>
        <button
          onClick={openCreate}
          className="px-3 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded flex items-center justify-center gap-2 hover:opacity-90"
        >
          <Plus className="size-3.5" /> Novo plano
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-muted/40 border-b border-border">
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="text-left font-semibold px-4 py-3">Plano</th>
                <th className="text-left font-semibold px-4 py-3">Comissão marketing</th>
                <th className="text-left font-semibold px-4 py-3">Módulos</th>
                <th className="text-right font-semibold px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3">{p.marketingCommissionPercent}%</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {p.features.map(featureLabel).join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="size-8 flex items-center justify-center rounded hover:bg-muted"
                        title="Editar"
                      >
                        <Pencil className="size-3.5" />
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
                            <AlertDialogTitle>Excluir plano</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir <strong>{p.name}</strong>? Clientes
                              cadastrados com esse plano ficarão sem módulos liberados.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deletePlan.mutate(p.id)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
              {plans.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-xs text-muted-foreground">
                    Nenhum plano cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PlanFormDialog open={open} onOpenChange={setOpen} plan={editing} />
    </AdminLayout>
  );
}
