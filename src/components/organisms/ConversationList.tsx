import { Search } from "lucide-react";
import { ConversationItem } from "@/components/molecules/ConversationItem";
import type { Conversation } from "@/api/types";

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
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
        {conversations.map((c) => (
          <ConversationItem
            key={c.id}
            conversation={c}
            active={activeId === c.id}
            onClick={() => onSelect(c.id)}
          />
        ))}
      </div>
    </div>
  );
}
