// src/components/ProtectedRoute.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  // cookies() retorna ReadonlyRequestCookies, que tem .get(name)
  const cookieStore = cookies(); 
  const token = cookieStore.get("gc_token")?.value; // <- apenas .value, sem '()'

  if (!token) {
    redirect("/login"); // Redireciona se não estiver logado
  }

  return <>{children}</>;
}
