import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useTenant, useUpdateTenant } from "@/api/services/tenant.service";
import type { UpdateTenantRequest } from "@/api/types";

function SkeletonField() {
  return (
    <div className="space-y-2">
      <div className="h-3 w-20 bg-muted rounded animate-pulse" />
      <div className="h-9 w-full bg-muted rounded-md animate-pulse" />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-card border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}

export function StoreSettingsForm() {
  const { data, isLoading } = useTenant();
  const update = useUpdateTenant();
  const profile = data?.data;

  const [form, setForm] = useState<UpdateTenantRequest>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        name:           profile.name          ?? "",
        cnpj:           profile.cnpj          ?? "",
        phone:          profile.phone         ?? "",
        email:          profile.email         ?? "",
        address:        profile.address       ?? "",
        openTime:       profile.openTime      ?? "",
        closeTime:      profile.closeTime     ?? "",
        deliveryFee:    profile.deliveryFee   ?? 0,
        deliveryRadius: profile.deliveryRadius ?? 0,
      });
    }
  }, [profile]);

  const set = (key: keyof UpdateTenantRequest) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const save = () => {
    update.mutate(form, {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      },
    });
  };

  return (
    <div className="space-y-6">
      <section className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
        <h2 className="font-bold tracking-tight mb-1">Dados da loja</h2>
        <p className="text-xs text-muted-foreground mb-5">
          Estas informações aparecem no cardápio e nos comprovantes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonField key={i} />)
          ) : (
            <>
              <Field label="Nome"     value={String(form.name    ?? "")} onChange={set("name")}    />
              <Field label="CNPJ"     value={String(form.cnpj    ?? "")} onChange={set("cnpj")}    />
              <Field label="Telefone" value={String(form.phone   ?? "")} onChange={set("phone")}   />
              <Field label="E-mail"   value={String(form.email   ?? "")} onChange={set("email")}   />
              <div className="sm:col-span-2">
                <Field label="Endereço" value={String(form.address ?? "")} onChange={set("address")} />
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
        <h2 className="font-bold tracking-tight mb-1">Operação</h2>
        <p className="text-xs text-muted-foreground mb-5">Horários e entrega.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonField key={i} />)
          ) : (
            <>
              <Field label="Abertura"              value={String(form.openTime      ?? "")} onChange={set("openTime")}       />
              <Field label="Fechamento"            value={String(form.closeTime     ?? "")} onChange={set("closeTime")}      />
              <Field label="Taxa de entrega base"  value={String(form.deliveryFee   ?? "")} onChange={(v) => setForm((f) => ({ ...f, deliveryFee: Number(v) }))} />
              <Field label="Raio de entrega (km)"  value={String(form.deliveryRadius ?? "")} onChange={(v) => setForm((f) => ({ ...f, deliveryRadius: Number(v) }))} />
            </>
          )}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={update.isPending || isLoading}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90 transition-all disabled:opacity-60"
        >
          {update.isPending ? <Loader2 className="size-3.5 animate-spin" /> : null}
          {saved ? "Salvo!" : update.isPending ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>
    </div>
  );
}
