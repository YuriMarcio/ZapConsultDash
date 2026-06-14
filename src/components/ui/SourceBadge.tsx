import { SOURCE_META, type OrderSource } from "@/lib/mock-data";

export function SourceBadge({
  source,
  size = "sm",
}: {
  source: OrderSource;
  size?: "xs" | "sm" | "md";
}) {
  const m = SOURCE_META[source];
  const dims =
    size === "xs"
      ? "h-5 px-1.5 text-[9px]"
      : size === "md"
        ? "h-7 px-2.5 text-[11px]"
        : "h-6 px-2 text-[10px]";
  return (
    <span
      title={m.label}
      className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider ${m.color} ${m.text} ${dims} ring-1 ${m.ring}`}
    >
      <span className="inline-block size-1.5 rounded-full bg-current opacity-70" />
      {m.label}
    </span>
  );
}

export function SourceDot({ source }: { source: OrderSource }) {
  const m = SOURCE_META[source];
  return (
    <span
      title={m.label}
      className={`inline-flex items-center justify-center size-6 rounded font-bold text-[9px] ${m.color} ${m.text}`}
    >
      {m.short}
    </span>
  );
}
