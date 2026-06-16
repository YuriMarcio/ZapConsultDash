import { SOURCE_META, type OrderSource } from "@/lib/mock-data";

const SOURCE_FILTERS: (OrderSource | "all")[] = [
  "all",
  "whatsapp",
  "ifood",
  "rappi",
  "ubereats",
  "99food",
  "cardapio",
];

export function SourceFilterBar({
  active,
  counts,
  onChange,
}: {
  active: OrderSource | "all";
  counts: Record<OrderSource | "all", number>;
  onChange: (s: OrderSource | "all") => void;
}) {
  return (
    <div className="mb-6 flex gap-1.5 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
      {SOURCE_FILTERS.map((s) => {
        const isActive = active === s;
        const label = s === "all" ? "Todos os canais" : SOURCE_META[s].label;
        return (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={`shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition ${
              isActive
                ? "bg-foreground text-background border-foreground"
                : "bg-card border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {s !== "all" && (
              <span className={`size-2 rounded-full ${SOURCE_META[s].color}`} aria-hidden />
            )}
            {label}
            <span
              className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                isActive ? "bg-background/15" : "bg-muted"
              }`}
            >
              {counts[s]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
