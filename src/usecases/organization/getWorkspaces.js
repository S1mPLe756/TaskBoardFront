import {workspaceService} from "../../features/organization/workspaceService";

export const GetWorkspaces = async () => {
  return await workspaceService.getWorkspaces();
};
