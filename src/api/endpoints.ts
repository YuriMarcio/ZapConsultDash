const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost";
const BASE = `${BASE_URL}/api`;

export const ENDPOINTS = {
  auth: {
    login:   `${BASE}/auth/login`,
    logout:  `${BASE}/auth/logout`,
    refresh: `${BASE}/auth/refresh`,
    me:      `${BASE}/auth/me`,
  },
  orders: {
    list:   `${BASE}/orders`,
    detail: (id: string) => `${BASE}/orders/${id}`,
  },
  conversations: {
    list:     `${BASE}/conversations`,
    detail:   (id: string) => `${BASE}/conversations/${id}`,
    messages: (id: string) => `${BASE}/conversations/${id}/messages`,
    markRead: (id: string) => `${BASE}/conversations/${id}/mark-read`,
  },
  products: {
    list:   `${BASE}/products`,
    detail: (id: string) => `${BASE}/products/${id}`,
  },
  categories: {
    list:   `${BASE}/categories`,
    detail: (id: string) => `${BASE}/categories/${id}`,
  },
  promotions: {
    list:   `${BASE}/promotions`,
    detail: (id: string) => `${BASE}/promotions/${id}`,
    toggle: (id: string) => `${BASE}/promotions/${id}/toggle`,
  },
  finance: {
    entries:  `${BASE}/finance/entries`,
    summary:  `${BASE}/finance/summary`,
    withdraw: `${BASE}/finance/withdraw`,
  },
  analytics: {
    summary:     `${BASE}/analytics/summary`,
    sales:       `${BASE}/analytics/sales`,
    topProducts: `${BASE}/analytics/top-products`,
  },
  channels: {
    whatsapp:   `${BASE}/channels/whatsapp`,
    sync:       `${BASE}/channels/whatsapp/sync`,
    connect:    `${BASE}/channels/whatsapp/connect`,
    disconnect: `${BASE}/channels/whatsapp/disconnect`,
  },
  tenant: {
    profile: `${BASE}/tenant`,
    plan:    `${BASE}/tenant/plan`,
  },
  team: {
    list:   `${BASE}/team`,
    invite: `${BASE}/team/invite`,
  },
  integrations: {
    list:       `${BASE}/integrations`,
    connect:    (key: string) => `${BASE}/integrations/${key}/connect`,
    disconnect: (key: string) => `${BASE}/integrations/${key}/disconnect`,
  },
} as const;
