import {inviteService} from "../../features/workspace/inviteService";

export const InviteUser = async (dto) => {
  return await inviteService.sendInvite(dto);
};
