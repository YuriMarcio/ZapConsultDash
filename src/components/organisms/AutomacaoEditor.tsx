type Automation = {
  id: string;
  title: string;
  enabled: boolean;
  body: string;
};

export function AutomacaoEditor({
  automation,
  preview,
  onBodyChange,
}: {
  automation: Automation;
  preview: string;
  onBodyChange: (body: string) => void;
}) {
  return (
    <div className="lg:col-span-7 space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold tracking-tight">{automation.title}</h2>
          <span className="text-[10px] font-mono text-muted-foreground">
            {automation.enabled ? "ATIVO" : "INATIVO"}
          </span>
        </div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Mensagem
        </label>
        <textarea
          value={automation.body}
          onChange={(e) => onBodyChange(e.target.value)}
          rows={5}
          className="mt-2 w-full bg-muted border border-border rounded-md p-3 text-sm outline-none focus:border-accent resize-none"
        />
        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px]">
          {["{{nome}}", "{{pedido}}", "{{valor}}"].map((v) => (
            <code key={v} className="px-2 py-1 bg-muted border border-border rounded font-mono">
              {v}
            </code>
          ))}
        </div>
      </div>

      <div className="bg-primary text-primary-foreground rounded-xl p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-3">Preview</p>
        <div className="bg-accent text-accent-foreground rounded-2xl rounded-br-sm p-3 max-w-md text-sm">
          {preview}
          <div className="text-[10px] mt-1 text-accent-foreground/70 text-right">14:32 ✓✓</div>
        </div>
      </div>
    </div>
  );
}
