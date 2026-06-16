import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  ListIntegrationsResponse,
  IntegrationResponse,
  ConnectIntegrationRequest,
  IntegrationKey,
} from "@/api/types";

export const integrationKeys = {
  all:  () => ["integrations"]        as const,
  list: () => ["integrations", "list"] as const,
};

export function useIntegrations() {
  return useQuery({
    queryKey: integrationKeys.list(),
    queryFn:  () => api.get<ListIntegrationsResponse>(ENDPOINTS.integrations.list),
  });
}

export function useConnectIntegration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ key, body }: { key: IntegrationKey; body: ConnectIntegrationRequest }) =>
      api.post<IntegrationResponse>(ENDPOINTS.integrations.connect(key), body),
    onSuccess: () => qc.invalidateQueries({ queryKey: integrationKeys.all() }),
  });
}

export function useDisconnectIntegration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (key: IntegrationKey) =>
      api.delete<void>(ENDPOINTS.integrations.disconnect(key)),
    onSuccess: () => qc.invalidateQueries({ queryKey: integrationKeys.all() }),
  });
}
