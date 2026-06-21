import { useState } from "react";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { ClientsTable } from "@/components/organisms/ClientsTable";
import { CreateClientDialog } from "@/components/dialogs/CreateClientDialog";
import { useAdminClients, useDeleteClient, useUpdateClientStatus } from "@/api/services/admin/clients.service";
import type { AdminClient, ClientStatus } from "@/api/types";
import { Plus, Search } from "lucide-react";

const FILTERS: { label: string; value: ClientStatus | "expiring" | "todos" }[] = [
  { label: "Todos",       value: "todos" },
  { label: "Em trial",    value: "trialing" },
  { label: "Ativos",      value: "active" },
  { label: "Para vencer", value: "expiring" },
  { label: "Suspensos",   value: "suspended" },
];

export function AdminClientsPage() {
  const [filter, setFilter] = useState<ClientStatus | "expiring" | "todos">("todos");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data } = useAdminClients({
    status: filter === "todos" ? undefined : filter,
    search: search || undefined,
  });
  const clients = data?.data ?? [];

  const updateStatus = useUpdateClientStatus();
  const deleteClient = useDeleteClient();

  const handleToggleStatus = (client: AdminClient) => {
    const nextStatus: ClientStatus = client.status === "suspended" ? "active" : "suspended";
    updateStatus.mutate({ id: client.id, body: { status: nextStatus } });
  };

  const handleDelete = (client: AdminClient) => {
    deleteClient.mutate(client.id);
  };

  return (
    <AdminLayout title="Clientes">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">Painel SINAL</p>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Clientes</h1>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-2 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded flex items-center justify-center gap-2 hover:opacity-90"
        >
          <Plus className="size-3.5" /> Novo cliente
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded w-full sm:w-72">
          <Search className="size-3.5 text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar cliente..."
            className="bg-transparent text-xs outline-none w-full"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`shrink-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded border transition-colors ${
                filter === f.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <ClientsTable clients={clients} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />

      <CreateClientDialog open={open} onOpenChange={setOpen} />
    </AdminLayout>
  );
}
