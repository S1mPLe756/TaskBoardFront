import {api} from "../../app/api";

class BoardService {
  async getBoardsByWorkspace(workspaceId) {
    const res = await api.get("/board/workspace/" + workspaceId);
    return res.data;
  }

  async createBoard(dto) {
    await api.post("/board", dto);
  }

  async getFullBoardById(boardId) {
    const res = await api.get(`/board/${boardId}/full`);
    return res.data;
  }

  async getBoardById(boardId) {
    const res = await api.get(`/board/${boardId}`);
    return res.data;
  }

  async deleteBoard(boardId) {
    await api.delete(`/board/${boardId}`);
  }

  async updateBoard(boardId, dto) {
    await api.patch(`/board/${boardId}`, dto);
  }
}

export const boardService = new BoardService();