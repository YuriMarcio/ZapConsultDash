import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  GetOrderResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "@/api/types";

export const orderKeys = {
  all:    ()                      => ["orders"] as const,
  list:   (f?: ListOrdersRequest) => ["orders", "list",   f] as const,
  detail: (id: string)            => ["orders", "detail", id] as const,
};

export function useOrders(filters?: ListOrdersRequest) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn:  () => api.get<ListOrdersResponse>(ENDPOINTS.orders.list, filters as Record<string, string | number | boolean | undefined>),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn:  () => api.get<GetOrderResponse>(ENDPOINTS.orders.detail(id)),
    enabled:  !!id,
  });
}

export function useUpdateOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateOrderRequest }) =>
      api.patch<UpdateOrderResponse>(ENDPOINTS.orders.detail(id), body),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: orderKeys.list() });
      qc.invalidateQueries({ queryKey: orderKeys.detail(id) });
    },
  });
}
