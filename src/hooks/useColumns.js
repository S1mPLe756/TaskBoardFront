import { CreateColumnForBoard } from "../usecases/column/createColumnForBoard";
import { DeleteColumn } from "../usecases/column/deleteColumn";
import { ChangeColumnForBoard } from "../usecases/column/changeColumnForBoard";

export function useColumns(board, setBoard) {
  const addColumn = async (name, position, boardId) => {
    try {
      const column = await CreateColumnForBoard(boardId, { name, position });
      board.columns.push(column);
      setBoard(board);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteColumn = async (columnId) => {
    try {
      await DeleteColumn(columnId);
      setBoard(prev => ({
        ...prev,
        columns: prev.columns.filter(c => c.id !== columnId)
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const changeColumn = async (columnId, name, position) => {
    try {
      await ChangeColumnForBoard(columnId, { name, position });
    } catch (error) {
      console.error(error);
    }
  };

  const updateColumns = (newColumns) => {
    if (!board) return;
    setBoard({
      ...board,
      columns: newColumns
    });
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

  return { addColumn, deleteColumn, changeColumn, updateColumns, updateColumnName, changeBoardColumnsOrder };
}
