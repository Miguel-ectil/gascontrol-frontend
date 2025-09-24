"use client";

import { useKPIs } from "@/hooks/useDashboard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const { data, isLoading, error } = useKPIs();

  if (isLoading) return <p className="text-center text-gray-500">Carregando dados...</p>;
  if (error) return <p className="text-center text-red-500">Erro ao carregar dados.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-10">📊 Dashboard - GasControl</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
          <h2 className="text-lg font-semibold text-gray-600">Total de Gasômetros</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{data?.totalGasometros}</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
          <h2 className="text-lg font-semibold text-gray-600">Leituras (30 dias)</h2>
          <p className="text-4xl font-bold text-green-600 mt-2">{data?.leituras?.length}</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition">
          <h2 className="text-lg font-semibold text-gray-600">Alertas Ativos</h2>
          <p className="text-4xl font-bold text-red-600 mt-2">{data?.alertas?.length}</p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">Gráfico de Consumo</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.leituras || []}>
            <XAxis dataKey="data_leitura" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="consumo" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
