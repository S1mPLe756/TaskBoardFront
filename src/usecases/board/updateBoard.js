import {boardService} from "../../features/board/boardService";

export const UpdateBoard = async (boardId, dto) => {
  return await boardService.updateBoard(boardId, dto);
};
