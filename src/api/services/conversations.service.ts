import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  ChatMessage,
  Conversation,
  ConversationDTO,
  GetConversationResponseDTO,
  GetMessagesRequest,
  GetMessagesResponse,
  GetMessagesResponseDTO,
  ListConversationsRequest,
  ListConversationsResponse,
  ListConversationsResponseDTO,
  MessageDTO,
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

function toConversation(dto: ConversationDTO): Conversation {
  return {
    id: String(dto.id),
    name: dto.customer?.name ?? dto.customer?.phone ?? "Desconhecido",
    phone: dto.customer?.phone ?? "",
    lastMessage: dto.last_message?.body ?? "",
    time: dto.last_message?.created_at ?? dto.last_message_at ?? "",
    unread: dto.unread_count,
    status: dto.status as Conversation["status"],
    tags: dto.tags,
    totalOrders: dto.customer?.total_orders ?? 0,
    avgTicket: dto.customer?.avg_ticket ?? 0,
    memberSince: dto.customer?.member_since ?? null,
  };
}

function toChatMessage(dto: MessageDTO): ChatMessage {
  return {
    id: String(dto.id),
    from: dto.from_me ? "loja" : "cliente",
    text: dto.body ?? "",
    time: dto.created_at ?? "",
  };
}

export function useConversations(filters?: ListConversationsRequest) {
  return useQuery({
    queryKey: convKeys.list(filters),
    queryFn:  () => api.get<ListConversationsResponseDTO>(ENDPOINTS.conversations.list, filters as Record<string, string | undefined>),
    select:   (res): ListConversationsResponse => ({ ...res, data: res.data.map(toConversation) }),
    refetchInterval: 15_000,
  });
}

export function useConversation(id: string) {
  return useQuery({
    queryKey: convKeys.detail(id),
    queryFn:  () => api.get<GetConversationResponseDTO>(ENDPOINTS.conversations.detail(id)),
    select:   (res) => ({ ...res, data: toConversation(res.data) }),
    enabled:  !!id,
  });
}

export function useMessages(convId: string, params?: GetMessagesRequest) {
  return useQuery({
    queryKey: convKeys.messages(convId, params),
    queryFn:  () => api.get<GetMessagesResponseDTO>(ENDPOINTS.conversations.messages(convId), params as Record<string, number | undefined>),
    select:   (res): GetMessagesResponse => ({ ...res, data: res.data.map(toChatMessage) }),
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
