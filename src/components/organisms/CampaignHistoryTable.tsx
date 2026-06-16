import { CampaignRow } from "@/components/molecules/CampaignRow";
import type { Campaign } from "@/api/types";

export function CampaignHistoryTable({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="mt-8">
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-1">Histórico</p>
          <h2 className="text-lg font-bold tracking-tight">Suas campanhas</h2>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-muted/40 border-b border-border">
              <tr className="text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="text-left px-4 py-3 font-semibold">Campanha</th>
                <th className="text-left px-4 py-3 font-semibold">Plano</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Investido</th>
                <th className="text-right px-4 py-3 font-semibold">Alcance</th>
                <th className="text-right px-4 py-3 font-semibold">Cliques → WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <CampaignRow key={c.id} campaign={c} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
