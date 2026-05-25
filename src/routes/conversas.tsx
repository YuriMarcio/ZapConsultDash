import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatusPill } from "@/components/ui/StatusPill";
import { CONVERSATIONS, MESSAGES_BY_CONV, type ChatMessage } from "@/lib/mock-data";
import { Search, Paperclip, Mic, Send, Image as ImageIcon, FileText, Tag, User, CheckCheck } from "lucide-react";

export const Route = createFileRoute("/conversas")({
  head: () => ({ meta: [{ title: "Conversas — Sinal" }] }),
  component: ConversasPage,
});

function ConversasPage() {
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const active = CONVERSATIONS.find((c) => c.id === activeId)!;
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(
    MESSAGES_BY_CONV[activeId] || [],
  );

  const switchConv = (id: string) => {
    setActiveId(id);
    setMessages(MESSAGES_BY_CONV[id] || []);
  };

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { id: String(Date.now()), from: "loja", text: draft, time: "agora" },
    ]);
    setDraft("");
  };

  return (
    <AppLayout title="Conversas">
      <div className="grid grid-cols-12 gap-0 bg-card border border-border rounded-xl ring-1 ring-black/5 overflow-hidden animate-entrance" style={{ height: "calc(100vh - 9rem)" }}>
        {/* Lista */}
        <div className="col-span-4 lg:col-span-3 border-r border-border flex flex-col min-h-0">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded border border-border">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                placeholder="Buscar conversas..."
                className="bg-transparent text-xs flex-1 outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => switchConv(c.id)}
                className={`w-full text-left px-4 py-3 border-b border-border hover:bg-muted/40 transition-colors ${activeId === c.id ? "bg-muted/60 border-l-2 border-l-accent" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold truncate">{c.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono shrink-0">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-[11px] text-muted-foreground truncate">{c.lastMessage}</span>
                      {c.unread > 0 && (
                        <span className="size-4 rounded-full bg-accent text-accent-foreground text-[9px] font-bold flex items-center justify-center shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="col-span-8 lg:col-span-6 flex flex-col min-h-0">
          <div className="px-6 py-3.5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center text-[10px] font-bold">
                {active.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-semibold flex items-center gap-2">
                  {active.name}
                  <StatusPill tone="success" dot>
                    Online
                  </StatusPill>
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">{active.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-border rounded hover:bg-muted">
                Atend. humano
              </button>
              <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90">
                Finalizar
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-muted/20">
            {messages.length === 0 && (
              <div className="text-center text-xs text-muted-foreground mt-8">
                Nenhuma mensagem ainda. Comece a conversa.
              </div>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === "loja" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${m.from === "loja"
                    ? "bg-accent text-accent-foreground rounded-br-sm"
                    : "bg-card border border-border rounded-bl-sm"}`}
                >
                  <p>{m.text}</p>
                  <div className={`text-[10px] mt-1 flex items-center gap-1 ${m.from === "loja" ? "text-accent-foreground/70 justify-end" : "text-muted-foreground"}`}>
                    {m.time}
                    {m.from === "loja" && <CheckCheck className="size-3" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3 bg-card">
            <div className="flex items-end gap-2">
              <div className="flex gap-1">
                {[Paperclip, ImageIcon, FileText, Mic].map((Icon, i) => (
                  <button key={i} className="size-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground">
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Digite uma mensagem..."
                rows={1}
                className="flex-1 resize-none bg-muted border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <button
                onClick={send}
                className="size-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90"
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Detalhes cliente */}
        <div className="hidden lg:flex col-span-3 border-l border-border flex-col min-h-0">
          <div className="p-5 border-b border-border">
            <div className="flex flex-col items-center text-center">
              <div className="size-16 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center text-sm font-bold mb-3">
                {active.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <p className="text-sm font-semibold">{active.name}</p>
              <p className="text-[11px] text-muted-foreground font-mono mt-1">{active.phone}</p>
            </div>
          </div>
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                <Tag className="size-3" /> Etiquetas
              </div>
              <div className="flex flex-wrap gap-1.5">
                <StatusPill tone="success">VIP</StatusPill>
                <StatusPill tone="info">Pedido aberto</StatusPill>
                <StatusPill tone="muted">Bairro Jardins</StatusPill>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                <User className="size-3" /> Histórico
              </div>
              <div className="text-xs space-y-2">
                <div className="flex justify-between"><span className="text-muted-foreground">Pedidos totais</span><span className="font-mono font-semibold">12</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Ticket médio</span><span className="font-mono font-semibold">R$ 87,40</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Cliente desde</span><span className="font-mono">jan/2024</span></div>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Mensagens rápidas
              </div>
              <div className="space-y-1.5">
                {["Pedido confirmado ✅", "Saiu para entrega 🛵", "Qual seu endereço?"].map((m) => (
                  <button key={m} className="w-full text-left text-xs px-3 py-2 bg-muted hover:bg-muted/60 rounded border border-border">
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
