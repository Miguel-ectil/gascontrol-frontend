// src/lib/axios.ts
import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  timeout: 15000,
});

httpClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("gc_token");
    if (token) config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("gc_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default httpClient;
