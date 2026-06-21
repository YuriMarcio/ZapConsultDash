import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type { ListInstancesResponse, ReconnectInstanceResponse } from "@/api/types";

export const adminInstanceKeys = {
  all: () => ["admin", "instances"] as const,
};

export function useAdminInstances() {
  return useQuery({
    queryKey: adminInstanceKeys.all(),
    queryFn:  () => api.get<ListInstancesResponse>(ENDPOINTS.admin.instances.list),
    refetchInterval: 30_000,
  });
}

export function useReconnectInstance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => api.post<ReconnectInstanceResponse>(ENDPOINTS.admin.instances.reconnect(id)),
    onSuccess:  () => qc.invalidateQueries({ queryKey: adminInstanceKeys.all() }),
  });
}

export function useDisconnectInstance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => api.post<void>(ENDPOINTS.admin.instances.disconnect(id)),
    onSuccess:  () => qc.invalidateQueries({ queryKey: adminInstanceKeys.all() }),
  });
}
