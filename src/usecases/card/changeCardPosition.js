import {cardService} from "../../features/card/cardService";

export const ChangeCardPosition = async (cardId, columnId, position) => {
  return await cardService.changeCardPosition(cardId, columnId, position);
};
