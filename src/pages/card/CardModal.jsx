// CardModal.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Box,
  Typography
} from "@mui/material";
import { useCards } from "../../hooks/useCards";
import { useParams } from "react-router-dom";
import CardEditor from "./CardEditor";
import CardView from "./CardView";

export const CardModal = ({ open, onClose, onUpdate, canChange, columnId, card, mode = "edit" }) => {
  const { getCard, card: fullCard, loading, updateCard, createCard } = useCards();
  const { boardId } = useParams();

  const [editableCard, setEditableCard] = useState(null);
  const [isEditing, setIsEditing] = useState(mode === "create");

  useEffect(() => {
    if (open && card?.id) {
      getCard(card.id);
    }
  }, [open, card?.id]);

  useEffect(() => {
    if (mode === "create" && open) {
      // minimal empty shape for creation mode
      console.log(columnId);
      setEditableCard({
        title: "",
        description: "",
        labels: [],
        assignees: [],
        priority: null,
        dueDate: new Date().toISOString(),
        columnId,
        boardId
      });
      setIsEditing(true);
    }
    else if (fullCard) {
      // attach boardId for downstream usage if needed
      fullCard.boardId = boardId;
      setEditableCard(fullCard);
    }
  }, [fullCard, mode, open, boardId]);

  if (!open) return null;
  if (!card && mode !== "create") return null;
  if (!editableCard) return null;
  if (loading) return (
      <Dialog open={open}>
        <Box p={3} textAlign="center">Загрузка...</Box>
      </Dialog>
  );

  const handleSave = async () => {
    let res;
    if(mode === "create") {
      res = await createCard(editableCard);
      setEditableCard(null);
    } else {
      res = await updateCard(editableCard);
    }
    if (typeof onUpdate === "function") {
      onUpdate(res || editableCard);
    }
    onClose();
  };

  return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {isEditing ? editableCard.title : <Typography>{editableCard.title}</Typography>}

          {canChange && mode !== "create" && (
              <Button onClick={() => setIsEditing(x => !x)}>
                {isEditing ? "Просмотр" : "Редактировать"}
              </Button>
          )}
        </DialogTitle>

        <DialogContent dividers>
          {isEditing ? (
              <CardEditor
                  editableCard={editableCard}
                  setEditableCard={setEditableCard}
                  canChange={canChange}
                  setIsEditing={setIsEditing}
              />
          ) : (
              <CardView editableCard={editableCard} />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          {isEditing && <Button variant="contained" onClick={handleSave}>Сохранить</Button>}
        </DialogActions>
      </Dialog>
  );
};

export default CardModal;
