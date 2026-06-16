import { MessageBubble } from "@/components/molecules/MessageBubble";
import type { ChatMessage } from "@/api/types";

export function MessageThread({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-muted/20">
      {messages.length === 0 && (
        <div className="text-center text-xs text-muted-foreground mt-8">
          Nenhuma mensagem ainda. Comece a conversa.
        </div>
      )}
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
    </div>
  );
}
