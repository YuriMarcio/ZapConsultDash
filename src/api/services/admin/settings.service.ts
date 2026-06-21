import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type { AdminSettingsResponse, UpdateAdminSettingsRequest } from "@/api/types";

export const adminSettingsKeys = {
  all: () => ["admin", "settings"] as const,
};

export function useAdminSettings() {
  return useQuery({
    queryKey: adminSettingsKeys.all(),
    queryFn:  () => api.get<AdminSettingsResponse>(ENDPOINTS.admin.settings.get),
  });
}

export function useUpdateAdminSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateAdminSettingsRequest) =>
      api.put<AdminSettingsResponse>(ENDPOINTS.admin.settings.update, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminSettingsKeys.all() }),
  });
}
