import {boardService} from "../../features/board/boardService";

export const CreateBoardForWorkspace = async (dto) => {
  return await boardService.createBoard(dto);
};
