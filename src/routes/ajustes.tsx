import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusPill } from "@/components/ui/StatusPill";

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

function AjustesPage() {
  return (
    <AppLayout title="Ajustes">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
          Configurações
        </p>
        <h1 className="text-2xl font-bold tracking-tight">Ajustes da Loja</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
            <h2 className="font-bold tracking-tight mb-1">Dados da loja</h2>
            <p className="text-xs text-muted-foreground mb-5">
              Estas informações aparecem no cardápio e nos comprovantes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nome" value="Central Burguer" />
              <Field label="CNPJ" value="42.318.221/0001-04" />
              <Field label="Telefone" value="+55 11 99312-1100" />
              <Field label="E-mail" value="contato@centralburguer.com" />
              <div className="col-span-2">
                <Field label="Endereço" value="Rua Augusta, 1024 — Jardins, São Paulo/SP" />
              </div>
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
            <h2 className="font-bold tracking-tight mb-1">Operação</h2>
            <p className="text-xs text-muted-foreground mb-5">Horários e entrega.</p>
            <div className="grid grid-cols-2 gap-4">
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
