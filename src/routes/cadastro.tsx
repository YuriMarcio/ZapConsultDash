import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Criar conta — Sinal" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/dashboard" });
        }}
        className="w-full max-w-md animate-entrance"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="size-7 bg-primary rounded-sm flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-primary-foreground" />
          </div>
          <span className="font-semibold tracking-tight text-lg uppercase">Sinal</span>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">
          Começar agora
        </p>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Crie sua conta</h2>
        <p className="text-sm text-muted-foreground mb-8">
          14 dias grátis. Sem cartão de crédito.
        </p>

        <div className="space-y-4">
          {[
            { label: "Nome do restaurante", placeholder: "Central Burguer" },
            { label: "Seu nome", placeholder: "Matheus Silva" },
            { label: "E-mail", placeholder: "voce@restaurante.com" },
            { label: "Senha", placeholder: "Mínimo 8 caracteres", type: "password" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {f.label}
              </label>
              <input
                type={f.type || "text"}
                placeholder={f.placeholder}
                className="mt-2 w-full bg-card border border-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-primary text-primary-foreground py-2.5 rounded-md text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Criar conta <ArrowRight className="size-3.5" />
        </button>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          Já tem conta?{" "}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
