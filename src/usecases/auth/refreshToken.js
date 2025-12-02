import {authService} from "../../features/auth/authService";

export const RefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const newAccess = await authService.refresh(refreshToken);
  localStorage.setItem("accessToken", newAccess);

  return newAccess;
};
