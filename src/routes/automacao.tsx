import { createFileRoute } from "@tanstack/react-router";
import { AutomacaoPage } from "@/pages/AutomacaoPage";

export const Route = createFileRoute("/automacao")({
  head: () => ({ meta: [{ title: "Automações — Sinal" }] }),
  component: AutomacaoPage,
});
