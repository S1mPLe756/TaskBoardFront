import {cardService} from "../../features/card/cardService";

export const CreateCard = async (card) => {
  return await cardService.createCard(card);
};
