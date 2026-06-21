import { createFileRoute } from "@tanstack/react-router";
import { AdminClientDetailPage } from "@/pages/AdminClientDetailPage";

export const Route = createFileRoute("/admin/clients/$clientId")({
  head: () => ({ meta: [{ title: "Cliente — Admin Sinal" }] }),
  component: AdminClientDetailPage,
});
