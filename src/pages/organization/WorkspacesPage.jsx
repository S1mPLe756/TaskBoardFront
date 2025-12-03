import React from "react";
import {
  Box, Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import {useWorkspace} from "../../hooks/useWorkspace";

export const WorkspacesPage = () => {
  const {workspaces, loading} = useWorkspace();

  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (!workspaces) {
    return <div>Организации не найдены</div>;
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
                >
                  <ListItemText
                      primary={ws.name}
                      secondary={ws.description || "Без описания"}
                  />
                </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
  );
}
