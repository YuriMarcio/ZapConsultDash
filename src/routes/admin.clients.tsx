import { createFileRoute } from "@tanstack/react-router";
import { AdminClientsPage } from "@/pages/AdminClientsPage";

export const Route = createFileRoute("/admin/clients")({
  head: () => ({ meta: [{ title: "Clientes — Admin Sinal" }] }),
  component: AdminClientsPage,
});
