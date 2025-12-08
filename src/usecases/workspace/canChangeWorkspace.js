import {workspaceService} from "../../features/workspace/workspaceService";

export const CanChangeWorkspace = async (workspaceId) => {
  return await workspaceService.canChange(workspaceId);
};
