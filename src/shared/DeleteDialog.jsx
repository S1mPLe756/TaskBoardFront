import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export const DeleteColumnDialog = ({ open, onClose, onDelete, item }) => {
  const handleDelete = async () => {
    await onDelete();
    onClose();
  };

  return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Удалить {item}?</DialogTitle>
        <DialogContent>
          Это действие необратимо. Вы уверены, что хотите удалить?
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button color="error" onClick={handleDelete}>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
  );
};
