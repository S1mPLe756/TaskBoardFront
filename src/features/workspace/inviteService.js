import {api} from "../../app/api";

class InviteService {

  async sendInvite(dto) {
    const res = await api.post(`/invitation`,
        dto
    );
    return res.data;
  }

  async acceptInvitation(inviteId) {
    const res = await api.post(`/invitation/${inviteId}/accept`);
    return res.data;
  }

  async getWorkspaceByInvitation(inviteId) {
    const res = await api.get(`/invitation/${inviteId}/workspace`);
    return res.data;
  }
}

export const inviteService = new InviteService();