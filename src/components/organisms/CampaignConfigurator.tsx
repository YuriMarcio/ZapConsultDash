import { useMemo, useState } from "react";
import { FormLabel } from "@/components/atoms/FormLabel";
import { FormInput } from "@/components/atoms/FormInput";
import { FormHint } from "@/components/atoms/FormHint";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import type { CampaignPlan } from "@/api/types";
import {
  Megaphone,
  MapPin,
  Users,
  MousePointerClick,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Video,
  Instagram,
  Rocket,
  X,
} from "lucide-react";

function formatRange(a: number, b: number) {
  return `${a.toLocaleString("pt-BR")} – ${b.toLocaleString("pt-BR")}`;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center text-xs py-1.5 border-b border-border last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{children}</span>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
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

export function CampaignConfigurator({
  plan,
  onLaunch,
}: {
  plan: CampaignPlan;
  onLaunch: () => void;
}) {
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
                  creativeType === t ? "bg-background shadow-sm" : "text-muted-foreground"
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
              <FormLabel>Título interno (só você vê)</FormLabel>
              <FormInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Promo X-Bacon · Junho" />
            </div>
            <div>
              <FormLabel>Chamada principal</FormLabel>
              <FormInput
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Hambúrguer artesanal por R$ 19,90 🔥"
                maxLength={60}
              />
              <FormHint>{headline.length}/60</FormHint>
            </div>
            <div>
              <FormLabel>Botão de ação (CTA)</FormLabel>
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
              <FormLabel>Descrição (corpo do anúncio)</FormLabel>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
                maxLength={180}
                placeholder="Delivery rápido na sua região. Peça em 2 cliques pelo WhatsApp e receba quentinho 🚀"
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
              />
              <FormHint>{body.length}/180</FormHint>
            </div>
          </div>
        </section>

        {/* Targeting */}
        <section className="space-y-3">
          <SectionTitle icon={MapPin}>Área de abrangência</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <FormLabel>Endereço central</FormLabel>
              <FormInput
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Bairro, cidade ou CEP"
              />
            </div>
            <div>
              <FormLabel>
                Raio de alcance:{" "}
                <span className="font-mono normal-case tracking-normal text-foreground">{radius} km</span>
              </FormLabel>
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
              <FormLabel>
                Faixa etária:{" "}
                <span className="font-mono normal-case tracking-normal text-foreground">
                  {ageRange[0]} – {ageRange[1]} anos
                </span>
              </FormLabel>
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
              <FormLabel>Adicionar interesse</FormLabel>
              <div className="flex gap-2">
                <FormInput
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

        <div className="bg-card border border-border rounded-2xl p-5 ring-1 ring-black/5">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">Resumo</p>
          <Row label="Plano">{plan.name}</Row>
          <Row label="Duração">{plan.duration}</Row>
          <Row label="Investimento">
            <span className="font-mono">R$ {plan.price.toFixed(2).replace(".", ",")}</span>
          </Row>
          <Row label="Alcance estimado">
            <span className="font-mono">{formatRange(plan.reachMin, plan.reachMax)}</span>
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
          <p className="text-[10px] text-muted-foreground mt-2 text-center">Aprovação da Meta em até 24h</p>
        </div>

        <div className="bg-muted/40 border border-border rounded-2xl p-4 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Estimativa de performance
          </p>
          <Stat label="Alcance estimado" value={`${formatRange(plan.reachMin, plan.reachMax)}`} icon={Users} />
          <Stat label="Cliques" value={plan.clicksEstimate} icon={MousePointerClick} />
        </div>
      </aside>
    </div>
  );
}
