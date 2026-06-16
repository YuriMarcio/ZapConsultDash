import { createFileRoute } from "@tanstack/react-router";
import { RecuperarPage } from "@/pages/RecuperarPage";

export const Route = createFileRoute("/recuperar")({
  head: () => ({ meta: [{ title: "Recuperar senha — Sinal" }] }),
  component: RecuperarPage,
});
