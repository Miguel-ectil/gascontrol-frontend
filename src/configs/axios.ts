import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000",
  withCredentials: true, // importantíssimo para cookies httpOnly
  timeout: 15000,
});

httpClient.interceptors.request.use((config) => {
  const token = Cookies.get("gc_token"); // caso backend use token no header
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // aqui poderia limpar user/redirect
    }
    return Promise.reject(err);
  }
);
