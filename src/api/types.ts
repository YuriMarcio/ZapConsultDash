// ─── Envelopes padrão ────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string | number;
  name: string;
  email: string;
  role: "owner" | "manager" | "attendant";
  plan?: string;
  tenant_id?: string;
  restaurantId?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export type MeResponse = ApiResponse<AuthUser>;

// ─── Orders (Pedidos) ─────────────────────────────────────────────────────────

export type OrderStatus = "novo" | "preparo" | "entrega" | "finalizado" | "cancelado";
export type OrderSource = "whatsapp" | "ifood" | "rappi" | "ubereats" | "99food" | "cardapio";
export type PaymentMethod = "Pix" | "Cartão" | "Dinheiro";
export type PaymentStatus = "Aprovado" | "Pendente" | "Estornado";

export interface Order {
  id: string;
  customer: string;
  phone: string;
  items: string[];
  total: number;
  payment: PaymentMethod;
  paymentStatus: PaymentStatus;
  time: string;
  notes?: string;
  status: OrderStatus;
  source: OrderSource;
}

export interface ListOrdersRequest {
  status?: OrderStatus;
  source?: OrderSource;
  search?: string;
  page?: number;
  limit?: number;
}

export type ListOrdersResponse = PaginatedResponse<Order>;
export type GetOrderResponse = ApiResponse<Order>;

export interface UpdateOrderRequest {
  status?: OrderStatus;
  notes?: string;
}

export type UpdateOrderResponse = ApiResponse<Order>;

// ─── Conversations (Conversas) ────────────────────────────────────────────────

export type ConvStatus = "ativo" | "atendimento" | "finalizado";

export interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: ConvStatus;
  tag?: string;
}

export interface ChatMessage {
  id: string;
  from: "cliente" | "loja";
  text: string;
  time: string;
}

export interface ListConversationsRequest {
  status?: ConvStatus;
  search?: string;
}

export type ListConversationsResponse = ApiResponse<Conversation[]>;
export type GetConversationResponse = ApiResponse<Conversation>;

export interface GetMessagesRequest {
  page?: number;
  limit?: number;
}

export type GetMessagesResponse = PaginatedResponse<ChatMessage>;

export interface SendMessageRequest {
  text: string;
}

export type SendMessageResponse = ApiResponse<ChatMessage>;

export interface UpdateConversationRequest {
  status?: ConvStatus;
  tag?: string;
}

export type UpdateConversationResponse = ApiResponse<Conversation>;

// ─── Products & Categories ───────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  image?: string;
  color?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
  description: string;
}

export interface ListProductsRequest {
  category?: string;
  active?: boolean;
  search?: string;
}

export type ListProductsResponse = ApiResponse<Product[]>;
export type GetProductResponse = ApiResponse<Product>;

export interface CreateProductRequest {
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
  description: string;
}

export type UpdateProductRequest = Partial<CreateProductRequest>;
export type ProductResponse = ApiResponse<Product>;

export type ListCategoriesResponse = ApiResponse<Category[]>;

export interface CreateCategoryRequest {
  name: string;
  image?: string;
  color?: string;
}

export type CategoryResponse = ApiResponse<Category>;

// ─── Promotions ───────────────────────────────────────────────────────────────

export type PromotionType = "percent" | "fixed" | "combo";

export interface Promotion {
  id: string;
  name: string;
  productId: string;
  productName: string;
  type: PromotionType;
  discount: number;
  originalPrice: number;
  promoPrice: number;
  startDate: string;
  endDate: string;
  active: boolean;
  description?: string;
}

export type ListPromotionsResponse = ApiResponse<Promotion[]>;

export interface CreatePromotionRequest {
  name: string;
  productId: string;
  type: PromotionType;
  discount: number;
  startDate: string;
  endDate: string;
  active: boolean;
  description?: string;
}

export type UpdatePromotionRequest = Partial<CreatePromotionRequest>;
export type PromotionResponse = ApiResponse<Promotion>;

// ─── Finance ──────────────────────────────────────────────────────────────────

export type EntryType = "entrada" | "saida" | "taxa";
export type EntryStatus = "Aprovado" | "Pendente" | "Estornado";

export interface FinanceEntry {
  id: string;
  description: string;
  amount: number;
  type: EntryType;
  status: EntryStatus;
  date: string;
}

export interface FinanceSummary {
  balance: number;
  toReceive: number;
  monthlyRevenue: number;
  monthlyFees: number;
}

export interface ListEntriesRequest {
  status?: EntryStatus;
  type?: EntryType;
  from?: string;
  to?: string;
}

export type ListEntriesResponse = ApiResponse<FinanceEntry[]>;
export type FinanceSummaryResponse = ApiResponse<FinanceSummary>;

export interface WithdrawRequest {
  amount: number;
  pixKey: string;
}

export type WithdrawResponse = ApiResponse<{ transactionId: string }>;

// ─── Analytics (Dashboard KPIs) ──────────────────────────────────────────────

export interface DashboardSummary {
  salesToday: number;
  avgTicket: number;
  activeOrders: number;
  responseTimeMin: number;
  activeConversations: number;
  conversionRate: number;
  completedOrders: number;
  cancelledOrders: number;
}

export interface SalesDataPoint {
  day: string;
  vendas: number;
  conversas: number;
}

export interface TopProduct {
  name: string;
  vendas: number;
}

export type DashboardSummaryResponse = ApiResponse<DashboardSummary>;

export interface SalesChartRequest {
  period: "day" | "week" | "month";
}

export type SalesChartResponse = ApiResponse<SalesDataPoint[]>;

export interface TopProductsRequest {
  limit?: number;
  period?: "week" | "month";
}

export type TopProductsResponse = ApiResponse<TopProduct[]>;

// ─── Channels (WhatsApp) ──────────────────────────────────────────────────────

export type ChannelStatus = "connected" | "disconnected" | "awaiting_scan" | "sincronizando";

export interface WhatsappChannel {
  phone: string;
  device: string;
  location: string;
  status: ChannelStatus;
  messages: number;
  lastSync: string;
  latencyMs: number;
}

export type ChannelStatusResponse = ApiResponse<WhatsappChannel>;
export type SyncChannelResponse = ApiResponse<{ synced: boolean; latencyMs: number }>;

export interface WhatsappConnectResult {
  status: "awaiting_scan";
  qr_code: string;
  instance: string;
}
export type WhatsappConnectResponse = ApiResponse<WhatsappConnectResult>;

// ─── Tenant (Loja) ───────────────────────────────────────────────────────────

export interface TenantProfile {
  id: string;
  name: string;
  cnpj?: string;
  phone?: string;
  email?: string;
  address?: string;
  openTime?: string;
  closeTime?: string;
  deliveryFee?: number;
  deliveryRadius?: number;
  logoUrl?: string;
}
export type TenantProfileResponse = ApiResponse<TenantProfile>;
export type UpdateTenantRequest   = Partial<Omit<TenantProfile, "id">>;

export interface TenantPlan {
  name: string;
  nextBillingDate?: string;
  features: string[];
}
export type TenantPlanResponse = ApiResponse<TenantPlan>;

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "manager" | "attendant";
}
export type ListTeamResponse    = ApiResponse<TeamMember[]>;
export interface InviteMemberRequest { email: string; role: "manager" | "attendant" }
export type InviteMemberResponse = ApiResponse<TeamMember>;

// ─── Integrations ─────────────────────────────────────────────────────────────

export type IntegrationKey = "ifood" | "rappi" | "ubereats" | "99food" | "cardapio";
export interface Integration {
  key: IntegrationKey;
  connected: boolean;
  merchantId?: string;
}
export type ListIntegrationsResponse    = ApiResponse<Integration[]>;
export interface ConnectIntegrationRequest { merchantId: string; token?: string }
export type IntegrationResponse          = ApiResponse<Integration>;
