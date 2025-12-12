import {Droppable} from "@hello-pangea/dnd";
import {Box, Button, List} from "@mui/material";
import {CardTask} from "./CardTask";
import React, {useState} from "react";
import CardModal from "./CardModal";

export const CardTaskList = ({cards, setCards, addCard, canChange, colId}) => {
  const [open, setOpen] = useState(false);

  const handleAddCard = () => {
    setOpen(true);
  }

  return (
      <>
        <Droppable droppableId={"col-" + colId} type="CARD">
          {(providedCards, snapshotCards) => (
              <List ref={providedCards.innerRef}
                    {...providedCards.droppableProps}>
                {cards.map((card, cardIndex) => (
                    <CardTask key={card.id} card={card} setCard={setCards}
                              index={cardIndex} canChange={canChange}/>
                ))}
                {providedCards.placeholder}
                {canChange && (
                    <Box sx={{display: "flex", justifyContent: "center", mt: 1}}>
                      <Button
                          variant="outlined"
                          size="small"
                          onClick={handleAddCard}
                      >
                        + Добавить карточку
                      </Button>
                    </Box>
                )}
              </List>
          )}
        </Droppable>
        <CardModal
            columnId={colId}
            open={open}
            mode="create"
            card={null}
            onClose={() => setOpen(false)}
            onUpdate={addCard}
        />
      </>
  );
}