import {workspaceService} from "../../features/workspace/workspaceService";

export const CreateWorkspace = async (dto) => {
  return await workspaceService.createWorkspace(dto);
};
