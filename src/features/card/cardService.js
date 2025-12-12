import {api} from "../../app/api";

class CardService {
  async changeCardPosition(cardId, columnId, position) {
    await api.patch(`/cards/position`, {cardId, columnId, position});
  }

  async getCard(cardId) {
    const res = await api.get(`/cards/${cardId}`);
    return res.data;
  }

  async updateCard(card) {
    const res = await api.patch(`/cards`, card);
    return res.data;
  }

  async createCard(card) {
    const res = await api.post(`/cards`, card);
    return res.data;
  }
}

export const cardService = new CardService();