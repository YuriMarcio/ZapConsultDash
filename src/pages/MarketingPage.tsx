import { useState } from "react";
import { AppLayout } from "@/components/templates/AppLayout";
import { CampaignConfigurator } from "@/components/organisms/CampaignConfigurator";
import { CampaignHistoryTable } from "@/components/organisms/CampaignHistoryTable";
import { CampaignSuccessDialog } from "@/components/dialogs/CampaignSuccessDialog";
import { CAMPAIGN_PLANS, CAMPAIGNS, type CampaignPlan } from "@/lib/mock-data";
import {
  CheckCircle2,
  Facebook,
  Instagram,
  MousePointerClick,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

function formatRange(a: number, b: number) {
  return `${a.toLocaleString("pt-BR")} – ${b.toLocaleString("pt-BR")}`;
}

function HeroBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold px-2.5 py-1 bg-white/15 backdrop-blur rounded-full flex items-center gap-1.5">
      {children}
    </span>
  );
}

function PlanStat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Users }) {
  return (
    <div className="bg-muted/50 rounded-lg p-2.5">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
        <Icon className="size-3" /> {label}
      </div>
      <div className="text-sm font-bold font-mono">{value}</div>
    </div>
  );
}

export function MarketingPage() {
  const [selectedPlan, setSelectedPlan] = useState<CampaignPlan>(
    CAMPAIGN_PLANS.find((p) => p.highlighted) ?? CAMPAIGN_PLANS[1],
  );
  const [open, setOpen] = useState(false);

  return (
    <AppLayout title="Marketing Local">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground rounded-2xl p-6 sm:p-8 mb-6 ring-1 ring-black/10">
        <div className="absolute -right-10 -top-10 size-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-20 bottom-0 size-32 rounded-full bg-accent/30 blur-2xl" />
        <div className="relative max-w-2xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-80 mb-2">
            Anúncios na Meta · Instagram + Facebook
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Atraia clientes do seu bairro direto pro WhatsApp
          </h1>
          <p className="text-sm opacity-90 max-w-lg">
            Escolha um plano fixo, faça upload do seu criativo e a Sinal cuida da segmentação,
            otimização e relatórios da campanha.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <HeroBadge><Instagram className="size-3" /> Instagram</HeroBadge>
            <HeroBadge><Facebook className="size-3" /> Facebook</HeroBadge>
            <HeroBadge><Sparkles className="size-3" /> Otimização IA</HeroBadge>
            <HeroBadge><Target className="size-3" /> Segmentação local</HeroBadge>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">
            Planos de campanha
          </p>
          <h2 className="text-lg font-bold tracking-tight">Escolha o tamanho do seu anúncio</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {CAMPAIGN_PLANS.map((plan) => {
          const active = selectedPlan.id === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`text-left bg-card border rounded-2xl p-5 ring-1 transition relative ${
                active
                  ? "border-primary ring-primary/20 shadow-lg scale-[1.01]"
                  : "border-border ring-black/5 hover:border-primary/40"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-2.5 right-4 text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-accent text-accent-foreground rounded">
                  Mais vendido
                </span>
              )}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Plano</p>
                  <h3 className="text-base font-bold tracking-tight">{plan.name}</h3>
                </div>
                <span className={`size-8 rounded-lg flex items-center justify-center ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <Rocket className="size-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold font-mono tracking-tight">
                  R$ {plan.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Pagamento único · campanha de {plan.duration}</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <PlanStat label="Alcance estimado" value={formatRange(plan.reachMin, plan.reachMax)} icon={Users} />
                <PlanStat label="Cliques" value={plan.clicksEstimate} icon={MousePointerClick} />
              </div>
              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className={`mt-5 text-center text-[11px] font-bold uppercase tracking-widest py-2 rounded ${active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                {active ? "Plano selecionado" : "Selecionar"}
              </div>
            </button>
          );
        })}
      </div>

      <CampaignConfigurator plan={selectedPlan} onLaunch={() => setOpen(true)} />

      <CampaignHistoryTable campaigns={CAMPAIGNS} />

      <CampaignSuccessDialog open={open} onClose={() => setOpen(false)} plan={selectedPlan} />
    </AppLayout>
  );
}
