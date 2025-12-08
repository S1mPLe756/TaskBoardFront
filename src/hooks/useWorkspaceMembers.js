import {useEffect, useState} from "react";
import {GetMembers} from "../usecases/workspaceMember/getMembers";

export function useWorkspaceMembers(workspaceId) {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [isCanChange, setIsCanChange] = useState(false);

  const load = async (workspaceId) => {
    try {
      const data = await GetMembers(workspaceId);
      setMembers(data.members);
      setIsCanChange(data.isCanChange);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (workspaceId !== null) {
      load(workspaceId);
    }
  }, [workspaceId]);

  return { members, loading, isCanChange };
};
