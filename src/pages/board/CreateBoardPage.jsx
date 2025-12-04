import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { notifyError } from "../../services/notificationService";
import {useBoard} from "../../hooks/useBoard";
import {useParams} from "react-router-dom";

export const CreateBoardPage = () => {
  const [name, setName] = useState("");

  const {id} = useParams();

  const {loading, createBoard } = useBoard(id);


  const handleCreate = async (e) => {
    if (!name.trim()) {
      notifyError("Введите название");
      return;
    }
    e.preventDefault();
    await createBoard(name, id);

  };

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
            Создание организации
          </Typography>

          <TextField
              label="Название"
              fullWidth
              sx={{ mt: 2 }}
              value={name}
              onChange={e => setName(e.target.value)}
          />

          <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
              onClick={handleCreate}
          >
            {loading ? "Создание..." : "Создать"}
          </Button>
        </Paper>
      </Box>
  );
}
