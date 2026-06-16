import { createFileRoute } from "@tanstack/react-router";
import { PedidosPage } from "@/pages/PedidosPage";

export const Route = createFileRoute("/pedidos")({
  head: () => ({ meta: [{ title: "Pedidos — Sinal" }] }),
  component: PedidosPage,
});
