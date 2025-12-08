import {workspaceService} from "../../features/workspace/workspaceService";

export const GetWorkspaces = async () => {
  return await workspaceService.getWorkspaces();
};
