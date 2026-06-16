import { createFileRoute } from "@tanstack/react-router";
import { AjustesPage } from "@/pages/AjustesPage";

export const Route = createFileRoute("/ajustes")({
  head: () => ({ meta: [{ title: "Ajustes — Sinal" }] }),
  component: AjustesPage,
});
