import { AppLayout } from "@/components/templates/AppLayout";
import { IntegrationsSection } from "@/components/organisms/IntegrationsSection";
import { StoreSettingsForm } from "@/components/organisms/StoreSettingsForm";
import { TeamSection } from "@/components/organisms/TeamSection";
import { useTenantPlan } from "@/api/services/tenant.service";
import { useMe } from "@/api/services/auth.service";
import { Lock } from "lucide-react";

const DEFAULT_FEATURES = [
  "WhatsApp ilimitado",
  "Múltiplos atendentes",
  "Mercado Pago integrado",
  "Suporte prioritário 24/7",
];

function fmt(date?: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
}

export function AjustesPage() {
  const { data: planData } = useTenantPlan();
  const plan = planData?.data;

  const { data: me } = useMe();
  const hasExternalIntegrations = (me?.data?.features ?? []).includes("integracoes_externas");

  return (
    <AppLayout title="Ajustes">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
          Configurações
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Ajustes da Loja</h1>
      </div>

      {hasExternalIntegrations ? (
        <IntegrationsSection />
      ) : (
        <section className="bg-card border border-border rounded-xl p-5 sm:p-6 ring-1 ring-black/5 mb-6 flex items-center gap-4">
          <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Lock className="size-4 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-bold tracking-tight">Marketplaces & Cardápio Digital</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Integração com iFood, Rappi, Uber Eats e mais disponível no plano Consultoria.
            </p>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StoreSettingsForm />
          <TeamSection />
        </div>

        <div className="space-y-6">
          <section className="bg-primary text-primary-foreground rounded-xl p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">
              Seu plano
            </p>
            <h3 className="text-xl font-bold tracking-tight">{plan?.name ?? "—"}</h3>
            {plan?.nextBillingDate && (
              <p className="text-xs text-primary-foreground/60 mt-1 mb-5">
                Próxima cobrança: {fmt(plan.nextBillingDate)}
              </p>
            )}
            {!plan?.nextBillingDate && <div className="mb-5" />}
            <div className="space-y-2 text-xs">
              {(plan?.features ?? DEFAULT_FEATURES).map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-accent" /> {b}
                </div>
              ))}
            </div>
            <button className="mt-6 w-full px-3 py-2 text-xs font-bold uppercase tracking-widest bg-primary-foreground text-primary rounded">
              Gerenciar assinatura
            </button>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
            <h3 className="font-bold tracking-tight mb-3">Logo</h3>
            <div className="aspect-square rounded-lg border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
              Arraste seu logo aqui
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
