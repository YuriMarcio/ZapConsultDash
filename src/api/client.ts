import type { ApiError } from "./types";
import { ENDPOINTS } from "./endpoints";

const TOKEN_KEY = "access_token";
const REFRESH_KEY = "refresh_token";
const isBrowser = typeof window !== "undefined";

export const tokenStore = {
  get:         ()           => isBrowser ? localStorage.getItem(TOKEN_KEY)    : null,
  set:         (t: string)  => { if (isBrowser) localStorage.setItem(TOKEN_KEY, t); },
  getRefresh:  ()           => isBrowser ? localStorage.getItem(REFRESH_KEY)  : null,
  setRefresh:  (t: string)  => { if (isBrowser) localStorage.setItem(REFRESH_KEY, t); },
  clear:       ()           => { if (isBrowser) { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(REFRESH_KEY); } },
};

let refreshing: Promise<string> | null = null;

async function tryRefresh(): Promise<string> {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    const rt = tokenStore.getRefresh();
    if (!rt) throw new Error("no_refresh_token");
    const res = await fetch(ENDPOINTS.auth.refresh, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: rt }),
    });
    if (!res.ok) { tokenStore.clear(); throw new Error("refresh_failed"); }
    const json = await res.json() as { data?: { accessToken: string }; accessToken?: string };
    const accessToken = json.data?.accessToken ?? json.accessToken ?? "";
    tokenStore.set(accessToken);
    return accessToken;
  })().finally(() => { refreshing = null; });
  return refreshing;
}

async function apiFetch<T>(url: string, options: RequestInit = {}, retry = true): Promise<T> {
  const token = tokenStore.get();
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 && retry) {
    try {
      const newToken = await tryRefresh();
      return apiFetch<T>(url, {
        ...options,
        headers: { ...options.headers, Authorization: `Bearer ${newToken}` },
      }, false);
    } catch {
      tokenStore.clear();
      window.location.href = "/login";
      throw { code: "401", message: "Sessão expirada" } as ApiError;
    }
  }

  if (!res.ok) {
    const error: ApiError = await res.json().catch(() => ({
      code: String(res.status),
      message: res.statusText,
    }));
    throw error;
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

type QueryParams = Record<string, string | number | boolean | undefined>;

function buildQs(params?: QueryParams): string {
  if (!params) return "";
  const clean = Object.fromEntries(
    Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)]),
  );
  return Object.keys(clean).length ? `?${new URLSearchParams(clean)}` : "";
}

export const api = {
  get:    <T>(url: string, params?: QueryParams)  => apiFetch<T>(`${url}${buildQs(params)}`),
  post:   <T>(url: string, body?: unknown)        => apiFetch<T>(url, { method: "POST",   body: JSON.stringify(body) }),
  put:    <T>(url: string, body?: unknown)        => apiFetch<T>(url, { method: "PUT",    body: JSON.stringify(body) }),
  patch:  <T>(url: string, body?: unknown)        => apiFetch<T>(url, { method: "PATCH",  body: JSON.stringify(body) }),
  delete: <T>(url: string)                        => apiFetch<T>(url, { method: "DELETE" }),
};
