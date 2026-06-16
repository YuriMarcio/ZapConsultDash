import { CheckCheck } from "lucide-react";
import type { ChatMessage } from "@/api/types";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isOutgoing = message.from === "loja";

  return (
    <div className={`flex ${isOutgoing ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
          isOutgoing
            ? "bg-accent text-accent-foreground rounded-br-sm"
            : "bg-card border border-border rounded-bl-sm"
        }`}
      >
        <p>{message.text}</p>
        <div
          className={`text-[10px] mt-1 flex items-center gap-1 ${
            isOutgoing ? "text-accent-foreground/70 justify-end" : "text-muted-foreground"
          }`}
        >
          {message.time}
          {isOutgoing && <CheckCheck className="size-3" />}
        </div>
      </div>
    </div>
  );
}
