import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — Sinal" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 400);
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-primary text-primary-foreground p-12 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="size-7 bg-primary-foreground rounded-sm flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-primary" />
          </div>
          <span className="font-semibold tracking-tight text-lg uppercase">Sinal</span>
        </div>

        <div className="relative z-10 max-w-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-4">
            Operação WhatsApp
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-balance leading-tight">
            O sistema operacional dos restaurantes que vendem pelo WhatsApp.
          </h1>
          <p className="mt-6 text-sm text-primary-foreground/60 leading-relaxed">
            Conecte seu número, receba pedidos no kanban, automatize o atendimento e
            acompanhe o financeiro — tudo em um painel só.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 text-xs">
          <div>
            <div className="text-2xl font-bold tracking-tighter">+12k</div>
            <div className="text-primary-foreground/50">Pedidos/dia</div>
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tighter">2.4s</div>
            <div className="text-primary-foreground/50">Tempo resposta</div>
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tighter">99.9%</div>
            <div className="text-primary-foreground/50">Uptime</div>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <form onSubmit={submit} className="w-full max-w-sm animate-entrance">
          <div className="lg:hidden flex items-center gap-3 mb-12">
            <div className="size-7 bg-primary rounded-sm flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight text-lg uppercase">Sinal</span>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">
            Acesso ao painel
          </p>
          <h2 className="text-2xl font-bold tracking-tight mb-2">Bem-vindo de volta</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Entre com sua conta para continuar.
          </p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                E-mail
              </label>
              <input
                type="email"
                defaultValue="matheus@centralburguer.com"
                className="mt-2 w-full bg-card border border-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Senha
                </label>
                <Link to="/recuperar" className="text-[10px] text-accent font-medium hover:underline">
                  Esqueci minha senha
                </Link>
              </div>
              <input
                type="password"
                defaultValue="••••••••"
                className="mt-2 w-full bg-card border border-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full bg-primary text-primary-foreground py-2.5 rounded-md text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar no painel"}
            <ArrowRight className="size-3.5" />
          </button>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            Ainda não tem conta?{" "}
            <Link to="/cadastro" className="text-accent font-semibold hover:underline">
              Criar conta gratuita
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
