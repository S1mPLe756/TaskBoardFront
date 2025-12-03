import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { notifyError } from "../../services/notificationService";
import {useWorkspace} from "../../hooks/useWorkspace";

export const CreateWorkspacePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {loading, createWorkspace } = useWorkspace();

  const handleCreate = async (e) => {
    if (!name.trim()) {
      notifyError("Введите название");
      return;
    }
    e.preventDefault();
    await createWorkspace(name, description);

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

          <TextField
              label="Описание"
              fullWidth
              multiline
              rows={4}
              sx={{ mt: 2 }}
              value={description}
              onChange={e => setDescription(e.target.value)}
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
