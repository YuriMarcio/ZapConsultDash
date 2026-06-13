import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusPill } from "@/components/ui/StatusPill";
import { CAMPAIGN_PLANS, CAMPAIGNS, type Campaign, type CampaignPlan } from "@/lib/mock-data";
import {
  Megaphone,
  MapPin,
  Users,
  MousePointerClick,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  Facebook,
  Instagram,
  Rocket,
  Target,
  Calendar,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/marketing")({
  head: () => ({ meta: [{ title: "Marketing Local — Sinal" }] }),
  component: MarketingPage,
});

function MarketingPage() {
  const [selectedPlan, setSelectedPlan] = useState<CampaignPlan>(
    CAMPAIGN_PLANS.find((p) => p.highlighted) ?? CAMPAIGN_PLANS[1],
  );
  const [open, setOpen] = useState(false);

  return (
    <AppLayout title="Marketing Local">
      {/* Hero */}
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
            <Badge>
              <Instagram className="size-3" /> Instagram
            </Badge>
            <Badge>
              <Facebook className="size-3" /> Facebook
            </Badge>
            <Badge>
              <Sparkles className="size-3" /> Otimização IA
            </Badge>
            <Badge>
              <Target className="size-3" /> Segmentação local
            </Badge>
          </div>
        </div>
      </div>

      {/* Plans */}
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
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Plano
                  </p>
                  <h3 className="text-base font-bold tracking-tight">{plan.name}</h3>
                </div>
                <span
                  className={`size-8 rounded-lg flex items-center justify-center ${
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Rocket className="size-4" />
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold font-mono tracking-tight">
                  R$ {plan.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Pagamento único · campanha de {plan.duration}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <Stat
                  label="Alcance estimado"
                  value={`${formatRange(plan.reachMin, plan.reachMax)}`}
                  icon={Users}
                />
                <Stat label="Cliques" value={plan.clicksEstimate} icon={MousePointerClick} />
              </div>

              <ul className="space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div
                className={`mt-5 text-center text-[11px] font-bold uppercase tracking-widest py-2 rounded ${
                  active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {active ? "Plano selecionado" : "Selecionar"}
              </div>
            </button>
          );
        })}
      </div>

      {/* Configurator */}
      <CampaignConfigurator
        plan={selectedPlan}
        onLaunch={() => setOpen(true)}
      />

      {/* Active campaigns */}
      <div className="mt-8">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">
              Histórico
            </p>
            <h2 className="text-lg font-bold tracking-tight">Suas campanhas</h2>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="bg-muted/40 border-b border-border">
                <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  <th className="text-left px-4 py-3 font-semibold">Campanha</th>
                  <th className="text-left px-4 py-3 font-semibold">Plano</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-right px-4 py-3 font-semibold">Investido</th>
                  <th className="text-right px-4 py-3 font-semibold">Alcance</th>
                  <th className="text-right px-4 py-3 font-semibold">Cliques → WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {CAMPAIGNS.map((c) => (
                  <CampaignRow key={c.id} campaign={c} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SuccessDialog open={open} onClose={() => setOpen(false)} plan={selectedPlan} />
    </AppLayout>
  );
}

function CampaignConfigurator({ plan, onLaunch }: { plan: CampaignPlan; onLaunch: () => void }) {
  const [title, setTitle] = useState("");
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [cta, setCta] = useState("Pedir no WhatsApp");
  const [creativeType, setCreativeType] = useState<"image" | "video">("image");
  const [area, setArea] = useState("Vila Madalena, São Paulo");
  const [radius, setRadius] = useState(5);
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 55]);
  const [audience, setAudience] = useState<string[]>(["Fome", "Delivery", "Hamburguer"]);
  const [newInterest, setNewInterest] = useState("");

  const estimatedDailyReach = useMemo(() => {
    const base = (plan.reachMin + plan.reachMax) / 2;
    const radiusFactor = Math.min(2, Math.max(0.4, radius / 5));
    return Math.round(base * radiusFactor);
  }, [plan, radius]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-6 ring-1 ring-black/5">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Megaphone className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight">Monte sua campanha</h3>
            <p className="text-xs text-muted-foreground">
              Plano <span className="font-semibold text-foreground">{plan.name}</span> ·{" "}
              {plan.duration} · R$ {plan.price.toFixed(2).replace(".", ",")}
            </p>
          </div>
        </div>

        {/* Creative */}
        <section className="space-y-3">
          <SectionTitle icon={ImageIcon}>Criativo</SectionTitle>
          <div className="flex gap-1 p-1 bg-muted rounded w-fit">
            {(["image", "video"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setCreativeType(t)}
                className={`px-3 py-1.5 text-[11px] font-semibold rounded flex items-center gap-1.5 transition ${
                  creativeType === t
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {t === "image" ? <ImageIcon className="size-3.5" /> : <Video className="size-3.5" />}
                {t === "image" ? "Foto" : "Vídeo"}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="w-full aspect-[16/8] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-muted/40 hover:border-accent/50 transition text-muted-foreground"
          >
            <Upload className="size-6" />
            <span className="text-sm font-semibold">
              Clique para enviar {creativeType === "image" ? "uma imagem" : "um vídeo"}
            </span>
            <span className="text-[10px]">
              {creativeType === "image"
                ? "PNG, JPG · até 10MB · formato quadrado (1:1) recomendado"
                : "MP4 · até 60s · vertical (9:16) recomendado"}
            </span>
          </button>
        </section>

        {/* Copy */}
        <section className="space-y-3">
          <SectionTitle icon={Sparkles}>Textos do anúncio</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label>Título interno (só você vê)</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Promo X-Bacon · Junho" />
            </div>
            <div>
              <Label>Chamada principal</Label>
              <Input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Hambúrguer artesanal por R$ 19,90 🔥"
                maxLength={60}
              />
              <Hint>{headline.length}/60</Hint>
            </div>
            <div>
              <Label>Botão de ação (CTA)</Label>
              <select
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              >
                <option>Pedir no WhatsApp</option>
                <option>Falar com a loja</option>
                <option>Ver cardápio</option>
                <option>Reservar agora</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label>Descrição (corpo do anúncio)</Label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                maxLength={180}
                placeholder="Delivery rápido na sua região. Peça em 2 cliques pelo WhatsApp e receba quentinho 🚀"
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
              />
              <Hint>{body.length}/180</Hint>
            </div>
          </div>
        </section>

        {/* Targeting */}
        <section className="space-y-3">
          <SectionTitle icon={MapPin}>Área de abrangência</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Endereço central</Label>
              <Input
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Bairro, cidade ou CEP"
              />
            </div>
            <div>
              <Label>
                Raio de alcance:{" "}
                <span className="font-mono normal-case tracking-normal text-foreground">
                  {radius} km
                </span>
              </Label>
              <input
                type="range"
                min={1}
                max={20}
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>1 km</span>
                <span>20 km</span>
              </div>
            </div>
          </div>

          {/* Fake map */}
          <div className="relative aspect-[16/6] bg-gradient-to-br from-emerald-50 to-sky-100 dark:from-emerald-950/30 dark:to-sky-950/30 rounded-xl border border-border overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-full border-2 border-primary bg-primary/15 flex items-center justify-center transition-all"
                style={{
                  width: `${Math.min(280, radius * 18 + 60)}px`,
                  height: `${Math.min(280, radius * 18 + 60)}px`,
                }}
              >
                <div className="size-3 bg-primary rounded-full ring-4 ring-primary/30" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 text-[10px] font-mono bg-background/80 backdrop-blur px-2 py-1 rounded">
              {area} · raio {radius} km
            </div>
          </div>
        </section>

        {/* Audience */}
        <section className="space-y-3">
          <SectionTitle icon={Users}>Público</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>
                Faixa etária:{" "}
                <span className="font-mono normal-case tracking-normal text-foreground">
                  {ageRange[0]} – {ageRange[1]} anos
                </span>
              </Label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min={13}
                  max={ageRange[1]}
                  value={ageRange[0]}
                  onChange={(e) => setAgeRange([parseInt(e.target.value) || 18, ageRange[1]])}
                  className="w-20 px-2 py-1.5 bg-card border border-border rounded text-sm font-mono"
                />
                <span className="text-muted-foreground">→</span>
                <input
                  type="number"
                  min={ageRange[0]}
                  max={75}
                  value={ageRange[1]}
                  onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value) || 55])}
                  className="w-20 px-2 py-1.5 bg-card border border-border rounded text-sm font-mono"
                />
              </div>
            </div>
            <div>
              <Label>Adicionar interesse</Label>
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Ex: Comida japonesa"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newInterest.trim()) {
                      e.preventDefault();
                      setAudience([...audience, newInterest.trim()]);
                      setNewInterest("");
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newInterest.trim()) {
                      setAudience([...audience, newInterest.trim()]);
                      setNewInterest("");
                    }
                  }}
                  className="px-3 text-xs font-bold uppercase tracking-widest border border-border rounded hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {audience.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2.5 py-1 bg-accent/10 text-accent rounded-full flex items-center gap-1.5"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setAudience(audience.filter((t) => t !== tag))}
                  className="hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar summary */}
      <aside className="space-y-4 lg:sticky lg:top-4 self-start">
        {/* Ad preview */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden ring-1 ring-black/5">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-full bg-gradient-to-br from-amber-400 to-rose-500" />
              <div>
                <p className="text-xs font-bold leading-none">sua_loja</p>
                <p className="text-[10px] text-muted-foreground">Patrocinado · {area.split(",")[0]}</p>
              </div>
            </div>
            <Instagram className="size-4 text-muted-foreground" />
          </div>
          <div className="aspect-square bg-gradient-to-br from-amber-100 via-rose-100 to-violet-100 dark:from-amber-950/40 dark:via-rose-950/40 dark:to-violet-950/40 flex items-center justify-center">
            {creativeType === "image" ? (
              <ImageIcon className="size-10 text-muted-foreground/40" />
            ) : (
              <Video className="size-10 text-muted-foreground/40" />
            )}
          </div>
          <div className="p-4">
            <p className="text-sm font-bold leading-snug">
              {headline || "Sua chamada principal aparece aqui"}
            </p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-3">
              {body || "Texto do anúncio que os clientes vão ler antes de clicar."}
            </p>
            <button
              type="button"
              className="mt-3 w-full py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2"
            >
              {cta}
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-2xl p-5 ring-1 ring-black/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">
            Resumo
          </p>
          <Row label="Plano">{plan.name}</Row>
          <Row label="Duração">{plan.duration}</Row>
          <Row label="Investimento">
            <span className="font-mono">R$ {plan.price.toFixed(2).replace(".", ",")}</span>
          </Row>
          <Row label="Alcance estimado">
            <span className="font-mono">
              {formatRange(plan.reachMin, plan.reachMax)}
            </span>
          </Row>
          <Row label="Cliques estimados">
            <span className="font-mono">{plan.clicksEstimate}</span>
          </Row>
          <Row label="Alcance/dia">
            <span className="font-mono">~{estimatedDailyReach.toLocaleString("pt-BR")}</span>
          </Row>

          <button
            onClick={onLaunch}
            disabled={!headline.trim()}
            className="mt-4 w-full py-2.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Rocket className="size-3.5" /> Publicar campanha
          </button>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            Aprovação da Meta em até 24h
          </p>
        </div>
      </aside>
    </div>
  );
}

function CampaignRow({ campaign }: { campaign: Campaign }) {
  const plan = CAMPAIGN_PLANS.find((p) => p.id === campaign.planId);
  const tone: "success" | "warning" | "muted" | "danger" =
    campaign.status === "ativa"
      ? "success"
      : campaign.status === "agendada"
        ? "warning"
        : campaign.status === "encerrada"
          ? "muted"
          : "danger";

  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/30">
      <td className="px-4 py-3">
        <div className="font-semibold">{campaign.title}</div>
        <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
          <Calendar className="size-3" /> {campaign.startDate} → {campaign.endDate} ·{" "}
          <MapPin className="size-3" /> {campaign.area}
        </div>
      </td>
      <td className="px-4 py-3 text-xs">{plan?.name || "—"}</td>
      <td className="px-4 py-3">
        <StatusPill tone={tone} dot>
          {campaign.status}
        </StatusPill>
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm">
        R$ {campaign.spend.toFixed(2).replace(".", ",")}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm">
        {campaign.reach.toLocaleString("pt-BR")}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm">
        {campaign.clicks.toLocaleString("pt-BR")}
      </td>
    </tr>
  );
}

function SuccessDialog({
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
            <span className="font-mono font-semibold">
              R$ {plan.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duração</span>
            <span className="font-semibold">{plan.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Alcance estimado</span>
            <span className="font-mono font-semibold">
              {formatRange(plan.reachMin, plan.reachMax)}
            </span>
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

/* helpers */
function formatRange(a: number, b: number) {
  return `${a.toLocaleString("pt-BR")} – ${b.toLocaleString("pt-BR")}`;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-semibold px-2.5 py-1 bg-white/15 backdrop-blur rounded-full flex items-center gap-1.5">
      {children}
    </span>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Users;
}) {
  return (
    <div className="bg-muted/50 rounded-lg p-2.5">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
        <Icon className="size-3" /> {label}
      </div>
      <div className="text-sm font-bold font-mono">{value}</div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: typeof Users;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
      <Icon className="size-3.5 text-accent" />
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
      {children}
    </label>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] text-muted-foreground mt-1 text-right font-mono">{children}</div>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition ${
        props.className || ""
      }`}
    />
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center text-xs py-1.5 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{children}</span>
    </div>
  );
}
