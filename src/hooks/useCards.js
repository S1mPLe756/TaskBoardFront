import {useState} from "react";
import {ChangeCardPosition} from "../usecases/card/changeCardPosition";
import {GetCard} from "../usecases/card/getCard";
import {UpdateCard} from "../usecases/card/updateCard";
import {CreateCard} from "../usecases/card/createCard";

export function useCards() {
  const [card, setCard] = useState();
  const [loading, setLoading] = useState(false);

  const moveCard = async (cardId, columnId, position) => {
    try {
      await ChangeCardPosition(cardId, columnId, position); // твой метод API
    }
    catch (error) {
      console.error(error);
    }
  };

  const getCard = async (cardId) => {
    setLoading(true);
    try {
      const data = await GetCard(cardId);
      setCard(data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const updateCard = async (card) => {
    setLoading(true);
    try {
      const data = await UpdateCard(card);
      setCard(data);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const createCard = async (card) => {
    setLoading(true);
    try {
      const data = await CreateCard(card);
      setCard(data);
      return data;
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  return {
    moveCard,
    getCard,
    updateCard,
    createCard,
    card,
    loading
  };
}
