"use client";

import { useKPIs } from "@/hooks/useDashboard";

export default function DashboardContent() {
  const { data, isLoading, error } = useKPIs();

  // if (isLoading) return <div className="p-8 text-center">Carregando KPIs...</div>;
  // if (error) return <div className="p-8 text-center text-red-500">Erro ao carregar KPIs</div>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <div className="text-sm text-gray-500">Total de Gasômetros</div>
          <div className="text-3xl font-bold mt-2">{data?.totalGasometros ?? 0}</div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <div className="text-sm text-gray-500">Leituras (período)</div>
          <div className="text-3xl font-bold mt-2">{Array.isArray(data?.leituras) ? data.leituras.length : 0}</div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 text-center">
          <div className="text-sm text-gray-500">Alertas Ativos</div>
          <div className="text-3xl font-bold mt-2">{Array.isArray(data?.alertas) ? data.alertas.length : 0}</div>
        </div>
      </div>

      <section className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Exemplo: Leituras recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-sm text-gray-500">
              <tr>
                <th className="py-2">Data</th>
                <th className="py-2">Gasômetro</th>
                <th className="py-2">Consumo</th>
                <th className="py-2">Observação</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data?.leituras) && data.leituras.slice(0, 8).map((l: any) => (
                <tr key={l.id} className="border-t">
                  <td className="py-3">{new Date(l.data_leitura).toLocaleString()}</td>
                  <td className="py-3">{l.gasometro}</td>
                  <td className="py-3">{l.consumo}</td>
                  <td className="py-3">{l.observacao ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
