import { Zap } from "lucide-react";

type Automation = {
  id: string;
  title: string;
  enabled: boolean;
  body: string;
};

export function TemplateCard({
  automation,
  selected,
  onSelect,
  onToggle,
}: {
  automation: Automation;
  selected: boolean;
  onSelect: () => void;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border transition-all ${
        selected
          ? "bg-card border-accent ring-1 ring-accent/30"
          : "bg-card border-border hover:border-muted-foreground/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`size-8 rounded flex items-center justify-center ${
              automation.enabled ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
            }`}
          >
            <Zap className="size-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">{automation.title}</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">{automation.body}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`w-9 h-5 rounded-full relative transition-colors shrink-0 ${
            automation.enabled ? "bg-accent" : "bg-muted-foreground/30"
          }`}
        >
          <span
            className={`absolute top-0.5 size-4 bg-white rounded-full transition-transform ${
              automation.enabled ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </button>
  );
}
