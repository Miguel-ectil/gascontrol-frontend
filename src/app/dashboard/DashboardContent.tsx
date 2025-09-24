"use client";

import { useKPIs } from "@/hooks/useDashboard";

export default function DashboardContent() {
  const { data, isLoading, error } = useKPIs();

  if (isLoading) return <p>Carregando KPIs...</p>;
  if (error) return <p>Erro ao carregar KPIs</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <p>Total de Gasômetros</p>
          <h2 className="text-xl font-semibold">{data?.totalGasometros}</h2>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p>Total de Leituras</p>
          <h2 className="text-xl font-semibold">{data?.leituras.length}</h2>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p>Alertas Ativos</p>
          <h2 className="text-xl font-semibold">{data?.alertas.length}</h2>
        </div>
      </div>
    </div>
  );
}
