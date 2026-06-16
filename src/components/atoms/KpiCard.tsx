import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  delta,
  deltaTone = "success",
  delayMs = 0,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "success" | "danger" | "muted";
  delayMs?: number;
}) {
  const toneClasses =
    deltaTone === "success"
      ? "text-accent bg-accent/10"
      : deltaTone === "danger"
        ? "text-rose-500 bg-rose-500/10"
        : "text-muted-foreground bg-muted";

  return (
    <div
      className="bg-card p-5 border border-border rounded-lg ring-1 ring-black/5 animate-entrance"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <p className="text-xs text-muted-foreground font-medium mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold tracking-tighter">{value}</h3>
        {delta && (
          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", toneClasses)}>{delta}</span>
        )}
      </div>
    </div>
  );
}
