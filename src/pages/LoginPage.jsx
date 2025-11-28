import React, { useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useAuthStore } from "../entities/user/model";
import { Box, Button, TextField, Typography, InputAdornment, Paper } from "@mui/material";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(await login(email, password)) {
      navigate("/");
    }
  };

  return (
      <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          }}
      >
        <Paper
            elevation={10}
            sx={{
              p: 4,
              width: 360,
              borderRadius: 3,
              textAlign: "center",
            }}
        >
          <Typography variant="h5" mb={3}>
            Welcome Back
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                  ),
                }}
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                  ),
                }}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)",
                  },
                }}
            >
              Login
            </Button>

            <Button
                variant="outlined"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: "bold",
                  color: "#6a11cb",
                  borderColor: "#6a11cb",
                  "&:hover": {
                    background: "#f3e5f5",
                    borderColor: "#2575fc",
                    color: "#2575fc",
                  },
                }}
                onClick={() => {
                  window.location.href = "/register";
                }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>
  );

}