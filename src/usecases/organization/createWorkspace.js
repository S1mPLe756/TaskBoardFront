import {workspaceService} from "../../features/organization/workspaceService";

export const CreateWorkspace = async (dto) => {
  return await workspaceService.createWorkspace(dto);
};
