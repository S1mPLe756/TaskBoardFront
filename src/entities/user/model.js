import { create } from "zustand";
import {authService} from "../../features/auth/authService";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  login: async (email, password) => {
    const res = await authService.login(email, password);
    if(res.status === 200) {
      set({ user: res.data.user, token: res.data.accessToken });
      localStorage.setItem("token", res.data.accessToken);
      return true;
    }
    return false;
  },
  register: async (email, username, password) => {
    return await authService.register(email, username, password);
  },
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  }
}));
