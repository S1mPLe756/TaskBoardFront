import {inviteService} from "../../features/workspace/inviteService";

export const AcceptInvitation = async (inviteId) => {
  return await inviteService.acceptInvitation(inviteId);
};
