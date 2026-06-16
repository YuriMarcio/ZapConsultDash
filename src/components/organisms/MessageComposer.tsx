import { Paperclip, Mic, Send, Image as ImageIcon, FileText } from "lucide-react";

export function MessageComposer({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="border-t border-border p-3 bg-card">
      <div className="flex items-end gap-2">
        <div className="flex gap-1">
          {[Paperclip, ImageIcon, FileText, Mic].map((Icon, i) => (
            <button
              key={i}
              className="size-9 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Digite uma mensagem..."
          rows={1}
          className="flex-1 resize-none bg-muted border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          onClick={onSend}
          className="size-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}
