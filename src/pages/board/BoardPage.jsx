import React, {useEffect, useState} from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  Chip, TextField, Button
} from "@mui/material";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

import {useBoard} from "../../hooks/useBoard";
import {useParams} from "react-router-dom";
import {getTextColor} from "../../utils/colorUtils";
import {useCards} from "../../hooks/useCards";
import {useWorkspace} from "../../hooks/useWorkspace";
import DeleteIcon from "@mui/icons-material/Delete";
import {DeleteColumnDialog} from "../../shared/DeleteDialog";
import EditIcon from "@mui/icons-material/Edit";

export const BoardPage = () => {
  const {boardId, id} = useParams();
  const {canChangeWorkspace} = useWorkspace(false, id);
  const {
    board,
    loading,
    addColumn,
    changeBoardColumnsOrder,
    updateColumnName,
    changeColumn,
    deleteColumn,
    getFullBoard
  } = useBoard(
      null);
  const [addingColumn, setAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const {addCard} = useCards();

  useEffect(() => {
    if (boardId) {
      getFullBoard(boardId);
    }
  }, [boardId]);

  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (!board) {
    return <div>Доска не найдена</div>;
  }

  const handleAddColumn = async () => {
    if (newColumnName.trim()) {
      await addColumn(newColumnName, board.columns.length, boardId);
      setNewColumnName("");
      setAddingColumn(false);
    }
  };

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (!selectedId) {
      return;
    }
    await deleteColumn(selectedId);
    handleClose();
  };

  const handleChange = async (id, col) => {
    if (!id) {
      return;
    }
    await changeColumn(id, col.name, col.position);
  };

  return (
      <Box sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Typography variant="h5" mb={3}>{board.title}</Typography>

        <Box sx={{display: "flex", gap: 2, width: "90%", overflowX: "auto"}}>
          <DragDropContext
              onDragEnd={(result) => {
                const {source, destination} = result;
                if (!destination) {
                  return;
                } // отпущено вне списка

                // Перемещение колонок
                if (source.droppableId === "columns" && destination.droppableId
                    === "columns") {
                  const newColumns = Array.from(board.columns);
                  const [removed] = newColumns.splice(source.index, 1);
                  newColumns.splice(destination.index, 0, removed);

                  changeBoardColumnsOrder(newColumns);
                }
              }}
          >
            <Droppable droppableId="columns" direction="horizontal">
              {(provided) => (
                  <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        width: "90%",
                        overflowX: "auto"
                      }}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                  >
                    {board.columns.map((col, index) => (
                        <Draggable key={col.id.toString()} draggableId={col.id.toString()} index={index}>
                          {(providedDraggable) => (
                        <Paper key={col.id}
                               ref={providedDraggable.innerRef}
                               {...providedDraggable.draggableProps}
                               {...providedDraggable.dragHandleProps}
                               sx={{minWidth: 250, p: 2, flexShrink: 0}}>
                          <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1
                              }}
                          >
                            {canChangeWorkspace ?
                                <TextField value={col.name}
                                           onChange={(e) => updateColumnName(
                                               col.id, e.target.value)}

                                           slotProps={{
                                             input: {
                                               style: {
                                                 fontSize: '1.25rem',
                                                 fontWeight: 500
                                               }
                                             }
                                           }}
                                /> : <Typography variant="h6"
                                                 mb={1}>{col.name}</Typography>}

                            {canChangeWorkspace && <Button mt="5"
                                                           onClick={(e) => {
                                                             e.stopPropagation();
                                                             handleChange(
                                                                 col.id, col);
                                                           }}><EditIcon/></Button>}

                            {canChangeWorkspace && <Button onClick={(e) => {
                              e.stopPropagation();
                              handleOpen(col.id);
                            }} color="error" size="small">
                              <DeleteIcon/>
                            </Button>}
                          </Box>
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
                            ))}
                          </List>
                        </Paper>
                          )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
              )}
            </Droppable>
          </DragDropContext>
          {canChangeWorkspace && <Paper
              sx={{minWidth: 250, p: 2, flexShrink: 0}}>
            {addingColumn ? (
                <Box>
                  <TextField
                      size="small"
                      value={newColumnName}
                      onChange={(e) => setNewColumnName(e.target.value)}
                      placeholder="Название колонки"
                  />
                  <Button onClick={handleAddColumn}>Добавить</Button>
                  <Button onClick={() => setAddingColumn(false)}>Отмена</Button>
                </Box>
            ) : (
                <Button onClick={() => setAddingColumn(true)}>+ Добавить
                  колонку</Button>
            )}
          </Paper>}
        </Box>
        <DeleteColumnDialog open={open}
                            onClose={handleClose}
                            onDelete={handleDelete}
                            item="колонку"/>
      </Box>
  );
};
