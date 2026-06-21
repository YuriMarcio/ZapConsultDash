const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost";
const BASE = `${BASE_URL}/api`;

export const ENDPOINTS = {
  auth: {
    login:          `${BASE}/auth/login`,
    logout:         `${BASE}/auth/logout`,
    refresh:        `${BASE}/auth/refresh`,
    me:             `${BASE}/auth/me`,
    changePassword: `${BASE}/auth/change-password`,
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
  quickMessages: {
    list:   `${BASE}/quick-messages`,
    create: `${BASE}/quick-messages`,
    update: (id: number) => `${BASE}/quick-messages/${id}`,
    delete: (id: number) => `${BASE}/quick-messages/${id}`,
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
  admin: {
    dashboard: `${BASE}/admin/dashboard`,
    clients: {
      list:   `${BASE}/admin/clients`,
      create: `${BASE}/admin/clients`,
      detail: (id: string) => `${BASE}/admin/clients/${id}`,
      status: (id: string) => `${BASE}/admin/clients/${id}/status`,
      delete: (id: string) => `${BASE}/admin/clients/${id}`,
    },
    plans: {
      list:   `${BASE}/admin/plans`,
      create: `${BASE}/admin/plans`,
      update: (id: number | string) => `${BASE}/admin/plans/${id}`,
      delete: (id: number | string) => `${BASE}/admin/plans/${id}`,
    },
    settings: {
      get:    `${BASE}/admin/settings`,
      update: `${BASE}/admin/settings`,
    },
    instances: {
      list:       `${BASE}/admin/instances`,
      reconnect:  (id: string | number) => `${BASE}/admin/instances/${id}/reconnect`,
      disconnect: (id: string | number) => `${BASE}/admin/instances/${id}/disconnect`,
    },
  },
} as const;
