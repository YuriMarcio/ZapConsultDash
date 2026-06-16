import { createFileRoute } from "@tanstack/react-router";
import { FinanceiroPage } from "@/pages/FinanceiroPage";

export const Route = createFileRoute("/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro — Sinal" }] }),
  component: FinanceiroPage,
});
