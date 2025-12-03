import {useEffect, useState} from "react";
import {GetWorkspaces} from "../usecases/organization/getWorkspaces";
import {RegisterUser} from "../usecases/auth/registerUser";
import {CreateWorkspace} from "../usecases/organization/createWorkspace";

export function useWorkspace() {
  const [loading, setLoading] = useState(false);
  const [workspaces, setWorkspaces] = useState(null);

  const loadWorkspaces = async () => {
    setLoading(true);
    try {
      const data = await GetWorkspaces();
      setWorkspaces(data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const createWorkspace = async (name, description) => {
    setLoading(true);
    try {
      await CreateWorkspace({ name, description });
      window.location.href = "/workspaces";
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  return {
    workspaces,
    loading,
    createWorkspace
  };
}
