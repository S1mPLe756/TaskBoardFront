import {boardService} from "../../features/board/boardService";

export const ChangeColumnForBoard = async (columnId, dto) => {
  return await boardService.changeColumn(columnId, dto);
};
