import { api } from "../../app/api";

export const authService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (email, username, password) => api.post("/auth/register", { email, username, password })
};
