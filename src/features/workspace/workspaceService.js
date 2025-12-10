import {api} from "../../app/api";
import {Workspace} from "../../entities/organization/workspace";

class WorkspaceService {
  async getWorkspaces() {
    const res = await api.get("/workspace/my");
    return res.data.map((workspace) => Workspace(workspace));
  }

  async getWorkspaceMembers(workspaceId) {
    const res = await api.get(`/workspace/${workspaceId}/members`);
    return res.data;
  }

  async createWorkspace(dto) {
    await api.post("/workspace", dto);
  }

  async canChange(workspaceId) {
    const res = await api.get(`/workspace/${workspaceId}/can-change-workspace`);
    return res.data;
  }

  async deleteWorkspace(workspaceId) {
    await api.delete(`/workspace/${workspaceId}`);
  }

  async changeWorkspace(workspaceId, dto) {
    await api.patch(`/workspace/${workspaceId}`, dto);
  }

  async getWorkspace(workspaceId) {
    const res = await api.get(`/workspace/${workspaceId}`);
    return res.data;
  }
}

export const workspaceService = new WorkspaceService();