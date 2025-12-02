import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { HomePage } from "../pages/HomePage";
import {RegisterPage} from "../pages/auth/RegisterPage";
import {useAuth} from "../hooks/useAuth";
import ProfilePage from "../pages/profile/ProfilePage";

export const AppRouter = () => {
  const {isLogin} = useAuth();

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route
              path="/"
              element={
                isLogin ? (
                    <HomePage />
                ) : (
                    <Navigate to="/login" />
                )
              }
          />
        </Routes>
      </BrowserRouter>
  );
};
