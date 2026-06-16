import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type { CategoryResponse, CreateCategoryRequest, ListCategoriesResponse } from "@/api/types";

export const categoryKeys = {
  all:  () => ["categories"] as const,
  list: () => ["categories", "list"] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn:  () => api.get<ListCategoriesResponse>(ENDPOINTS.categories.list),
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateCategoryRequest) =>
      api.post<CategoryResponse>(ENDPOINTS.categories.list, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all() }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete<void>(ENDPOINTS.categories.detail(id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all() }),
  });
}
