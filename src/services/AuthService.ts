// src/services/AuthService.ts
import { AxiosResponse } from "axios";
import httpClient from "@/lib/axios";

const Url = "/auth";

export const AuthService = () => {
  const login = async (email: string, password: string): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.post(`${Url}/login/`, {
      username: email,
      password,
    });
    if (res.data?.token) {
      localStorage.setItem("gc_token", res.data.token);
    }
    return res.data;
  };

  const logout = (): void => {
    localStorage.removeItem("gc_token");
  };

  const getProfile = async (): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.get(`${Url}/me/`);
    return res.data;
  };

  return { login, logout, getProfile };
};
