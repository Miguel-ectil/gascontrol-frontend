// src/lib/api.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("gc_token") : null;
  if (token && config.headers) config.headers.Authorization = `Token ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    // tratamento genérico de erros
    if (err.response?.status === 401) {
      localStorage.removeItem("gc_token");
      // opcional: redirecionar para /login
    }
    return Promise.reject(err);
  }
);

export default api;
