import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, tokenStore } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type {
  ApiResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  RefreshRequest,
  RefreshResponse,
} from "@/api/types";

export const authKeys = {
  me: () => ["auth", "me"] as const,
};

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn:  () => api.get<MeResponse>(ENDPOINTS.auth.me),
    retry:    false,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: LoginRequest) =>
      api.post<ApiResponse<LoginResponse>>(ENDPOINTS.auth.login, body),
    onSuccess: (res) => {
      tokenStore.set(res.data.accessToken);
      tokenStore.setRefresh(res.data.refreshToken);
      tokenStore.setUser(res.data.user);
      qc.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => api.post<void>(ENDPOINTS.auth.logout),
    onSettled: () => {
      tokenStore.clear();
      qc.clear();
      window.location.href = "/login";
    },
  });
}

export function useChangePassword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: ChangePasswordRequest) =>
      api.post<ChangePasswordResponse>(ENDPOINTS.auth.changePassword, body),
    onSuccess: (res) => {
      tokenStore.setUser(res.data);
      qc.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: (body: RefreshRequest) =>
      api.post<ApiResponse<RefreshResponse>>(ENDPOINTS.auth.refresh, body),
    onSuccess: (res) => {
      tokenStore.set(res.data.accessToken);
    },
  });
}
