import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  ChannelStatusResponse,
  SyncChannelResponse,
  WhatsappConnectResponse,
} from "@/api/types";

export const channelKeys = {
  all:      () => ["channels"] as const,
  whatsapp: () => ["channels", "whatsapp"] as const,
};

export function useWhatsappChannel() {
  return useQuery({
    queryKey: channelKeys.whatsapp(),
    queryFn:  () => api.get<ChannelStatusResponse>(ENDPOINTS.channels.whatsapp),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status;
      return status === "awaiting_scan" ? 3_000 : 30_000;
    },
  });
}

export function useConnectWhatsapp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.post<WhatsappConnectResponse>(ENDPOINTS.channels.connect),
    onSuccess:  () => qc.invalidateQueries({ queryKey: channelKeys.whatsapp() }),
  });
}

export function useDisconnectWhatsapp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.post<void>(ENDPOINTS.channels.disconnect),
    onSuccess:  () => qc.invalidateQueries({ queryKey: channelKeys.all() }),
  });
}

export function useSyncChannel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.post<SyncChannelResponse>(ENDPOINTS.channels.sync),
    onSuccess:  () => qc.invalidateQueries({ queryKey: channelKeys.all() }),
  });
}
