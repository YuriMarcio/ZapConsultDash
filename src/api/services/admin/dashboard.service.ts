import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type { AdminDashboardSummaryResponse } from "@/api/types";

export function useAdminDashboardSummary() {
  return useQuery({
    queryKey: ["admin", "dashboard"] as const,
    queryFn:  () => api.get<AdminDashboardSummaryResponse>(ENDPOINTS.admin.dashboard),
  });
}
