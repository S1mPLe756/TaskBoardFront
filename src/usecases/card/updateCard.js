import {cardService} from "../../features/card/cardService";

export const UpdateCard = async (card) => {
  return await cardService.updateCard(card);
};
