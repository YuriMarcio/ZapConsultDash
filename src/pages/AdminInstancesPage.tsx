import { AdminLayout } from "@/components/templates/AdminLayout";
import { InstancesTable } from "@/components/organisms/InstancesTable";
import { useAdminInstances, useReconnectInstance } from "@/api/services/admin/instances.service";

export function AdminInstancesPage() {
  const { data } = useAdminInstances();
  const reconnect = useReconnectInstance();
  const instances = data?.data ?? [];

  return (
    <AdminLayout title="Instâncias">
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">Painel SINAL</p>
        <h1 className="text-2xl font-bold tracking-tight">Instâncias WhatsApp</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitoramento de todas as conexões WhatsApp dos clientes.
        </p>
      </div>

      <InstancesTable
        instances={instances}
        reconnectingId={reconnect.isPending ? reconnect.variables : undefined}
        onReconnect={(instance) => reconnect.mutate(instance.id)}
      />
    </AdminLayout>
  );
}
