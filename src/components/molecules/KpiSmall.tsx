const tones: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-600",
  amber: "bg-amber-500/10 text-amber-600",
  violet: "bg-violet-500/10 text-violet-600",
  sky: "bg-sky-500/10 text-sky-600",
};

export function KpiSmall({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: "emerald" | "amber" | "violet" | "sky";
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 ring-1 ring-black/5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className={`size-7 rounded flex items-center justify-center ${tones[tone]}`}>
          <Icon className="size-3.5" />
        </span>
      </div>
      <div className="text-xl font-bold font-mono tracking-tight">{value}</div>
    </div>
  );
}
