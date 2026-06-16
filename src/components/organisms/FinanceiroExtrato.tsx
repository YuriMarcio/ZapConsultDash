import { useState } from "react";
import { StatusPill } from "@/components/atoms/StatusPill";
import { useFinanceEntries } from "@/api/services/finance.service";
import type { EntryStatus } from "@/api/types";

const FILTERS: { label: string; value?: EntryStatus }[] = [
  { label: "Tudo" },
  { label: "Aprovados",  value: "Aprovado"  },
  { label: "Pendentes",  value: "Pendente"  },
  { label: "Estornados", value: "Estornado" },
];

export function FinanceiroExtrato() {
  const [filterIdx, setFilterIdx] = useState(0);
  const { data } = useFinanceEntries({ status: FILTERS[filterIdx].value });
  const entries = data?.data ?? [];

  return (
    <div className="bg-card border border-border rounded-xl ring-1 ring-black/5 overflow-hidden animate-entrance">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <h2 className="font-bold tracking-tight">Extrato</h2>
        <div className="flex gap-1 text-[10px] font-bold uppercase tracking-widest">
          {FILTERS.map(({ label }, i) => (
            <button
              key={label}
              onClick={() => setFilterIdx(i)}
              className={
                i === filterIdx
                  ? "px-2.5 py-1 bg-primary text-primary-foreground rounded"
                  : "px-2.5 py-1 text-muted-foreground hover:bg-muted rounded"
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-muted/50 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          <tr>
            <th className="px-5 py-3">Descrição</th>
            <th className="px-5 py-3">Data</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3 text-right">Valor</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {entries.map((f) => (
            <tr key={f.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-5 py-4 text-xs font-medium">{f.description}</td>
              <td className="px-5 py-4 text-xs text-muted-foreground font-mono">{f.date}</td>
              <td className="px-5 py-4">
                {f.status === "Aprovado"  && <StatusPill tone="success">Aprovado</StatusPill>}
                {f.status === "Pendente"  && <StatusPill tone="warning">Pendente</StatusPill>}
                {f.status === "Estornado" && <StatusPill tone="danger">Estornado</StatusPill>}
              </td>
              <td className={`px-5 py-4 text-right font-mono text-xs font-bold ${f.amount > 0 ? "text-accent" : "text-rose-500"}`}>
                {f.amount > 0 ? "+" : ""}R$ {Math.abs(f.amount).toFixed(2).replace(".", ",")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
