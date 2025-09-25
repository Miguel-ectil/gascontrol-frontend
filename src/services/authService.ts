import { AxiosResponse } from "axios";
import { httpClient } from "../configs/axios";
import Cookies from "js-cookie";

const Url = "/api/auth";

export const AuthService = () => {

  const login = async (data: { username: string; password: string }): Promise<any> => {
    const url = `${Url}/login/`;
    const res: AxiosResponse<any> = await httpClient.post(url, data, { withCredentials: true });
    if (res.data?.token) {
      Cookies.set("gc_token", res.data.token, { sameSite: "lax" }); // não httpOnly
    }
    return res.data;
  };

  const me = async (): Promise<any> => {
    const url = `${Url}/me/`;
    const res: AxiosResponse<any> = await httpClient.get(url, { withCredentials: true });
    return res.data;
  };

  const logout = async (): Promise<any> => {
    const url = `${Url}/logout/`;
    const res: AxiosResponse<any> = await httpClient.post(url, {}, { withCredentials: true });
    Cookies.remove("gc_token");
    return res.data;
  };

  return { login, me, logout };
};
