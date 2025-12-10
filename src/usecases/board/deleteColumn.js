import {boardService} from "../../features/board/boardService";

export const DeleteColumn = async (columnId) => {
  return await boardService.deleteColumn(columnId);
};
