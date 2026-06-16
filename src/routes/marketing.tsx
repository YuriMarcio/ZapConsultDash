import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/pages/MarketingPage";

export const Route = createFileRoute("/marketing")({
  head: () => ({ meta: [{ title: "Marketing Local — Sinal" }] }),
  component: MarketingPage,
});
