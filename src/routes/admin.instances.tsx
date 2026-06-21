import { createFileRoute } from "@tanstack/react-router";
import { AdminInstancesPage } from "@/pages/AdminInstancesPage";

export const Route = createFileRoute("/admin/instances")({
  head: () => ({ meta: [{ title: "Instâncias — Admin Sinal" }] }),
  component: AdminInstancesPage,
});
