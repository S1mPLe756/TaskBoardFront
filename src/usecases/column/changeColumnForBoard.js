import {columnService} from "../../features/board/columnService";

export const ChangeColumnForBoard = async (columnId, dto) => {
  return await columnService.changeColumn(columnId, dto);
};
