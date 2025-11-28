import axios from "axios";
import {notifyError} from "../services/notificationService";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        notifyError(`Ошибка ${error.response.status}: ${error.response.data.message || "Серверная ошибка"}`);
      } else {
        notifyError("Сетевая ошибка. Проверьте соединение.");
      }
      return error.response ? Promise.resolve(error.response) : Promise.reject(error);
    }
);
