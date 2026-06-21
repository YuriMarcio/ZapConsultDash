import { useState } from "react";
import { AvatarInitials } from "@/components/atoms/AvatarInitials";
import { StatusPill } from "@/components/atoms/StatusPill";
import { Tag, User, X, Plus, MessageSquareText, Trash2 } from "lucide-react";
import type { Conversation } from "@/api/types";
import { useUpdateConversation } from "@/api/services/conversations.service";
import {
  useCreateQuickMessage,
  useDeleteQuickMessage,
  useQuickMessages,
} from "@/api/services/quick-messages.service";

function fmtCurrency(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function CustomerSidePanel({
  conversation,
  onInsertQuickReply,
}: {
  conversation: Conversation;
  onInsertQuickReply: (text: string) => void;
}) {
  const updateConversation = useUpdateConversation();
  const [tagInput, setTagInput] = useState("");

  function saveTags(tags: string[]) {
    updateConversation.mutate({ id: conversation.id, body: { tag: tags.join(",") } });
  }

  function addTag() {
    const value = tagInput.trim();
    if (!value || conversation.tags.includes(value)) {
      setTagInput("");
      return;
    }
    saveTags([...conversation.tags, value]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    saveTags(conversation.tags.filter((t) => t !== tag));
  }

  const { data: quickData } = useQuickMessages();
  const quickMessages = quickData?.data ?? [];
  const createQuick = useCreateQuickMessage();
  const deleteQuick = useDeleteQuickMessage();

  const [showAddQuick, setShowAddQuick] = useState(false);
  const [newQuickTitle, setNewQuickTitle] = useState("");
  const [newQuickBody, setNewQuickBody] = useState("");

  function addQuickMessage() {
    if (!newQuickTitle.trim() || !newQuickBody.trim()) return;
    createQuick.mutate(
      { title: newQuickTitle.trim(), body: newQuickBody.trim() },
      { onSuccess: () => { setNewQuickTitle(""); setNewQuickBody(""); setShowAddQuick(false); } },
    );
  }

  return (
    <div className="hidden lg:flex col-span-3 border-l border-border flex-col min-h-0">
      <div className="p-5 border-b border-border">
        <div className="flex flex-col items-center text-center">
          <AvatarInitials name={conversation.name} size="lg" />
          <p className="text-sm font-semibold mt-3">{conversation.name}</p>
          <p className="text-[11px] text-muted-foreground font-mono mt-1">{conversation.phone}</p>
        </div>
      </div>
      <div className="p-5 space-y-4 overflow-y-auto flex-1">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
            <Tag className="size-3" /> Etiquetas
          </div>
          <div className="flex flex-wrap gap-1.5">
            {conversation.tags.map((tag) => (
              <StatusPill key={tag} tone="info">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:opacity-70">
                  <X className="size-2.5" />
                </button>
              </StatusPill>
            ))}
            {conversation.tags.length === 0 && (
              <span className="text-[11px] text-muted-foreground">Nenhuma etiqueta</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTag()}
              placeholder="Nova etiqueta..."
              className="flex-1 bg-muted border border-border rounded px-2 py-1.5 text-xs outline-none focus:border-accent"
            />
            <button
              onClick={addTag}
              className="size-7 rounded bg-muted hover:bg-muted/60 flex items-center justify-center border border-border shrink-0"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
            <User className="size-3" /> Histórico
          </div>
          <div className="text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pedidos totais</span>
              <span className="font-mono font-semibold">{conversation.totalOrders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ticket médio</span>
              <span className="font-mono font-semibold">
                {conversation.totalOrders > 0 ? fmtCurrency(conversation.avgTicket) : "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cliente desde</span>
              <span className="font-mono">{conversation.memberSince ?? "—"}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MessageSquareText className="size-3" /> Mensagens rápidas
            </span>
            <button onClick={() => setShowAddQuick((v) => !v)} className="hover:text-foreground">
              <Plus className="size-3.5" />
            </button>
          </div>
          <div className="space-y-1.5">
            {quickMessages.map((qm) => (
              <div key={qm.id} className="group flex items-center gap-1">
                <button
                  onClick={() => onInsertQuickReply(qm.body)}
                  className="flex-1 text-left text-xs px-3 py-2 bg-muted hover:bg-muted/60 rounded border border-border truncate"
                  title={qm.body}
                >
                  {qm.title}
                </button>
                <button
                  onClick={() => deleteQuick.mutate(qm.id)}
                  className="size-7 rounded hover:bg-muted/60 flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 shrink-0"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
            {quickMessages.length === 0 && !showAddQuick && (
              <span className="text-[11px] text-muted-foreground">Nenhuma mensagem cadastrada</span>
            )}
            {showAddQuick && (
              <div className="space-y-1.5 pt-1">
                <input
                  value={newQuickTitle}
                  onChange={(e) => setNewQuickTitle(e.target.value)}
                  placeholder="Título (ex: Pedido confirmado)"
                  className="w-full bg-muted border border-border rounded px-2 py-1.5 text-xs outline-none focus:border-accent"
                />
                <textarea
                  value={newQuickBody}
                  onChange={(e) => setNewQuickBody(e.target.value)}
                  placeholder="Mensagem completa..."
                  rows={2}
                  className="w-full bg-muted border border-border rounded px-2 py-1.5 text-xs outline-none focus:border-accent resize-none"
                />
                <button
                  onClick={addQuickMessage}
                  disabled={createQuick.isPending}
                  className="w-full text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-60"
                >
                  Salvar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
