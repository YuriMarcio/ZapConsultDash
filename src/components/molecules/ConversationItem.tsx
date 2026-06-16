import type { Conversation } from "@/api/types";

export function ConversationItem({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}) {
  const { name, time, lastMessage, unread } = conversation;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-border hover:bg-muted/40 transition-colors ${
        active ? "bg-muted/60 border-l-2 border-l-accent" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center text-[10px] font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold truncate">{name}</span>
            <span className="text-[10px] text-muted-foreground font-mono shrink-0">{time}</span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-0.5">
            <span className="text-[11px] text-muted-foreground truncate">{lastMessage}</span>
            {unread > 0 && (
              <span className="size-4 rounded-full bg-accent text-accent-foreground text-[9px] font-bold flex items-center justify-center shrink-0">
                {unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
