import { useState } from "react";
import {LoginUser} from "../usecases/auth/loginUser";
import {RegisterUser} from "../usecases/auth/registerUser";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [isLogin] = useState(
      localStorage.getItem("accessToken") !== null
  );

  const login = async (email, password) => {
    setLoading(true);
    try {
      await LoginUser({ email, password });
      window.location.href = "/profile";
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const register = async (email, username, password) => {
    setLoading(true);
    try {
      await RegisterUser({ email, username, password });
      window.location.href = "/login";
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return {
    loading,
    isLogin,
    login,
    register,
    logout,
  };
}
