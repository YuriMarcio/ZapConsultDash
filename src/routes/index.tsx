import { createFileRoute, redirect } from "@tanstack/react-router";
import { tokenStore } from "@/api/client";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const role = tokenStore.getUser()?.role;
    throw redirect({ to: role === "super_admin" ? "/admin" : "/dashboard" });
  },
});
