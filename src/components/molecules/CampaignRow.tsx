import { StatusPill } from "@/components/atoms/StatusPill";
import { CAMPAIGN_PLANS } from "@/lib/mock-data";
import type { Campaign } from "@/api/types";
import { Calendar, MapPin } from "lucide-react";

export function CampaignRow({ campaign }: { campaign: Campaign }) {
  const plan = CAMPAIGN_PLANS.find((p) => p.id === campaign.planId);
  const tone: "success" | "warning" | "muted" | "danger" =
    campaign.status === "ativa"
      ? "success"
      : campaign.status === "agendada"
        ? "warning"
        : campaign.status === "encerrada"
          ? "muted"
          : "danger";

  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/30">
      <td className="px-4 py-3">
        <div className="font-semibold">{campaign.title}</div>
        <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
          <Calendar className="size-3" /> {campaign.startDate} → {campaign.endDate} ·{" "}
          <MapPin className="size-3" /> {campaign.area}
        </div>
      </td>
      <td className="px-4 py-3 text-xs">{plan?.name || "—"}</td>
      <td className="px-4 py-3">
        <StatusPill tone={tone} dot>
          {campaign.status}
        </StatusPill>
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm">
        R$ {campaign.spend.toFixed(2).replace(".", ",")}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm">
        {campaign.reach.toLocaleString("pt-BR")}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm">
        {campaign.clicks.toLocaleString("pt-BR")}
      </td>
    </tr>
  );
}
