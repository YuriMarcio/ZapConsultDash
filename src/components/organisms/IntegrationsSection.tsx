import { Plug } from "lucide-react";
import { IntegrationCard, type IntegrationCfg } from "@/components/molecules/IntegrationCard";
import { useIntegrations } from "@/api/services/integrations.service";
import type { IntegrationKey } from "@/api/types";

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

export function IntegrationsSection() {
  const { data } = useIntegrations();
  const integrations = data?.data ?? [];

  const findIntegration = (key: IntegrationKey) =>
    integrations.find((i) => i.key === key);

  return (
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
        {INTEGRATIONS.map((cfg) => (
          <IntegrationCard
            key={cfg.key}
            cfg={cfg}
            integration={findIntegration(cfg.key as IntegrationKey)}
          />
        ))}
      </div>
    </section>
  );
}
