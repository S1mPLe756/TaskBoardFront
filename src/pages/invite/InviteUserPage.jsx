import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Alert, Autocomplete,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useWorkspace } from "../../hooks/useWorkspace";
import {useInvites} from "../../hooks/useInvites";

export const InviteUserPage = () => {
  const { id } = useParams();
  const roles = [
    { label: 'Админ', id: "Admin" },
    { label: 'Пользователь', id: "Member"  },]
  const [ role, setRole ] = useState("");
  const [ email, setEmail ] = useState("");
  const { invite, loading } = useInvites(id);
  const { canChangeWorkspace, loading: workspaceLoading } = useWorkspace(false, id);

  if (loading || workspaceLoading) return <Box mt={5} display="flex"
                                               justifyContent="center"
                                               alignItems="center"
                                               flexDirection="column"><CircularProgress /></Box>;

  const submit = (e) => {
    e.preventDefault();
    invite(email, role);
  };


  if (!canChangeWorkspace) {
    return (
        <Box mt={5} display="flex" justifyContent="center">
          <Alert severity="warning">У вас нет прав приглашать участников</Alert>
        </Box>
    );
  }
  return (
      <form onSubmit={submit} style={{marginTop: 20}}>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt={5}
        >
          <Typography variant="h5" mb={3}>
            Пригласить пользователя
          </Typography>

          <Paper sx={{ p: 3, width: "400px" }} elevation={3}>
            <TextField
                fullWidth
                label="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Autocomplete
                sx={{ mt: 3}}
                disablePortal
                getOptionLabel={(option) => option.label}
                options={roles}
                value={roles.find(r => r.id === role) || null}
                fullWidth
                onChange={(event, newValue) => {
                  setRole(
                      newValue.id
                  );
                }}
                renderInput={(params) => <TextField {...params} label="Роль" />}
            />


            <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 3 }}
                type="submit"
                disabled={loading}
            >
              {loading ? CircularProgress : "Пригласить"}
            </Button>
          </Paper>
        </Box>
      </form>
  );
};
