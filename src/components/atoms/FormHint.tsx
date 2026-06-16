export function FormHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] text-muted-foreground mt-1 text-right font-mono">{children}</div>
  );
}
