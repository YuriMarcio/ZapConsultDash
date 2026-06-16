import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  FinanceSummaryResponse,
  ListEntriesRequest,
  ListEntriesResponse,
  WithdrawRequest,
  WithdrawResponse,
} from "@/api/types";

export const financeKeys = {
  all:     () => ["finance"] as const,
  entries: (f?: ListEntriesRequest) => ["finance", "entries", f] as const,
  summary: () => ["finance", "summary"] as const,
};

export function useFinanceEntries(filters?: ListEntriesRequest) {
  return useQuery({
    queryKey: financeKeys.entries(filters),
    queryFn:  () => api.get<ListEntriesResponse>(ENDPOINTS.finance.entries, filters as Record<string, string | undefined>),
  });
}

export function useFinanceSummary() {
  return useQuery({
    queryKey: financeKeys.summary(),
    queryFn:  () => api.get<FinanceSummaryResponse>(ENDPOINTS.finance.summary),
  });
}

export function useWithdraw() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: WithdrawRequest) =>
      api.post<WithdrawResponse>(ENDPOINTS.finance.withdraw, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: financeKeys.all() }),
  });
}
