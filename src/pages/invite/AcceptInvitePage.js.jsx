import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";
import { useParams } from "react-router-dom";
import {useInvites} from "../../hooks/useInvites";
import {useEffect} from "react";

export const AcceptInvitePage = () => {
  const { id } = useParams();

  const { acceptInvite, getWorkspaceByInvite, workspace, loading } = useInvites(id);

  useEffect(() => {
    getWorkspaceByInvite(id);
  }, []);

  if (loading) return <Box mt={5} display="flex"
                                               justifyContent="center"
                                               alignItems="center"
                                               flexDirection="column"><CircularProgress /></Box>;

  const submit = (e) => {
    e.preventDefault();
    acceptInvite(id);
  };



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
            Вас приглашают в Workspace {workspace.name}
          </Typography>

          <Paper sx={{ p: 3, width: "400px" }} elevation={3}>



            <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 3 }}
                type="submit"
                disabled={loading}
            >
              {loading ? CircularProgress : "Присоединиться"}
            </Button>
          </Paper>
        </Box>
      </form>
  );
};
