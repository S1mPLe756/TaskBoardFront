import {boardService} from "../../features/board/boardService";

export const GetBoardById = async (boardId) => {
  return await boardService.getBoardById(boardId);
};
