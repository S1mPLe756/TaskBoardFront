import React, { useState } from "react";
import { Box, Button, TextField, Typography, InputAdornment, Paper, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useAuthStore } from "../entities/user/model";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(email, name, password);

    if (res && res.status >= 200 && res.status < 300) {
      navigate("/login");
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
              width: 400,
              borderRadius: 3,
              textAlign: "center",
            }}
        >
          <Typography variant="h5" mb={3}>
            Create Account
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                  ),
                }}
            />

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
              Register
            </Button>

            <Box mt={2}>
              <Link href="/login" underline="hover">
                Already have an account? Login
              </Link>
            </Box>
          </form>
        </Paper>
      </Box>
  );
};
