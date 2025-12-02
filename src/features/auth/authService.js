import {api} from "../../app/api";
import {AuthTokens} from "../../entities/auth/authTokens";

class AuthService {
  async login(dto) {
    const res = await api.post("/auth/login", dto);
    return AuthTokens(res.data);
  }

  async register(dto) {
    return api.post("/auth/register", dto);
  }

  async refresh(refreshToken) {
    const res = await api.post("/auth/refresh", { refreshToken });
    return res.data.accessToken;
  }
}

export const authService = new AuthService();