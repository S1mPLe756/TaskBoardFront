import {columnService} from "../../features/board/columnService";

export const CreateColumnForBoard = async (boardId, dto) => {
  return await columnService.createColumnForBoard(boardId, dto);
};
