import { useEffect, useState } from "react";
import { Check, Copy, Loader2, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useCreateClient } from "@/api/services/admin/clients.service";
import { useAdminPlans } from "@/api/services/admin/plans.service";
import type { ApiError, CreateClientResult } from "@/api/types";

export function CreateClientDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { data: plansData } = useAdminPlans();
  const plans = plansData?.data ?? [];

  const [name, setName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [plan, setPlan] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<CreateClientResult | null>(null);
  const [copied, setCopied] = useState(false);

  const createClient = useCreateClient();

  useEffect(() => {
    if (!plan && plans.length > 0) setPlan(plans[0].slug);
  }, [plan, plans]);

  const reset = () => {
    setName("");
    setOwnerName("");
    setOwnerEmail("");
    setOwnerPhone("");
    setPlan("");
    setError("");
    setResult(null);
    setCopied(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    createClient.mutate(
      { name, ownerName, ownerEmail, ownerPhone: ownerPhone || undefined, plan },
      {
        onSuccess: (res) => setResult(res.data),
        onError: (err) => setError((err as ApiError)?.message || "Não foi possível criar o cliente."),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <DialogContent className="max-w-md p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">Painel SINAL</p>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {result ? "Cliente criado" : "Novo cliente"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {result
              ? "A instância do WhatsApp já está sendo provisionada. O próprio cliente escaneia o QR Code no painel dele."
              : "Cadastre a loja e o responsável. Uma instância do WhatsApp será provisionada automaticamente."}
          </DialogDescription>
        </DialogHeader>

        {result ? (
          <div className="px-6 py-6 flex flex-col items-center gap-4">
            <div className="w-full p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1.5">
                Senha temporária do responsável — só é exibida agora
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono font-semibold">{result.ownerPassword}</code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(result.ownerPassword);
                    setCopied(true);
                  }}
                  className="size-7 flex items-center justify-center rounded hover:bg-amber-100 dark:hover:bg-amber-900/40 transition"
                  title="Copiar senha"
                >
                  {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Envie essa senha ao responsável por e-mail ou WhatsApp, se necessário. Ele vai conectar o
              WhatsApp da loja dentro do próprio painel, em Ajustes.
            </p>
            <button
              onClick={() => { onOpenChange(false); reset(); }}
              className="w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition"
            >
              Concluir
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 py-5 space-y-4">
            {error && (
              <div className="text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-md px-3 py-2.5">
                {error}
              </div>
            )}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Nome da loja *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Central Burguer"
                required
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Nome do responsável *
              </label>
              <input
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Ex: Matheus Silva"
                required
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="dono@loja.com"
                  required
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                  Telefone
                </label>
                <input
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  placeholder="(11) 99999-0000"
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
                Plano *
              </label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full px-3 py-2 bg-card border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              >
                {plans.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
              </select>
            </div>

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-border rounded hover:bg-muted transition flex items-center justify-center gap-2"
              >
                <X className="size-3.5" /> Cancelar
              </button>
              <button
                type="submit"
                disabled={createClient.isPending}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {createClient.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Plus className="size-3.5" />}
                Criar cliente
              </button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
