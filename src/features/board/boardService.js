import {api} from "../../app/api";
import {Board} from "../../entities/board/board";

class BoardService {
  async getBoardsByWorkspace(workspaceId) {
    const res = await api.get("/board/workspace/" + workspaceId);
    return res.data.map((board) => Board(board));
  }

  async createBoard(dto) {
    await api.post("/board", dto);
  }

  async getBoardById(boardId) {
    const res = await api.get(`/board/${boardId}/full`);
    return res.data;
  }
}

export const boardService = new BoardService();