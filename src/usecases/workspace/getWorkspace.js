import {workspaceService} from "../../features/workspace/workspaceService";

export const GetWorkspace = async (workspaceId) => {
  return await workspaceService.getWorkspace(workspaceId);
};
