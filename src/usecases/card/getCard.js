import {cardService} from "../../features/card/cardService";

export const GetCard = async (cardId) => {
  return await cardService.getCard(cardId);
};
