import { createFileRoute } from "@tanstack/react-router";
import { PromocoesPage } from "@/pages/PromocoesPage";

export const Route = createFileRoute("/promocoes")({
  head: () => ({ meta: [{ title: "Promoções — Sinal" }] }),
  component: PromocoesPage,
});
