import {workspaceService} from "../../features/workspace/workspaceService";

export const ChangeWorkspace = async (workspaceId, dto) => {
  return await workspaceService.changeWorkspace(workspaceId, dto);
};
