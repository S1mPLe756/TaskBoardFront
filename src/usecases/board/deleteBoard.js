import {boardService} from "../../features/board/boardService";

export const DeleteBoard = async (boardId) => {
  return await boardService.deleteBoard(boardId);
};
