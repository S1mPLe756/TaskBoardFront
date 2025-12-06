import React, {useEffect} from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import {useBoard} from "../../hooks/useBoard";
import {useParams} from "react-router-dom";
import {getTextColor} from "../../utils/colorUtils";

export const BoardPage = () => {
  const {boardId} = useParams();
  const {board, loading, getBoard} = useBoard(null);

  useEffect(() => {
    if (boardId) {
      getBoard(boardId);
    }
  }, [boardId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (!board) {
    return <div>Доска не найдена</div>;
  }

  return (
      <Box sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Typography variant="h5" mb={3}>{board.title}</Typography>

        <Box sx={{display: "flex", gap: 2, width: "90%", overflowX: "auto"}}>
          {board.columns.map((col) => (
              <Paper key={col.id} sx={{minWidth: 250, p: 2, flexShrink: 0}}>
                <Typography variant="h6" mb={1}>{col.name}</Typography>

                <List>
                  {col.cards.map((card) => (
                      <ListItem key={card.id} sx={{mb: 1}}>
                        <Card variant="outlined" sx={{width: "100%"}}>
                          <CardContent>
                            <Typography
                                variant="subtitle1">{card.title}</Typography>
                            {card.description && (
                                <Typography variant="body2"
                                            color="text.secondary">
                                  {card.description}
                                </Typography>
                            )}
                            <Box sx={{
                              mt: 1,
                              display: "flex",
                              gap: 0.5,
                              flexWrap: "wrap"
                            }}>
                              {card.labels.map((label) => (
                                  <Chip key={label.id} label={label.name} sx={
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
                  ))}
                </List>
              </Paper>
          ))}
        </Box>
      </Box>
  );
};
