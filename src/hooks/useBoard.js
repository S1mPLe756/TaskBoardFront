import {useEffect, useState} from "react";
import {GetWorkspaceBoards} from "../usecases/board/getWorkspaceBoards";
import {
  CreateBoardForWorkspace
} from "../usecases/board/createBoardForWorkspace";
import {GetFullBoard} from "../usecases/board/getFullBoard";
import {DeleteBoard} from "../usecases/board/deleteBoard";
import {UpdateBoard} from "../usecases/board/updateBoard";
import {GetBoardById} from "../usecases/board/getBoardById";
import {CreateColumnForBoard} from "../usecases/board/createColumnForBoard";
import {DeleteColumn} from "../usecases/board/deleteColumn";
import {ChangeColumnForBoard} from "../usecases/board/changeColumnForBoard";

export function   useBoard(workspaceId, isLoad = true) {
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState(null);
  const [board, setBoard] = useState(null);

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

  const getFullBoard = async (boardId) => {
    setLoading(true);
    try {
      const data = await GetFullBoard(boardId);
      setBoard(data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  const getBoard = async (boardId) => {
    setLoading(true);
    try {
      return await GetBoardById(boardId);
      }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

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

  const addColumn = async (name, position, boardId) => {
    setLoading(true);
    try {
      const column = await CreateColumnForBoard(boardId, { name, position });
      board.columns.push(column);
      setBoard(board);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const updateColumnName = (id, name) => {
    setBoard(prev => ({
      ...prev,
      columns: prev.columns.map(c => c.id === id ? { ...c, name } : c)
    }));
  };

  const changeBoardColumnsOrder = (newColumns) => {
    setBoard(prev => ({ ...prev, columns: newColumns }));

    newColumns.forEach((col, index) => {
      changeColumn(col.id, col.name, index);
    });
  };


  const changeColumn = async (columnId, name, position) => {
    setLoading(true);
    try {
      await ChangeColumnForBoard(columnId, { name, position });
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const updateBoard = async (title, boardId) => {
    setLoading(true);
    try {
      await UpdateBoard( boardId, {title});
      window.location.href = `/workspace/${workspaceId}/boards`;
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };


  const deleteBoard = async (boardId) => {
    setLoading(true);
    try {
      await DeleteBoard(boardId);
      boards.boards = boards.boards.filter((board) => board.id !== boardId);
      setBoards(boards);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const deleteColumn = async (columnId) => {
    setLoading(true);
    try {
      await DeleteColumn(columnId);
      board.columns = board.columns.filter((column) => column.id !== columnId);
      setBoard(board);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if(isLoad && workspaceId !== null) {
      loadBoards(workspaceId);
    }
  }, []);

  return {
    boards,
    loading,
    board,
    changeBoardColumnsOrder,
    updateColumnName,
    changeColumn,
    addColumn,
    deleteColumn,
    getBoard,
    updateBoard,
    deleteBoard,
    getFullBoard,
    createBoard
  };
}
