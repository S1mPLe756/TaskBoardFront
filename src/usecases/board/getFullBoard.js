import {boardService} from "../../features/board/boardService";

export const GetFullBoard = async (boardId) => {
  return await boardService.getFullBoardById(boardId);
};
