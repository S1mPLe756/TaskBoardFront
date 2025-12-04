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
}

export const boardService = new BoardService();