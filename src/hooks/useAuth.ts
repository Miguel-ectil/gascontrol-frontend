"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("gc_token");
    if (!token) {
      router.push("/login"); 
    } else {
      setAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  return { authenticated, loading };
}
