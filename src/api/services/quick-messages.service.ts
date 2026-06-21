import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  CreateQuickMessageRequest,
  ListQuickMessagesResponse,
  QuickMessageResponse,
  UpdateQuickMessageRequest,
} from "@/api/types";

export const quickMessageKeys = {
  all: () => ["quick-messages"] as const,
};

export function useQuickMessages() {
  return useQuery({
    queryKey: quickMessageKeys.all(),
    queryFn:  () => api.get<ListQuickMessagesResponse>(ENDPOINTS.quickMessages.list),
  });
}

export function useCreateQuickMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateQuickMessageRequest) =>
      api.post<QuickMessageResponse>(ENDPOINTS.quickMessages.create, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: quickMessageKeys.all() }),
  });
}

export function useUpdateQuickMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateQuickMessageRequest }) =>
      api.put<QuickMessageResponse>(ENDPOINTS.quickMessages.update(id), body),
    onSuccess: () => qc.invalidateQueries({ queryKey: quickMessageKeys.all() }),
  });
}

export function useDeleteQuickMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete<void>(ENDPOINTS.quickMessages.delete(id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: quickMessageKeys.all() }),
  });
}
