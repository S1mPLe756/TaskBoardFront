import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login"
import ProfileIcon from "@mui/icons-material/Person"
import {useAuth} from "../hooks/useAuth";

export const AppNavbar = () => {
  const isLogin = useAuth();

  return (
      <AppBar position="static" color="white">
        <Toolbar>
          <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Мой сайт
          </Typography>
          {isLogin ? <Button color="inherit"><ProfileIcon/>Profile</Button>: <Button color="inherit"><LoginIcon/>Login</Button>

          }
        </Toolbar>
      </AppBar>
  );
};
