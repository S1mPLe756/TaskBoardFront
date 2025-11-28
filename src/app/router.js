import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { useAuthStore } from "../entities/user/model";
import { Layout } from "../components/Layout";
import {RegisterPage} from "../pages/RegisterPage";

export const AppRouter = () => {
  const token = useAuthStore((state) => state.token);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
              path="/"
              element={
                token ? (
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
