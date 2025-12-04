import {boardService} from "../../features/board/boardService";

export const GetWorkspaceBoards = async (workspaceId) => {
  return await boardService.getBoardsByWorkspace(workspaceId);
};
