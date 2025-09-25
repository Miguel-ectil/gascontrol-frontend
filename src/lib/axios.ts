// src/lib/axios.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

const httpClient = axios.create({
  baseURL,
  timeout: 15000,
});

// Request interceptor: pega token do cookie no client (document.cookie)
httpClient.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const m = document.cookie.match(new RegExp("(?:^|; )" + "gc_token" + "=([^;]*)"));
      const token = m ? decodeURIComponent(m[1]) : null;
      if (token && config.headers) config.headers.Authorization = `Token ${token}`;
    }
  } catch (e) {
    // noop
  }
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    // Se 401: opcionalmente remover cookie e redirecionar
    if (err.response?.status === 401 && typeof window !== "undefined") {
      document.cookie = "gc_token=; path=/; max-age=0";
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default httpClient;
