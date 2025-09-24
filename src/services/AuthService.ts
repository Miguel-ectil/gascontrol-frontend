import httpClient from "@/lib/axios";

const Url = "/auth";

export const AuthService = () => {
  const login = async (email: string, password: string) => {
    const res = await httpClient.post(`${Url}/login/`, {
      username: email,
      password,
    });

    if (res.data?.token) {
      // salva token no cookie (client-side)
      document.cookie = `gc_token=${res.data.token}; path=/; max-age=86400; SameSite=Lax`;
    }

    return res.data;
  };

  const logout = (): void => {
    document.cookie = `gc_token=; path=/; max-age=0`; // remove cookie
  };

  const getProfile = async () => {
    const res = await httpClient.get(`${Url}/me/`);
    return res.data;
  };

  return { login, logout, getProfile };
};
