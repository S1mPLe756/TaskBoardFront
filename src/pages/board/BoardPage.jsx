import React, {useEffect, useState} from "react";
import {
  Box,
  Paper,
  Typography, TextField, Button
} from "@mui/material";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";

import {useBoard} from "../../hooks/useBoard";
import {useParams} from "react-router-dom";
import {useCards} from "../../hooks/useCards";
import {useWorkspace} from "../../hooks/useWorkspace";
import {Column} from "./Column";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useColumns} from "../../hooks/useColumns";

export const BoardPage = () => {
  const {boardId, id} = useParams();
  const {canChangeWorkspace} = useWorkspace(false, id);
  const {
    board,
    setBoard,
    loading,
    getFullBoard
  } = useBoard(
      null);

  const {
    addColumn,
    changeBoardColumnsOrder,
    updateColumnName,
    updateColumns,
    changeColumn,
    deleteColumn,
  } = useColumns(board, setBoard);
  const [addingColumn, setAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const {moveCard} = useCards();

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

  const onDrag = (result) => {
      const {source, destination, type} = result;
      if (!destination) {
        return;
      }

      if (type === "COLUMN") {
        const newColumns = Array.from(board.columns);
        const [removed] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, removed);
        changeBoardColumnsOrder(newColumns);
      } else if (type === "CARD") {
        const sourceColId = source.droppableId.replace("col-", "");
        const destColId = destination.droppableId.replace("col-", "");

        const sourceColumn = board.columns.find(
            c => c.id === sourceColId);
        const destColumn = board.columns.find(
            c => c.id === destColId);

        if (!sourceColumn || !destColumn) {
          return;
        }

        let newColumns, movedCard;

        if (sourceColId === destColId) {
          // Перемещение внутри одной колонки
          const updatedCards = Array.from(sourceColumn.cards);
          [movedCard] = updatedCards.splice(source.index, 1);
          updatedCards.splice(destination.index, 0, movedCard);

          newColumns = board.columns.map(col =>
              col.id === sourceColId ? {...col, cards: updatedCards} : col
          );
        } else {
          // Перемещение между колонками
          const sourceCards = Array.from(sourceColumn.cards);
          const destCards = Array.from(destColumn.cards);

          [movedCard] = sourceCards.splice(source.index, 1);
          destCards.splice(destination.index, 0, movedCard);

          newColumns = board.columns.map(col => {
            if (col.id === sourceColId) {
              return {...col, cards: sourceCards};
            }
            if (col.id === destColId) {
              return {...col, cards: destCards};
            }
            return col;
          });

        }

        updateColumns(newColumns);
        moveCard(movedCard.id, destColId,
            destination.index);
      }
    };

  return (
      <Box sx={{
        mt: 4,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Box
            sx={{
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3
            }}
        >
          <Typography variant="h5" mb={3}>{board.title}</Typography>

          {canChangeWorkspace &&
              <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <Button onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                </Button>
              </Box>}
        </Box>
        <Box sx={{
          display: "flex",
          gap: 2,
          flexDirection: "row",
          alignItems: "start",
          overflowX: "auto",
          width: "90%"
        }}>
          <DragDropContext
              onDragEnd={(result) => onDrag(result)}
          >
            <Droppable droppableId="columns" direction="horizontal"
                       type="COLUMN"
                       isDropDisabled={!Boolean(canChangeWorkspace)}
                       isCombineEnabled={false}>
              {(provided) => (
                  <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        width: "90%",
                        overflowX: "auto"
                      }}
                      {...(provided.droppableProps)}
                      ref={provided.innerRef}
                  >
                    {board.columns.map((col, index) => (

                        <Column
                            key={col.id}
                            isEditing={isEditing}
                            canChangeWorkspace={canChangeWorkspace}
                            changeColumn={changeColumn} col={col}
                            deleteColumn={deleteColumn}
                            index={index}
                            updateColumnName={updateColumnName}
                            addCard={(newCard) => {
                              const newColumns = board.columns.map(c => ({
                                ...c,
                                cards: c.id === col.id
                                    ? [...c.cards, newCard]
                                    : c.cards
                              }));
                              setBoard({ ...board, columns: newColumns });
                            }}
                            onUpdateCard={(updatedCard) => {
                              const newColumns = board.columns.map(c => ({
                                ...c,
                                cards: c.id === col.id
                                    ? c.cards.map(card => card.id === updatedCard.id ? updatedCard : card)
                                    : c.cards
                              }));
                              setBoard({ ...board, columns: newColumns });
                            }}/>
                    ))}
                    {provided.placeholder}
                    {(canChangeWorkspace && isEditing) && <Paper
                        sx={{minWidth: 250, p: 2, flexShrink: 0}}>
                      {addingColumn ? (
                          <Box>
                            <TextField
                                size="small"
                                value={newColumnName}
                                onChange={(e) => setNewColumnName(
                                    e.target.value)}
                                placeholder="Название колонки"
                            />
                            <Button onClick={handleAddColumn}>Добавить</Button>
                            <Button onClick={() => setAddingColumn(
                                false)}>Отмена</Button>
                          </Box>
                      ) : (
                          <Button onClick={() => setAddingColumn(true)}>+
                            Добавить
                            колонку</Button>
                      )}
                    </Paper>}
                  </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>
  );
};
