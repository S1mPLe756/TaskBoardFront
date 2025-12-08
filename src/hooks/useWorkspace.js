import {useEffect, useState} from "react";
import {GetWorkspaces} from "../usecases/workspace/getWorkspaces";
import {CreateWorkspace} from "../usecases/workspace/createWorkspace";
import {CanChangeWorkspace} from "../usecases/workspace/canChangeWorkspace";
import {DeleteWorkspace} from "../usecases/workspace/deleteWorkspace";
import {GetWorkspace} from "../usecases/workspace/getWorkspace";
import {ChangeWorkspace} from "../usecases/workspace/changeWorkspace";

export function useWorkspace(isLoad = true, workspaceId = null) {
  const [loading, setLoading] = useState(false);
  const [workspaces, setWorkspaces] = useState(null);
  const [canChangeWorkspace, setCanChangeWorkspace] = useState(false);

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

  const canChange = async (workspaceId) => {
    setLoading(true);
    try {
      const can = await CanChangeWorkspace(workspaceId);
      setCanChangeWorkspace(can);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  const getWorkspace = async (workspaceId) => {
    setLoading(true);
    try {
      return await GetWorkspace(workspaceId);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  const changeWorkspace = async (workspaceId, name, description) => {
    setLoading(true);
    try {
      await ChangeWorkspace(workspaceId, {name, description});
      window.location.href = "/workspaces";
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  const deleteWorkspace = async (workspaceId) => {
    setLoading(true);
    try {
      await DeleteWorkspace(workspaceId);
      setWorkspaces(workspaces.filter((w) => w.id !== workspaceId));
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(workspaceId !== null) {
      canChange(workspaceId);
    }
    if(isLoad) {
      loadWorkspaces();
    }
  }, []);

  return {
    workspaces,
    loading,
    canChangeWorkspace,
    getWorkspace,
    changeWorkspace,
    deleteWorkspace,
    createWorkspace,
    canChange
  };
}
