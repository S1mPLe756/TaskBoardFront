import React from "react";
import { useAuthStore } from "../entities/user/model";
import {Button} from "@mui/material";

export const HomePage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
      <div  className="p-5">
        <h1>Welcome {user?.email}</h1>
        <Button variant="contained"
                color="primary"
                className="mt-4" onClick={logout}>Logout</Button>
      </div>
  );
};
