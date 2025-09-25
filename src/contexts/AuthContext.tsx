import React, { createContext, useState, useEffect, ReactNode } from "react";
import { login as loginReq, me as meReq, logout as logoutReq } from "../services/authService";

type User = { id: number; username: string; email?: string } | null;

export const AuthContext = createContext({
  user: null as User,
  loading: true,
  login: async (u: any) => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await meReq();
        setUser(r.data);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const login = async (payload: { username: string; password: string }) => {
    await loginReq(payload);
    const r = await meReq();
    setUser(r.data);
  };

  const logout = async () => {
    await logoutReq();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
