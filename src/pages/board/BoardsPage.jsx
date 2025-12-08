import React from "react";
import {
  Avatar,
  Box, Button,
  List,
  ListItem,
  ListItemText,
  Paper, Stack,
  Typography
} from "@mui/material";
import {useBoard} from "../../hooks/useBoard";
import {useNavigate, useParams} from "react-router-dom";
import {useWorkspaceMembers} from "../../hooks/useWorkspaceMembers";

export const BoardsPage = () => {
  const {id} = useParams();

  const {boards, loading} = useBoard(id);
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
            {boards.map((br) => (
                <ListItem
                    key={br.id}
                    button
                    sx={{
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => navigate(`/boards/${br.id}`)}
                >
                  <ListItemText primary={br.title}/>
                </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
  );
}
