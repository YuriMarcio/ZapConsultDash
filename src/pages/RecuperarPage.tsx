import { Link } from "@tanstack/react-router";

export function RecuperarPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-sm animate-entrance">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">
          Esqueci minha senha
        </p>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Recuperar acesso</h2>
        <p className="text-sm text-muted-foreground mb-8">
          Enviaremos um link de redefinição para seu e-mail.
        </p>

        <input
          type="email"
          placeholder="voce@restaurante.com"
          className="w-full bg-card border border-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />

        <button
          type="submit"
          className="mt-6 w-full bg-primary text-primary-foreground py-2.5 rounded-md text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Enviar link
        </button>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          <Link to="/login" className="text-accent font-semibold hover:underline">
            ← Voltar ao login
          </Link>
        </p>
      </form>
    </div>
  );
}
