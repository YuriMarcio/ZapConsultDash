import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  CreatePlanRequest,
  ListPlansResponse,
  PlanResponse,
  UpdatePlanRequest,
} from "@/api/types";

export const adminPlanKeys = {
  all: () => ["admin", "plans"] as const,
};

export function useAdminPlans() {
  return useQuery({
    queryKey: adminPlanKeys.all(),
    queryFn:  () => api.get<ListPlansResponse>(ENDPOINTS.admin.plans.list),
  });
}

export function useCreatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreatePlanRequest) =>
      api.post<PlanResponse>(ENDPOINTS.admin.plans.create, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminPlanKeys.all() }),
  });
}

export function useUpdatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdatePlanRequest }) =>
      api.patch<PlanResponse>(ENDPOINTS.admin.plans.update(id), body),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminPlanKeys.all() }),
  });
}

export function useDeletePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete<void>(ENDPOINTS.admin.plans.delete(id)),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminPlanKeys.all() }),
  });
}
