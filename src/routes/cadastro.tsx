import { createFileRoute } from "@tanstack/react-router";
import { CadastroPage } from "@/pages/CadastroPage";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Criar conta — Sinal" }] }),
  component: CadastroPage,
});
