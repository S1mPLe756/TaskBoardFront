import {boardService} from "../../features/board/boardService";

export const CreateColumnForBoard = async (boardId, dto) => {
  return await boardService.createColumnForBoard(boardId, dto);
};
