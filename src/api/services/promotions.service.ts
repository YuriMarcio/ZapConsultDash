import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  CreatePromotionRequest,
  ListPromotionsResponse,
  PromotionResponse,
  UpdatePromotionRequest,
} from "@/api/types";

export const promotionKeys = {
  all:  () => ["promotions"] as const,
  list: () => ["promotions", "list"] as const,
};

export function usePromotions() {
  return useQuery({
    queryKey: promotionKeys.list(),
    queryFn:  () => api.get<ListPromotionsResponse>(ENDPOINTS.promotions.list),
  });
}

export function useCreatePromotion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreatePromotionRequest) =>
      api.post<PromotionResponse>(ENDPOINTS.promotions.list, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: promotionKeys.all() }),
  });
}

export function useUpdatePromotion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdatePromotionRequest }) =>
      api.put<PromotionResponse>(ENDPOINTS.promotions.detail(id), body),
    onSuccess: () => qc.invalidateQueries({ queryKey: promotionKeys.all() }),
  });
}

export function useTogglePromotion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      api.patch<PromotionResponse>(ENDPOINTS.promotions.toggle(id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: promotionKeys.all() }),
  });
}

export function useDeletePromotion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(ENDPOINTS.promotions.detail(id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: promotionKeys.all() }),
  });
}
