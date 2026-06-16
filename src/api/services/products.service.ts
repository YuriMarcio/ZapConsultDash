import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  CreateProductRequest,
  GetProductResponse,
  ListProductsRequest,
  ListProductsResponse,
  ProductResponse,
  UpdateProductRequest,
} from "@/api/types";

export const productKeys = {
  all:    ()                        => ["products"] as const,
  list:   (f?: ListProductsRequest) => ["products", "list", f] as const,
  detail: (id: string)              => ["products", "detail", id] as const,
};

export function useProducts(filters?: ListProductsRequest) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn:  () => api.get<ListProductsResponse>(ENDPOINTS.products.list, filters as Record<string, string | boolean | undefined>),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn:  () => api.get<GetProductResponse>(ENDPOINTS.products.detail(id)),
    enabled:  !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateProductRequest) =>
      api.post<ProductResponse>(ENDPOINTS.products.list, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all() }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateProductRequest }) =>
      api.put<ProductResponse>(ENDPOINTS.products.detail(id), body),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: productKeys.list() });
      qc.invalidateQueries({ queryKey: productKeys.detail(id) });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(ENDPOINTS.products.detail(id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all() }),
  });
}
