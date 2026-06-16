export function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5 block">
      {children}
    </label>
  );
}
