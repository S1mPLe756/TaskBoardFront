import {
  Box,
  Card,
  CardContent,
  Chip,
  ListItem,
  Typography
} from "@mui/material";
import {colorsPriority, getTextColor} from "../../utils/colorUtils";
import {Draggable} from "@hello-pangea/dnd";
import {CardModal} from "./CardModal";
import {useState} from "react";
import {alpha} from "@mui/system";

export const CardTask = ({card, setCard, canChange, index}) => {
  const [open, setOpen] = useState(false);


  return (
      <>
        <Draggable
            key={card.id}
            draggableId={"card-" + card.id}
            index={index}
        >
          {(providedCard, snapshotCard) => (
              <ListItem key={card.id} sx={{mb: 1}} ref={providedCard.innerRef}
                        {...providedCard.draggableProps}
                        {...providedCard.dragHandleProps} onClick={() => setOpen(true)}>
                <Card variant="outlined" sx={{width: "100%", backgroundColor: alpha(colorsPriority[card.priority], 0.2) }}  >
                  <CardContent>
                    <Typography
                        variant="subtitle1">{card.title}</Typography>
                    <Box sx={{
                      mt: 1,
                      display: "flex",
                      gap: 0.5,
                      flexWrap: "wrap"
                    }}>
                      {card.labels.map((label) => (
                          <Chip key={label.id}
                                label={label.name} sx={
                            {
                              backgroundColor: label.color,
                              color: getTextColor(label.color)
                            }
                          } size="small"/>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </ListItem>
          )}
        </Draggable>
        <CardModal open={open} onClose={() => setOpen(false)} onUpdate={setCard}  card={card} canChange={canChange}/>

      </>
  );
}