import { createFileRoute } from "@tanstack/react-router";
import { ProdutosPage } from "@/pages/ProdutosPage";

export const Route = createFileRoute("/produtos")({
  head: () => ({ meta: [{ title: "Produtos — Sinal" }] }),
  component: ProdutosPage,
});
