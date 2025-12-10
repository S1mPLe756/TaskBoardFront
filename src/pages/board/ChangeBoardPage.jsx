import React, {useEffect, useState} from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { notifyError } from "../../services/notificationService";
import {useBoard} from "../../hooks/useBoard";
import {useParams} from "react-router-dom";

export const ChangeBoardPage = () => {
  const [title, setTitle] = useState("");

  const {id, boardId} = useParams();

  const {loading, getBoard, updateBoard } = useBoard(id, false);


  const handleUpdate = async (e) => {
    if (!title.trim()) {
      notifyError("Введите название");
      return;
    }
    e.preventDefault();
    await updateBoard(title, boardId);

  };

  useEffect(() => {
    const load = async () => {
      const br = await getBoard(boardId);
      if (!br) return;

      setTitle(br.title);
    };

    load();
  }, [id]);

  return (
      <Box
          sx={{
            maxWidth: 500,
            mx: "auto",
            mt: 6,
            p: 2,
          }}
      >
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Изменение доски
          </Typography>

          <TextField
              label="Название"
              fullWidth
              sx={{ mt: 2 }}
              value={title}
              onChange={e => setTitle(e.target.value)}
          />

          <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
              onClick={handleUpdate}
          >
            {loading ? "Изменение..." : "Изменить"}
          </Button>
        </Paper>
      </Box>
  );
}
