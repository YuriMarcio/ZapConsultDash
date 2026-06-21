import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  CreateClientRequest,
  CreateClientResponse,
  GetClientResponse,
  ListClientsRequest,
  ListClientsResponse,
  UpdateClientStatusRequest,
  UpdateClientStatusResponse,
} from "@/api/types";

export const adminClientKeys = {
  all:    () => ["admin", "clients"] as const,
  list:   (filters?: ListClientsRequest) => ["admin", "clients", "list", filters] as const,
  detail: (id: string) => ["admin", "clients", "detail", id] as const,
};

export function useAdminClients(filters?: ListClientsRequest) {
  return useQuery({
    queryKey: adminClientKeys.list(filters),
    queryFn:  () => api.get<ListClientsResponse>(ENDPOINTS.admin.clients.list, filters as Record<string, string | number | boolean | undefined>),
  });
}

export function useAdminClient(id: string) {
  return useQuery({
    queryKey: adminClientKeys.detail(id),
    queryFn:  () => api.get<GetClientResponse>(ENDPOINTS.admin.clients.detail(id)),
    enabled:  !!id,
  });
}

export function useCreateClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateClientRequest) =>
      api.post<CreateClientResponse>(ENDPOINTS.admin.clients.create, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminClientKeys.all() }),
  });
}

export function useUpdateClientStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateClientStatusRequest }) =>
      api.patch<UpdateClientStatusResponse>(ENDPOINTS.admin.clients.status(id), body),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminClientKeys.all() }),
  });
}

export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(ENDPOINTS.admin.clients.delete(id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminClientKeys.all() }),
  });
}
