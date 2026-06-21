import { useState } from "react";
import { AppLayout } from "@/components/templates/AppLayout";
import { StatusPill } from "@/components/atoms/StatusPill";
import { AvatarInitials } from "@/components/atoms/AvatarInitials";
import { ConversationList } from "@/components/organisms/ConversationList";
import { MessageThread } from "@/components/organisms/MessageThread";
import { MessageComposer } from "@/components/organisms/MessageComposer";
import { CustomerSidePanel } from "@/components/organisms/CustomerSidePanel";
import { useConversations, useMessages, useSendMessage, useUpdateConversation } from "@/api/services/conversations.service";
import { MessageSquare } from "lucide-react";

function SkeletonLine({ w = "w-full", h = "h-3" }: { w?: string; h?: string }) {
  return <div className={`${w} ${h} bg-muted rounded animate-pulse`} />;
}

function ConversationListSkeleton() {
  return (
    <div className="col-span-3 border-r border-border flex flex-col min-h-0">
      <div className="p-3 border-b border-border">
        <SkeletonLine h="h-8" />
      </div>
      <div className="flex-1 overflow-hidden divide-y divide-border">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3.5">
            <div className="size-9 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex justify-between items-center">
                <SkeletonLine w="w-24" h="h-3" />
                <SkeletonLine w="w-10" h="h-2.5" />
              </div>
              <SkeletonLine w="w-40" h="h-2.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessageThreadSkeleton() {
  const items = [
    { from: "cliente", w: "w-56" },
    { from: "loja",    w: "w-72" },
    { from: "cliente", w: "w-40" },
    { from: "loja",    w: "w-64" },
    { from: "cliente", w: "w-48" },
    { from: "loja",    w: "w-52" },
  ] as const;

  return (
    <div className="flex-1 overflow-hidden px-6 py-4 space-y-3">
      {items.map((item, i) => (
        <div key={i} className={`flex ${item.from === "loja" ? "justify-end" : "justify-start"}`}>
          <div className={`${item.w} h-10 rounded-2xl bg-muted animate-pulse`}
            style={{ animationDelay: `${i * 60}ms` }} />
        </div>
      ))}
    </div>
  );
}

export function ConversasPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const { data: convsData, isLoading: convsLoading } = useConversations();
  const conversations = convsData?.data ?? [];

  const currentId = activeId ?? conversations[0]?.id ?? "";
  const active = conversations.find((c) => c.id === currentId) ?? conversations[0];

  const { data: msgsData, isLoading: msgsLoading } = useMessages(currentId);
  const messages = msgsData?.data ?? [];

  const sendMessage = useSendMessage(currentId);
  const updateConversation = useUpdateConversation();

  const send = () => {
    if (!draft.trim()) return;
    sendMessage.mutate({ text: draft });
    setDraft("");
  };

  const finalize = () => {
    if (!active) return;
    updateConversation.mutate({ id: active.id, body: { status: "finalizado" } });
  };

  return (
    <AppLayout title="Conversas">
      <div
        className="grid grid-cols-12 gap-0 bg-card border border-border rounded-xl ring-1 ring-black/5 overflow-hidden animate-entrance"
        style={{ height: "calc(100vh - 9rem)" }}
      >
        {convsLoading ? (
          <>
            <ConversationListSkeleton />
            <div className="col-span-9 flex flex-col min-h-0">
              <div className="px-6 py-3.5 border-b border-border flex items-center gap-3">
                <div className="size-8 rounded-full bg-muted animate-pulse shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <SkeletonLine w="w-32" h="h-3" />
                  <SkeletonLine w="w-24" h="h-2.5" />
                </div>
              </div>
              <MessageThreadSkeleton />
              <div className="border-t border-border px-4 py-3">
                <SkeletonLine h="h-10" />
              </div>
            </div>
          </>
        ) : (
          <>
            <ConversationList
              conversations={conversations}
              activeId={currentId}
              onSelect={setActiveId}
            />

            {!active ? (
              <div className="col-span-9 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                <MessageSquare className="size-10 opacity-20" />
                <p className="text-sm">Selecione uma conversa</p>
              </div>
            ) : (
              <>
                <div className="col-span-8 lg:col-span-6 flex flex-col min-h-0">
                  <div className="px-6 py-3.5 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AvatarInitials name={active.name} size="sm" />
                      <div>
                        <div className="text-sm font-semibold flex items-center gap-2">
                          {active.name}
                          <StatusPill tone="success" dot>Online</StatusPill>
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono">{active.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-border rounded hover:bg-muted">
                        Atend. humano
                      </button>
                      <button
                        onClick={finalize}
                        className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded hover:opacity-90"
                      >
                        Finalizar
                      </button>
                    </div>
                  </div>

                  {msgsLoading ? <MessageThreadSkeleton /> : <MessageThread messages={messages} />}

                  <MessageComposer value={draft} onChange={setDraft} onSend={send} />
                </div>

                <CustomerSidePanel conversation={active} onInsertQuickReply={setDraft} />
              </>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
