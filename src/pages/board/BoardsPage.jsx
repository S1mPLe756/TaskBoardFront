import React from "react";
import {
  Box, Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import {useBoard} from "../../hooks/useBoard";
import {useNavigate, useParams} from "react-router-dom";

export const BoardsPage = () => {
  const {id} = useParams();

  const {boards, loading} = useBoard(id);
  const navigate = useNavigate();

  if (loading) {
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
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
      >

        <Typography variant="h5" mb={3}>Доски организации</Typography>

        <Button variant="contained" href={`/workspace/${id}/boards/create`}>Создать</Button>

        <Paper sx={{width: "80%"}}>
          <List>
            {boards.map((br) => (
                <ListItem
                    key={br.id}
                    button
                    sx={{
                      borderBottom: "1px solid #eee",
                    }}
                    onClick={() => {
                      navigate(`/boards/${br.id}`);
                    }}
                >
                  <ListItemText
                      primary={br.title}
                  />
                </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
  );
}
