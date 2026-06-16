import { AvatarInitials } from "@/components/atoms/AvatarInitials";
import { StatusPill } from "@/components/atoms/StatusPill";
import { useTeam } from "@/api/services/team.service";
import type { TeamMember } from "@/api/types";

const ROLE_LABEL: Record<TeamMember["role"], string> = {
  owner:     "Owner",
  manager:   "Gerente",
  attendant: "Atendente",
};

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between p-3 bg-muted rounded border border-border">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-full bg-border animate-pulse shrink-0" />
        <div className="space-y-1.5">
          <div className="h-3 w-28 bg-border rounded animate-pulse" />
          <div className="h-2.5 w-36 bg-border rounded animate-pulse" />
        </div>
      </div>
      <div className="h-5 w-16 bg-border rounded animate-pulse" />
    </div>
  );
}

export function TeamSection() {
  const { data, isLoading } = useTeam();
  const members = data?.data ?? [];

  return (
    <section className="bg-card border border-border rounded-xl p-6 ring-1 ring-black/5">
      <h2 className="font-bold tracking-tight mb-4">Equipe</h2>
      <div className="space-y-2">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
        ) : members.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">Nenhum membro cadastrado.</p>
        ) : (
          members.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between p-3 bg-muted rounded border border-border"
            >
              <div className="flex items-center gap-3">
                <AvatarInitials name={u.name} size="md" />
                <div>
                  <div className="text-xs font-semibold">{u.name}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">{u.email}</div>
                </div>
              </div>
              <StatusPill tone={u.role === "owner" ? "success" : "muted"}>
                {ROLE_LABEL[u.role]}
              </StatusPill>
            </div>
          ))
        )}
        <button className="w-full mt-2 px-3 py-2 text-xs font-bold uppercase tracking-widest border border-dashed border-border rounded text-muted-foreground hover:bg-muted">
          + Convidar membro
        </button>
      </div>
    </section>
  );
}
