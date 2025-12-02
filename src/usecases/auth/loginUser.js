import {authService} from "../../features/auth/authService";

export const LoginUser = async (data) => {
  const tokens = await authService.login(data);

  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);

  return tokens;
};
