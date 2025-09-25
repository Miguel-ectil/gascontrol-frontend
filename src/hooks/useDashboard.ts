// src/hooks/useDashboard.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/lib/axios";

export function useKPIs() {
  return useQuery({
    queryKey: ["kpis"],
    queryFn: async () => {
      const today = new Date();
      const dateTo = today.toISOString().split("T")[0];
      const dateFrom = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

      const [g, l, a] = await Promise.all([
        httpClient.get("/gasometros/"),
        httpClient.get("/leituras/", { params: { date_from: dateFrom, date_to: dateTo } }),
        httpClient.get("/alertas/", { params: { status: "novo" } }),
      ]);

      return {
        totalGasometros: g.data?.count ?? (Array.isArray(g.data) ? g.data.length : 0),
        leituras: l.data?.results ?? (Array.isArray(l.data) ? l.data : []),
        alertas: a.data?.results ?? (Array.isArray(a.data) ? a.data : []),
      };
    },
    staleTime: 1000 * 60 * 2, // 2 minutos
  });
}
