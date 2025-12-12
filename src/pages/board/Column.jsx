import {
  Box,
  Button,
  List,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";
import {DeleteColumnDialog} from "../../shared/DeleteDialog";
import {Draggable} from "@hello-pangea/dnd";
import {CardTaskList} from "../card/CardTaskList";

export const Column = ({
  index,
  canChangeWorkspace,
  isEditing,
  col,
  updateColumnName,
  deleteColumn,
  changeColumn,
  onUpdateCard,
  addCard
}) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
      <Draggable key={col.id} draggableId={"c-" + col.id.toString()}
                 index={index}>
        {(provided, snapshot) => (
            <Paper key={col.id}
                   ref={provided.innerRef}
                   {...provided.draggableProps}
                   {...provided.dragHandleProps}
                   sx={{minWidth: 250, p: 2, flexShrink: 0}}>
              <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1
                  }}
              >
                {isEditing ?
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
                                     mb={1}>{col.name} </Typography>}

                {isEditing && <Button mt="5"
                                               onClick={(e) => {
                                                 e.stopPropagation();
                                                 handleChange(
                                                     col.id, col);
                                               }}><EditIcon/></Button>}

                {isEditing && <Button onClick={(e) => {
                  e.stopPropagation();
                  handleOpen(col.id);
                }} color="error" size="small">
                  <DeleteIcon/>
                </Button>}
              </Box>
              <CardTaskList cards={col.cards} canChange={canChangeWorkspace}
                            colId={col.id} setCards={onUpdateCard} addCard={addCard}/>
              <DeleteColumnDialog open={open}
                                  onClose={handleClose}
                                  onDelete={handleDelete}
                                  item="колонку"/>
            </Paper>
        )}
      </Draggable>);
}