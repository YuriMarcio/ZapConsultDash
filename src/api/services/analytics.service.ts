import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  DashboardSummaryResponse,
  SalesChartRequest,
  SalesChartResponse,
  TopProductsRequest,
  TopProductsResponse,
} from "@/api/types";

export const analyticsKeys = {
  all:         () => ["analytics"] as const,
  summary:     () => ["analytics", "summary"] as const,
  sales:       (p: SalesChartRequest)    => ["analytics", "sales",       p] as const,
  topProducts: (p?: TopProductsRequest)  => ["analytics", "topProducts", p] as const,
};

export function useDashboardSummary() {
  return useQuery({
    queryKey: analyticsKeys.summary(),
    queryFn:  () => api.get<DashboardSummaryResponse>(ENDPOINTS.analytics.summary),
    refetchInterval: 60_000,
  });
}

export function useSalesChart(params: SalesChartRequest) {
  return useQuery({
    queryKey: analyticsKeys.sales(params),
    queryFn:  () => api.get<SalesChartResponse>(ENDPOINTS.analytics.sales, params as Record<string, string>),
  });
}

export function useTopProducts(params?: TopProductsRequest) {
  return useQuery({
    queryKey: analyticsKeys.topProducts(params),
    queryFn:  () => api.get<TopProductsResponse>(ENDPOINTS.analytics.topProducts, params as Record<string, string | number | undefined>),
  });
}
