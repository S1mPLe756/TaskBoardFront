import axios from "axios";
import {
  getUserFriendlyMessage,
  handleHttpError,
  logError
} from "../services/errorHandler";
import {notifyError} from "../services/notificationService";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
    (config) => {
      if(config.url.includes("auth")) {
        return config;
      }

      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      const handledError = handleHttpError(error);
      logError(handledError, 'Request interceptor');
      return Promise.reject(handledError);
    }
);

api.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;


      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) throw new Error("No refresh token");

          const { data } = await axios.post(
              "http://localhost:5000/token/refresh",
              { refreshToken }
          );

          localStorage.setItem("accessToken", data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Refresh failed", refreshError);

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          window.location.href = "/login";
        }
      }


      const handledError = handleHttpError(error);
      notifyError(getUserFriendlyMessage(handledError));

      return Promise.reject(handledError);
    }
);

