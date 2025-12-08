import {workspaceService} from "../../features/workspace/workspaceService";

export const GetMembers = async (workspaceId) => {
  return await workspaceService.getWorkspaceMembers(workspaceId);
};
