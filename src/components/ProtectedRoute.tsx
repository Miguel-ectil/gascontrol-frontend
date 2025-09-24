// src/components/ProtectedRoute.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const t = localStorage.getItem("gc_token");
    if (!t) router.push("/login");
  }, [router]);

  return <>{children}</>;
}
