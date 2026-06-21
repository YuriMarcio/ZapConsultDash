import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { useAdminSettings, useUpdateAdminSettings } from "@/api/services/admin/settings.service";
import { Loader2, Save } from "lucide-react";

export function AdminSettingsPage() {
  const { data } = useAdminSettings();
  const updateSettings = useUpdateAdminSettings();

  const [masterInstance, setMasterInstance] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMasterInstance(data?.data?.masterWhatsappInstance ?? "");
  }, [data]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    updateSettings.mutate(
      { masterWhatsappInstance: masterInstance || null },
      { onSuccess: () => setSaved(true) },
    );
  };

  return (
    <AdminLayout title="Configurações">
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">Painel SINAL</p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Configurações</h1>
      </div>

      <form
        onSubmit={submit}
        className="bg-card border border-border rounded-xl p-5 sm:p-6 max-w-lg space-y-4"
      >
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
            Instância mestre do WhatsApp
          </label>
          <input
            value={masterInstance}
            onChange={(e) => setMasterInstance(e.target.value)}
            placeholder="Ex: ZaPediu"
            className="w-full px-3 py-2 bg-background border border-border rounded text-sm outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Instância já conectada na Evolution API usada para enviar a senha de acesso por WhatsApp
            aos novos clientes cadastrados. Deixe vazio para não enviar por WhatsApp.
          </p>
        </div>

        {saved && (
          <p className="text-xs text-emerald-600">Configuração salva.</p>
        )}

        <button
          type="submit"
          disabled={updateSettings.isPending}
          className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {updateSettings.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
          Salvar
        </button>
      </form>
    </AdminLayout>
  );
}
