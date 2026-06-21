import { createFileRoute } from "@tanstack/react-router";
import { AdminPlansPage } from "@/pages/AdminPlansPage";

export const Route = createFileRoute("/admin/plans")({
  head: () => ({ meta: [{ title: "Planos — Admin Sinal" }] }),
  component: AdminPlansPage,
});
