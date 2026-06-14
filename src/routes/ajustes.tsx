import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusPill } from "@/components/ui/StatusPill";
import { SOURCE_META, type OrderSource } from "@/lib/mock-data";
import { Check, Plug, Settings2, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/ajustes")({
  head: () => ({ meta: [{ title: "Ajustes — Sinal" }] }),
  component: AjustesPage,
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <input
        defaultValue={value}
        className="mt-2 w-full bg-card border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}

type IntegrationKey = Extract<OrderSource, "ifood" | "rappi" | "ubereats" | "99food" | "cardapio">;

interface IntegrationCfg {
  key: IntegrationKey;
  description: string;
  authType: "merchant" | "store" | "link";
  docsUrl: string;
}

const INTEGRATIONS: IntegrationCfg[] = [
  {
    key: "ifood",
    description: "Receba pedidos do iFood direto no quadro. Sincroniza cardápio, pausas e horários.",
    authType: "merchant",
    docsUrl: "https://developer.ifood.com.br",
  },
  {
    key: "rappi",
    description: "Importe pedidos da Rappi e mantenha o status atualizado em tempo real.",
    authType: "store",
    docsUrl: "https://dev-portal.rappi.com",
  },
  {
    key: "ubereats",
    description: "Conecte sua loja do Uber Eats para centralizar todos os canais.",
    authType: "store",
    docsUrl: "https://developer.uber.com/docs/eats",
  },
  {
    key: "99food",
    description: "Receba pedidos do 99 Food com confirmação automática.",
    authType: "merchant",
    docsUrl: "#",
  },
  {
    key: "cardapio",
    description: "Seu cardápio digital com link próprio. Pedidos caem direto aqui.",
    authType: "link",
    docsUrl: "#",
  },
];

function AjustesPage() {
  return (
    <AppLayout title="Ajustes">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
          Configurações
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Ajustes da Loja</h1>
      </div>

      {/* Integrations — top priority */}
      <section className="bg-card border border-border rounded-xl p-5 sm:p-6 ring-1 ring-black/5 mb-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1 flex items-center gap-1.5">
              <Plug className="size-3" /> Integrações
            </p>
            <h2 className="font-bold tracking-tight text-lg">Marketplaces & Cardápio Digital</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Centralize os pedidos do iFood, Rappi, 99 Food, Uber Eats e do seu cardápio digital em um único quadro.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {INTEGRATIONS.map((i) => (
            <IntegrationCard key={i.key} cfg={i} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
            <h2 className="font-bold tracking-tight mb-1">Dados da loja</h2>
            <p className="text-xs text-muted-foreground mb-5">
              Estas informações aparecem no cardápio e nos comprovantes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nome" value="Central Burguer" />
              <Field label="CNPJ" value="42.318.221/0001-04" />
              <Field label="Telefone" value="+55 11 99312-1100" />
              <Field label="E-mail" value="contato@centralburguer.com" />
              <div className="sm:col-span-2">
                <Field label="Endereço" value="Rua Augusta, 1024 — Jardins, São Paulo/SP" />
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
            <h2 className="font-bold tracking-tight mb-1">Operação</h2>
            <p className="text-xs text-muted-foreground mb-5">Horários e entrega.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Abertura" value="18:00" />
              <Field label="Fechamento" value="23:30" />
              <Field label="Taxa de entrega base" value="R$ 6,00" />
              <Field label="Raio de entrega (km)" value="5" />
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
            <h2 className="font-bold tracking-tight mb-4">Equipe</h2>
            <div className="space-y-2">
              {[
                { name: "Matheus Silva", role: "Owner", email: "matheus@..." },
                { name: "Larissa Pinto", role: "Gerente", email: "larissa@..." },
                { name: "Carlos Mendes", role: "Atendente", email: "carlos@..." },
              ].map((u) => (
                <div key={u.name} className="flex items-center justify-between p-3 bg-muted rounded border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 text-xs font-bold flex items-center justify-center">
                      {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{u.name}</div>
                      <div className="text-[11px] text-muted-foreground font-mono">{u.email}</div>
                    </div>
                  </div>
                  <StatusPill tone={u.role === "Owner" ? "success" : "muted"}>{u.role}</StatusPill>
                </div>
              ))}
              <button className="w-full mt-2 px-3 py-2 text-xs font-bold uppercase tracking-widest border border-dashed border-border rounded text-muted-foreground hover:bg-muted">
                + Convidar membro
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-primary text-primary-foreground rounded-xl p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">
              Seu plano
            </p>
            <h3 className="text-xl font-bold tracking-tight">Enterprise</h3>
            <p className="text-xs text-primary-foreground/60 mt-1 mb-5">
              Próxima cobrança: 14 de junho
            </p>
            <div className="space-y-2 text-xs">
              {[
                "WhatsApp ilimitado",
                "Múltiplos atendentes",
                "Mercado Pago integrado",
                "Suporte prioritário 24/7",
              ].map((b) => (
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

function IntegrationCard({ cfg }: { cfg: IntegrationCfg }) {
  // pre-connect some to show variety
  const initialConnected = cfg.key === "ifood" || cfg.key === "cardapio";
  const [connected, setConnected] = useState(initialConnected);
  const [open, setOpen] = useState(false);
  const meta = SOURCE_META[cfg.key];

  const authLabel =
    cfg.authType === "merchant"
      ? "Merchant ID"
      : cfg.authType === "store"
        ? "Store ID"
        : "Slug do cardápio";

  return (
    <div className="border border-border rounded-lg p-4 bg-background hover:border-accent/40 transition flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`size-10 rounded-lg flex items-center justify-center font-bold text-sm ${meta.color} ${meta.text} shrink-0`}
          >
            {meta.short}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-tight truncate">{meta.label}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {cfg.authType === "link" ? "Cardápio próprio" : "Marketplace"}
            </div>
          </div>
        </div>
        {connected ? (
          <StatusPill tone="success" dot>
            Conectado
          </StatusPill>
        ) : (
          <StatusPill tone="muted">Inativo</StatusPill>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed flex-1">
        {cfg.description}
      </p>

      {open && (
        <div className="space-y-2 mb-3 pt-3 border-t border-border">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {authLabel}
            </label>
            <input
              placeholder={cfg.authType === "link" ? "minha-loja" : "0000-0000"}
              className="mt-1 w-full bg-card border border-border rounded px-2.5 py-1.5 text-xs font-mono outline-none focus:border-accent"
            />
          </div>
          {cfg.authType !== "link" && (
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Token de acesso
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="mt-1 w-full bg-card border border-border rounded px-2.5 py-1.5 text-xs font-mono outline-none focus:border-accent"
              />
            </div>
          )}
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <a
              href={cfg.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              Onde encontrar? <ExternalLink className="size-3" />
            </a>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 pt-3 border-t border-border">
        {connected ? (
          <>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest border border-border rounded hover:bg-muted inline-flex items-center justify-center gap-1.5"
            >
              <Settings2 className="size-3" /> Configurar
            </button>
            <button
              onClick={() => setConnected(false)}
              className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 rounded"
            >
              Desconectar
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setOpen(true);
              setConnected(true);
            }}
            className={`flex-1 px-3 py-2 text-[11px] font-bold uppercase tracking-widest rounded inline-flex items-center justify-center gap-1.5 ${meta.color} ${meta.text} hover:opacity-90`}
          >
            <Check className="size-3" /> Conectar {meta.label}
          </button>
        )}
      </div>
    </div>
  );
}
