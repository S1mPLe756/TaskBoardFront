import React, {useState} from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {useWorkspace} from "../../hooks/useWorkspace";
import {useNavigate} from "react-router-dom";

export const WorkspacesPage = () => {
  const {workspaces, loading, deleteWorkspace} = useWorkspace();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (!workspaces) {
    return <div>Организации не найдены</div>;
  }

  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    await deleteWorkspace(selectedId);
    handleClose();
  };

  return (
      <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
      >

        <Typography variant="h5" mb={3}>Мои организации</Typography>

        <Button variant="contained" href={"/workspaces/create"}>Создать</Button>

        <Paper sx={{width: "100%", maxWidth: 500}}>
          <List>
            {workspaces.map((ws) => (
                <ListItem
                    key={ws.id}
                    button
                    sx={{
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => {
                      navigate(`/workspace/${ws.id}/boards`);
                    }}
                >
                  <ListItemText
                      primary={ws.name}
                      secondary={ws.description || "Без описания"}
                  />
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/workspaces/${ws.id}/change`);
                  }}><EditIcon/></Button>
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(ws.id);
                  }}><DeleteIcon color="error"/></Button>

                </ListItem>
            ))}
          </List>
        </Paper>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Удалить организацию?</DialogTitle>
          <DialogContent>
            Это действие необратимо. Вы уверены, что хотите удалить?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button color="error" onClick={handleDelete}>
              Удалить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
}
