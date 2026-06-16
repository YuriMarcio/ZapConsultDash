import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  GetConversationResponse,
  GetMessagesRequest,
  GetMessagesResponse,
  ListConversationsRequest,
  ListConversationsResponse,
  SendMessageRequest,
  SendMessageResponse,
  UpdateConversationRequest,
  UpdateConversationResponse,
} from "@/api/types";

export const convKeys = {
  all:      ()                          => ["conversations"] as const,
  list:     (f?: ListConversationsRequest) => ["conversations", "list", f] as const,
  detail:   (id: string)               => ["conversations", "detail", id] as const,
  messages: (id: string, p?: GetMessagesRequest) => ["conversations", "messages", id, p] as const,
};

export function useConversations(filters?: ListConversationsRequest) {
  return useQuery({
    queryKey: convKeys.list(filters),
    queryFn:  () => api.get<ListConversationsResponse>(ENDPOINTS.conversations.list, filters as Record<string, string | undefined>),
    refetchInterval: 15_000,
  });
}

export function useConversation(id: string) {
  return useQuery({
    queryKey: convKeys.detail(id),
    queryFn:  () => api.get<GetConversationResponse>(ENDPOINTS.conversations.detail(id)),
    enabled:  !!id,
  });
}

export function useMessages(convId: string, params?: GetMessagesRequest) {
  return useQuery({
    queryKey: convKeys.messages(convId, params),
    queryFn:  () => api.get<GetMessagesResponse>(ENDPOINTS.conversations.messages(convId), params as Record<string, number | undefined>),
    enabled:  !!convId,
    refetchInterval: 5_000,
  });
}

export function useSendMessage(convId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: SendMessageRequest) =>
      api.post<SendMessageResponse>(ENDPOINTS.conversations.messages(convId), body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: convKeys.messages(convId) });
      qc.invalidateQueries({ queryKey: convKeys.list() });
    },
  });
}

export function useUpdateConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateConversationRequest }) =>
      api.patch<UpdateConversationResponse>(ENDPOINTS.conversations.detail(id), body),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: convKeys.list() });
      qc.invalidateQueries({ queryKey: convKeys.detail(id) });
    },
  });
}

export function useMarkRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.patch<void>(ENDPOINTS.conversations.markRead(id)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: convKeys.all() });
    },
  });
}
