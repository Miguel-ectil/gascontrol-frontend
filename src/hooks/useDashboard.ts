"use client"; 

import { useQuery } from "@tanstack/react-query";
import httpClient from "@/lib/axios";

export function useKPIs() {
  return useQuery({
    queryKey: ["kpis"],
    queryFn: async () => {
      const [g, l, a] = await Promise.all([
        httpClient.get("/gasometros/"),
        httpClient.get("/leituras/?date_from=2025-08-01&date_to=2025-09-01"),
        httpClient.get("/alertas/?status=novo"),
      ]);

      return {
        totalGasometros: g.data.count,
        leituras: l.data.results,
        alertas: a.data.results,
      };
    },
  });
}
