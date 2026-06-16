import { createFileRoute } from "@tanstack/react-router";
import { ConversasPage } from "@/pages/ConversasPage";

export const Route = createFileRoute("/conversas")({
  head: () => ({ meta: [{ title: "Conversas — Sinal" }] }),
  component: ConversasPage,
});
