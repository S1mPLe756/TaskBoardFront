import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {LoginPage} from "../pages/auth/LoginPage";
import {HomePage} from "../pages/HomePage";
import {RegisterPage} from "../pages/auth/RegisterPage";
import {useAuth} from "../hooks/useAuth";
import {ProfilePage} from "../pages/profile/ProfilePage";
import {WorkspacesPage} from "../pages/workspace/WorkspacesPage";
import {CreateWorkspacePage} from "../pages/workspace/CreateWorkspacePage";
import {BoardsPage} from "../pages/board/BoardsPage";
import {CreateBoardPage} from "../pages/board/CreateBoardPage";
import {BoardPage} from "../pages/board/BoardPage";
import {InviteUserPage} from "../pages/invite/InviteUserPage";
import {AcceptInvitation} from "../usecases/invite/acceptInvitation";
import {
  AcceptInvitePage,
  AcceptInvitePageJs
} from "../pages/invite/AcceptInvitePage.js";
import {ChangeWorkspacePage} from "../pages/workspace/ChangeWorkspacePage";

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
          <Route path="/workspaces/:id/change" element={<ChangeWorkspacePage/>}/>
          <Route path="/workspace/:id/boards/create" element={<CreateBoardPage/>}/>
          <Route path="/boards/:boardId" element={<BoardPage/>}/>
          <Route path="/workspace/:id/invite" element={<InviteUserPage/>}/>
          <Route path="/invite/:id/accept" element={<AcceptInvitePage/>}/>
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
