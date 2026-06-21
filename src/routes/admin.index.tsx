import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — Sinal" }] }),
  component: AdminDashboardPage,
});
