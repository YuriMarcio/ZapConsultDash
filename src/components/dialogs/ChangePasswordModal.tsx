import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { KeyRound, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChangePassword } from "@/api/services/auth.service";
import type { ApiError } from "@/api/types";

export function ChangePasswordModal({ open }: { open: boolean }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const changePassword = useChangePassword();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    changePassword.mutate(
      { newPassword: password },
      { onError: (err) => setError((err as ApiError)?.message || "Não foi possível trocar a senha.") },
    );
  };

  return (
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogPrimitive.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-sm translate-x-[-50%] translate-y-[-50%]",
            "border border-border bg-background rounded-lg shadow-lg p-6",
          )}
        >
          <DialogPrimitive.Title className="text-lg font-bold tracking-tight flex items-center gap-2">
            <KeyRound className="size-4" /> Defina sua senha
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="text-xs text-muted-foreground mt-1 mb-4">
            Este é seu primeiro acesso. Defina uma senha definitiva antes de continuar.
          </DialogPrimitive.Description>

          <form onSubmit={submit} className="space-y-4">
            {error && (
              <div className="text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-md px-3 py-2.5">
                {error}
              </div>
            )}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Nova senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
            <button
              type="submit"
              disabled={changePassword.isPending}
              className="w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {changePassword.isPending ? <Loader2 className="size-3.5 animate-spin" /> : null}
              Salvar senha
            </button>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
