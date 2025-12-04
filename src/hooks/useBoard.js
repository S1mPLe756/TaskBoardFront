import {useEffect, useState} from "react";
import {GetWorkspaceBoards} from "../usecases/board/getWorkspaceBoards";
import {
  CreateBoardForWorkspace
} from "../usecases/board/createBoardForWorkspace";

export function useBoard(workspaceId) {
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState(null);

  const loadBoards = async (workspaceId) => {
    setLoading(true);
    try {
      const data = await GetWorkspaceBoards(workspaceId);
      setBoards(data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const createBoard = async (title, workspaceId) => {
    setLoading(true);
    try {
      await CreateBoardForWorkspace({ title, workspaceId });
      window.location.href = `/workspace/${workspaceId}/boards`;
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBoards(workspaceId);
  }, []);

  return {
    boards,
    loading,
    createBoard
  };
}
