import {boardService} from "../../features/board/boardService";

export const GetBoard = async (boardId) => {
  return await boardService.getBoardById(boardId);
};
