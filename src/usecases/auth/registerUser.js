import {authService} from "../../features/auth/authService";

export const RegisterUser = async (data) => {
  await authService.register(data);
};
