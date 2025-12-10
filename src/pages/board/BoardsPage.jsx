import React, {useState} from "react";
import {
  Avatar,
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper, Stack,
  Typography
} from "@mui/material";
import {useBoard} from "../../hooks/useBoard";
import {useNavigate, useParams} from "react-router-dom";
import {useWorkspaceMembers} from "../../hooks/useWorkspaceMembers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const BoardsPage = () => {
  const {id} = useParams();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const {boards, deleteBoard, loading} = useBoard(id);
  const {
    members,
    loading: membersLoading,
    isCanChange,
  } = useWorkspaceMembers(id);

  const navigate = useNavigate();

  if (loading || membersLoading) {
    return <div>Загрузка...</div>;
  }
  if (!boards) {
    return <div>Досок не найдено</div>;
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
    await deleteBoard(selectedId);
    handleClose();
  };


  return (
      <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
      >
        {/* Заголовок */}
        <Typography variant="h5">Workspace</Typography>

        {/* Блок участников Workspace */}
        <Paper sx={{width: "80%", p: 2}}>
          <Box display="flex" justifyContent="space-between"
               alignItems="center">
            <Typography variant="h6">Участники</Typography>

            {isCanChange && (
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/workspace/${id}/invite`)}
                >
                  Пригласить
                </Button>
            )}
          </Box>

          <Stack direction="column" spacing={1} mt={2}>
            {members.map((m) => (
                <Box
                    key={m.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1,
                      borderRadius: 1,
                      bgcolor: "#fafafa",
                      border: "1px solid #eee",
                    }}
                >
                  <Avatar>{m.user.username[0]}</Avatar>
                  <Box>
                    <Typography variant="body1">{m.user.username}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {m.email}
                    </Typography>
                  </Box>
                </Box>
            ))}
          </Stack>
        </Paper>
        <Typography variant="h5">Доски Workspace</Typography>

        {/* Кнопка создания доски */}
        {isCanChange && <Button
            variant="contained"
            onClick={() => navigate(`/workspace/${id}/boards/create`)}
        >
          Создать доску
        </Button>}

        {/* Список досок */}
        <Paper sx={{width: "80%", mt: 2}}>
          <List>
            {boards.boards.map((br) => (
                <ListItem
                    key={br.id}
                    button
                    sx={{
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => navigate(`/workspace/${id}/boards/${br.id}`)}
                >
                  <ListItemText primary={br.title}/>

                  {boards.canChangeWorkspace && [<Button onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/workspace/${id}/boards/${br.id}/change`);
                  }}><EditIcon/></Button>,
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(br.id);
                  }}><DeleteIcon color="error"/></Button>]}
                </ListItem>
            ))}
          </List>
        </Paper>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Удалить доску?</DialogTitle>
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
