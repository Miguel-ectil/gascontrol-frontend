// src/lib/auth.ts
import api from "./api";

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login/", { username: email, password });
  // dependendo do backend, ajuste o campo. Se retornar token:
  const token = res.data?.token || res.data?.key;
  if (!token) throw new Error("Token não retornado");
  localStorage.setItem("gc_token", token);
  return res.data;
}

export function logout() {
  localStorage.removeItem("gc_token");
  // redirecionar para /login se quiser
}
