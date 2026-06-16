import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";
import type { ListTeamResponse, InviteMemberRequest, InviteMemberResponse } from "@/api/types";

export const teamKeys = {
  all:  () => ["team"]        as const,
  list: () => ["team", "list"] as const,
};

export function useTeam() {
  return useQuery({
    queryKey: teamKeys.list(),
    queryFn:  () => api.get<ListTeamResponse>(ENDPOINTS.team.list),
  });
}

export function useInviteMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: InviteMemberRequest) =>
      api.post<InviteMemberResponse>(ENDPOINTS.team.invite, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: teamKeys.all() }),
  });
}
