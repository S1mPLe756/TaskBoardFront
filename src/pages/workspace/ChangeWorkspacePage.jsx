import React, {useEffect, useState} from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { notifyError } from "../../services/notificationService";
import {useWorkspace} from "../../hooks/useWorkspace";
import {useParams} from "react-router-dom";

export const ChangeWorkspacePage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {loading, changeWorkspace, getWorkspace } = useWorkspace(false);

  const handleChange = async (e) => {
    if (!name.trim()) {
      notifyError("Введите название");
      return;
    }
    e.preventDefault();
    await changeWorkspace(id, name, description);
  };
  useEffect(() => {
    const load = async () => {
      const ws = await getWorkspace(id);
      if (!ws) return;

      setName(ws.name);
      setDescription(ws.description || "");
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
            Изменение организации
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
              onClick={handleChange}
          >
            {loading ? "Изменение..." : "Изменить"}
          </Button>
        </Paper>
      </Box>
  );
}
