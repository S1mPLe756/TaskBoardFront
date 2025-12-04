import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {LoginPage} from "../pages/auth/LoginPage";
import {HomePage} from "../pages/HomePage";
import {RegisterPage} from "../pages/auth/RegisterPage";
import {useAuth} from "../hooks/useAuth";
import {ProfilePage} from "../pages/profile/ProfilePage";
import {WorkspacesPage} from "../pages/organization/WorkspacesPage";
import {CreateWorkspacePage} from "../pages/organization/CreateWorkspacePage";
import {BoardsPage} from "../pages/board/BoardsPage";
import {CreateBoardPage} from "../pages/board/CreateBoardPage";

export const AppRouter = () => {
  const {isLogin} = useAuth();

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/workspaces" element={<WorkspacesPage/>}/>
          <Route path="/workspaces/create" element={<CreateWorkspacePage/>}/>
          <Route path="/workspace/:id/boards" element={<BoardsPage/>}/>
          <Route path="/workspace/:id/boards/create" element={<CreateBoardPage/>}/>
          <Route
              path="/"
              element={
                isLogin ? (
                    <HomePage/>
                ) : (
                    <Navigate to="/login"/>
                )
              }
          />
        </Routes>
      </BrowserRouter>
  );
};
