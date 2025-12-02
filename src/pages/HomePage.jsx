import React from "react";
import {Button} from "@mui/material";
import {useAuth} from "../hooks/useAuth";

export const HomePage = () => {
  const {logout} = useAuth();

  return (
      <div className="p-5">
        <Button variant="contained"
                color="primary"
                className="mt-4" onClick={logout}>Logout</Button>
      </div>
  );
};
