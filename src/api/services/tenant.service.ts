import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type { TenantProfileResponse, TenantPlanResponse, UpdateTenantRequest } from "@/api/types";

export const tenantKeys = {
  profile: () => ["tenant", "profile"] as const,
  plan:    () => ["tenant", "plan"]    as const,
};

export function useTenant() {
  return useQuery({
    queryKey: tenantKeys.profile(),
    queryFn:  () => api.get<TenantProfileResponse>(ENDPOINTS.tenant.profile),
  });
}

export function useUpdateTenant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateTenantRequest) =>
      api.patch<TenantProfileResponse>(ENDPOINTS.tenant.profile, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: tenantKeys.profile() }),
  });
}

export function useTenantPlan() {
  return useQuery({
    queryKey: tenantKeys.plan(),
    queryFn:  () => api.get<TenantPlanResponse>(ENDPOINTS.tenant.plan),
  });
}
