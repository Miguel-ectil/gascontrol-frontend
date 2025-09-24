// src/hooks/useDashboard.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useKPIs() {
  return useQuery({
    queryKey: ["kpis"],
    queryFn: async () => {
      const [g, l, a] = await Promise.all([
        api.get("/gasometros/"),
        api.get("/leituras/?date_from=2025-01-01&date_to=2025-12-31"), // ajuste depois as datas dinamicamente
        api.get("/alertas/?status=novo"),
      ]);

      return {
        totalGasometros: g.data?.count ?? 0,
        leituras: l.data?.results ?? [],
        alertas: a.data?.results ?? [],
      };
    },
  });
}
