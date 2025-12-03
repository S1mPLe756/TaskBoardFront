import {api} from "../../app/api";
import {Workspace} from "../../entities/organization/workspace";

class WorkspaceService {
  async getWorkspaces() {
    const res = await api.get("/workspace/my");
    return res.data.map((workspace) => Workspace(workspace));
  }

  async createWorkspace(dto) {
    await api.post("/workspace", dto);
  }
}

export const workspaceService = new WorkspaceService();