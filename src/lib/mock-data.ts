export type OrderStatus = "novo" | "preparo" | "entrega" | "finalizado" | "cancelado";

export interface Order {
  id: string;
  customer: string;
  phone: string;
  items: string[];
  total: number;
  payment: "Pix" | "Cartão" | "Dinheiro";
  paymentStatus: "Aprovado" | "Pendente" | "Estornado";
  time: string;
  notes?: string;
  status: OrderStatus;
}

export const ORDERS: Order[] = [
  { id: "WH-10293", customer: "Ana Clara", phone: "+55 11 99312-1100", items: ["2× Combo Burguer Duplo", "1× Refri 2L"], total: 142.5, payment: "Pix", paymentStatus: "Aprovado", time: "14:31", notes: "Sem cebola", status: "novo" },
  { id: "WH-10292", customer: "Bruno Santos", phone: "+55 11 98122-3344", items: ["1× Pizza Calabresa G"], total: 68, payment: "Cartão", paymentStatus: "Aprovado", time: "14:18", status: "preparo" },
  { id: "WH-10291", customer: "Carla Oliveira", phone: "+55 11 97700-2210", items: ["1× Marmita Fitness", "1× Suco Verde"], total: 39.9, payment: "Pix", paymentStatus: "Aprovado", time: "13:58", status: "entrega" },
  { id: "WH-10290", customer: "Diego Lima", phone: "+55 11 96604-1010", items: ["1× X-Bacon", "1× Batata G"], total: 45.9, payment: "Dinheiro", paymentStatus: "Pendente", time: "13:41", notes: "Troco para R$ 50", status: "novo" },
  { id: "WH-10289", customer: "Eduarda Reis", phone: "+55 11 99988-7766", items: ["3× Esfiha Carne", "1× Coca Lata"], total: 32.4, payment: "Pix", paymentStatus: "Aprovado", time: "13:22", status: "preparo" },
  { id: "WH-10288", customer: "Felipe Costa", phone: "+55 11 91122-3300", items: ["1× Combo Família"], total: 189.9, payment: "Cartão", paymentStatus: "Aprovado", time: "12:55", status: "finalizado" },
  { id: "WH-10287", customer: "Gisele Martins", phone: "+55 11 98800-1144", items: ["1× Salada Caesar"], total: 28, payment: "Pix", paymentStatus: "Aprovado", time: "12:40", status: "finalizado" },
  { id: "WH-10286", customer: "Henrique Alves", phone: "+55 11 97700-5566", items: ["2× Marmita Tradicional"], total: 51.8, payment: "Pix", paymentStatus: "Estornado", time: "12:12", status: "cancelado" },
  { id: "WH-10285", customer: "Isabela Rocha", phone: "+55 11 96655-8899", items: ["1× Pizza Quatro Queijos"], total: 79, payment: "Cartão", paymentStatus: "Aprovado", time: "11:58", status: "entrega" },
];

export const SALES_DATA = [
  { day: "Seg", vendas: 2400, conversas: 32 },
  { day: "Ter", vendas: 1980, conversas: 28 },
  { day: "Qua", vendas: 3200, conversas: 41 },
  { day: "Qui", vendas: 2890, conversas: 38 },
  { day: "Sex", vendas: 4520, conversas: 64 },
  { day: "Sáb", vendas: 5980, conversas: 82 },
  { day: "Dom", vendas: 4829, conversas: 71 },
];

export const TOP_PRODUCTS = [
  { name: "X-Bacon Especial", vendas: 184 },
  { name: "Combo Família", vendas: 142 },
  { name: "Pizza Calabresa G", vendas: 121 },
  { name: "Marmita Fitness", vendas: 98 },
  { name: "Refri 2L", vendas: 86 },
];

export interface Conversation {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: "ativo" | "atendimento" | "finalizado";
  tag?: string;
}

export const CONVERSATIONS: Conversation[] = [
  { id: "c1", name: "Ana Clara", phone: "+55 11 99312-1100", lastMessage: "Vou querer dois combos, obrigada!", time: "14:31", unread: 2, status: "ativo", tag: "Pedido aberto" },
  { id: "c2", name: "Bruno Santos", phone: "+55 11 98122-3344", lastMessage: "Já pode mandar para entrega?", time: "14:22", unread: 0, status: "atendimento", tag: "Aguardando" },
  { id: "c3", name: "Carla Oliveira", phone: "+55 11 97700-2210", lastMessage: "Chegou aqui, super gostoso 😍", time: "14:05", unread: 0, status: "finalizado" },
  { id: "c4", name: "Diego Lima", phone: "+55 11 96604-1010", lastMessage: "Tem opção sem lactose?", time: "13:41", unread: 1, status: "ativo" },
  { id: "c5", name: "Eduarda Reis", phone: "+55 11 99988-7766", lastMessage: "Quanto tempo demora?", time: "13:22", unread: 0, status: "atendimento" },
  { id: "c6", name: "Felipe Costa", phone: "+55 11 91122-3300", lastMessage: "Pago no Pix, qual a chave?", time: "12:55", unread: 0, status: "ativo" },
  { id: "c7", name: "Gisele Martins", phone: "+55 11 98800-1144", lastMessage: "Obrigada!", time: "12:40", unread: 0, status: "finalizado" },
];

export interface ChatMessage {
  id: string;
  from: "cliente" | "loja";
  text: string;
  time: string;
}

export const MESSAGES_BY_CONV: Record<string, ChatMessage[]> = {
  c1: [
    { id: "m1", from: "cliente", text: "Oi, boa tarde! Vocês estão entregando agora?", time: "14:24" },
    { id: "m2", from: "loja", text: "Boa tarde, Ana! Sim, estamos entregando até as 23h 😊", time: "14:25" },
    { id: "m3", from: "cliente", text: "Perfeito! Quero dois combos burguer duplo", time: "14:28" },
    { id: "m4", from: "loja", text: "Anotado! Quer adicionar bebida?", time: "14:29" },
    { id: "m5", from: "cliente", text: "Sim, um refri 2L de cola", time: "14:30" },
    { id: "m6", from: "cliente", text: "Vou querer dois combos, obrigada!", time: "14:31" },
  ],
};

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
  description: string;
}

export const PRODUCTS: Product[] = [
  { id: "p1", name: "X-Bacon Especial", category: "Lanches", price: 32.9, stock: 48, active: true, description: "Hambúrguer 180g, bacon crocante, cheddar, alface e tomate" },
  { id: "p2", name: "Combo Burguer Duplo", category: "Combos", price: 49.9, stock: 32, active: true, description: "Burguer duplo + batata + refri lata" },
  { id: "p3", name: "Pizza Calabresa G", category: "Pizzas", price: 68, stock: 20, active: true, description: "Massa fina, calabresa fatiada e cebola roxa" },
  { id: "p4", name: "Pizza Quatro Queijos", category: "Pizzas", price: 79, stock: 15, active: true, description: "Mussarela, gorgonzola, parmesão e provolone" },
  { id: "p5", name: "Marmita Fitness", category: "Marmitas", price: 28.9, stock: 24, active: true, description: "Frango grelhado, arroz integral, brócolis e batata doce" },
  { id: "p6", name: "Marmita Tradicional", category: "Marmitas", price: 25.9, stock: 0, active: false, description: "Arroz, feijão, bife acebolado e salada" },
  { id: "p7", name: "Refri Lata", category: "Bebidas", price: 6, stock: 120, active: true, description: "350ml — diversos sabores" },
  { id: "p8", name: "Suco Verde", category: "Bebidas", price: 12, stock: 18, active: true, description: "Couve, maçã, limão e gengibre" },
];

export interface FinanceEntry {
  id: string;
  description: string;
  amount: number;
  type: "entrada" | "saida" | "taxa";
  status: "Aprovado" | "Pendente" | "Estornado";
  date: string;
}

export const FINANCE: FinanceEntry[] = [
  { id: "f1", description: "Pedido #WH-10293", amount: 142.5, type: "entrada", status: "Aprovado", date: "Hoje • 14:31" },
  { id: "f2", description: "Taxa Mercado Pago", amount: -5.7, type: "taxa", status: "Aprovado", date: "Hoje • 14:31" },
  { id: "f3", description: "Pedido #WH-10292", amount: 68, type: "entrada", status: "Aprovado", date: "Hoje • 14:18" },
  { id: "f4", description: "Pedido #WH-10291", amount: 39.9, type: "entrada", status: "Aprovado", date: "Hoje • 13:58" },
  { id: "f5", description: "Pedido #WH-10288", amount: 189.9, type: "entrada", status: "Aprovado", date: "Hoje • 12:55" },
  { id: "f6", description: "Estorno Pedido #WH-10286", amount: -51.8, type: "saida", status: "Estornado", date: "Hoje • 12:12" },
];

export const AUTOMATIONS = [
  { id: "a1", title: "Mensagem de boas-vindas", enabled: true, body: "Olá {{nome}}! 👋 Bem-vindo à Central Burguer. Como posso te ajudar?" },
  { id: "a2", title: "Fora do horário", enabled: true, body: "Estamos fechados no momento. Funcionamos das 18h às 23h. Volte logo!" },
  { id: "a3", title: "Pedido confirmado", enabled: true, body: "Pedido #{{pedido}} confirmado! Total: R$ {{valor}}. Preparo: ~30 min." },
  { id: "a4", title: "Saiu para entrega", enabled: true, body: "Seu pedido #{{pedido}} acabou de sair para entrega! 🛵" },
  { id: "a5", title: "Pedido entregue", enabled: false, body: "Pedido entregue! Esperamos que aproveite, {{nome}}. ⭐ Avalie nosso atendimento." },
  { id: "a6", title: "Mensagem de ausência", enabled: false, body: "Estamos com alto volume agora. Em breve um atendente responde 🙏" },
];
