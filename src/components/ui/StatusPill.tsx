import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "info" | "muted" | "danger";

const tones: Record<Tone, string> = {
  success: "bg-accent/10 text-accent border-accent/20",
  warning: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  info: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
  muted: "bg-muted text-muted-foreground border-border",
  danger: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
};

export function StatusPill({ tone = "muted", children, dot }: { tone?: Tone; children: React.ReactNode; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
        tones[tone],
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", tone === "success" ? "bg-accent status-pulse" : "bg-current")} />}
      {children}
    </span>
  );
}
