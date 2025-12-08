import {workspaceService} from "../../features/workspace/workspaceService";

export const CanChangeWorkspace = async (workspaceId) => {
  await workspaceService.canChange(workspaceId);
};
