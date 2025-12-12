import {columnService} from "../../features/board/columnService";

export const DeleteColumn = async (columnId) => {
  return await columnService.deleteColumn(columnId);
};
