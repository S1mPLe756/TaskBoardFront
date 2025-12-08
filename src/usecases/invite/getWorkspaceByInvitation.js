import {inviteService} from "../../features/workspace/inviteService";

export const GetWorkspaceByInvitation = async (inviteId) => {
  return await inviteService.getWorkspaceByInvitation(inviteId);
};
