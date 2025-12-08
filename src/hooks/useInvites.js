import {useEffect, useState} from "react";
import {InviteUser} from "../usecases/invite/inviteUser";
import {AcceptInvitation} from "../usecases/invite/acceptInvitation";
import {
  GetWorkspaceByInvitation
} from "../usecases/invite/getWorkspaceByInvitation";

export function useInvites(workspaceId) {
  const [loading, setLoading] = useState(false);
  const [workspace, setWorkspace] = useState(false);


  const invite = async (email, role) => {
    setLoading(true);

    try {
      await InviteUser({workspaceId, email, role});
      window.location.href = `/workspace/${workspaceId}/boards`;
    } catch (e) {
      console.error("Ошибка отправки приглашения");
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async (inviteId) => {
    setLoading(true);

    try {
      const res = await AcceptInvitation(inviteId);
      window.location.href = `/workspace/${res.workspaceId}/boards`;
    } catch (e) {
      console.error("Ошибка отправки приглашения");
    } finally {
      setLoading(false);
    }
  };

  const getWorkspaceByInvite = async (inviteId) => {
    setLoading(true);

    try {
      const workspace = await GetWorkspaceByInvitation(inviteId);
      setWorkspace(workspace);
    } catch (e) {
      console.error("Ошибка получения workspace");
    } finally {
      setLoading(false);
    }
  };


  return {
    invite,
    acceptInvite,
    getWorkspaceByInvite,
    workspace,
    loading,
  };
}
