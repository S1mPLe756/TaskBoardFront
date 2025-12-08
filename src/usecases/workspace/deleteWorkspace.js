import {workspaceService} from "../../features/workspace/workspaceService";

export const DeleteWorkspace = async (workspaceId) => {
  await workspaceService.deleteWorkspace(workspaceId);
};
