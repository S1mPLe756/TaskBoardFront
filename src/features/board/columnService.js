import {api} from "../../app/api";

class ColumnService {
  async createColumnForBoard(boardId, dto) {
    const res = await api.post(`/column/board/${boardId}`, dto);
    return res.data;
  }

  async deleteColumn(columnId) {
    await api.delete(`/column/${columnId}`);
  }

  async changeColumn(columnId, dto) {
    const res = await api.patch(`/column/${columnId}`, dto);
    return res.data;
  }
}

export const columnService = new ColumnService();