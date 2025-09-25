"use client";
import { useEffect, useState } from "react";
import { DashboardServices } from "@/services/dashboardService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const service = DashboardServices();
  const [totalGasometros, setTotalGasometros] = useState(0);
  const [leituras, setLeituras] = useState<any[]>([]);
  const [alertasAtivos, setAlertasAtivos] = useState(0);
  const [consumoPorDia, setConsumoPorDia] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const gasometros = await service.obterGasometros();
      setTotalGasometros(gasometros);

      const leituras30 = await service.obterLeituras30Dias();
      setLeituras(leituras30);

      const alertas = await service.obterAlertasAtivos();
      setAlertasAtivos(alertas);

      const consumo = await service.obterConsumoPorDia();
      // Se o consumo não vier em formato {data, valor}, agregue por dia aqui
      const consumoFormatado = consumo.map((item: any) => ({
        data: item.periodo ?? "Hoje",
        total: item.total_consumo_m3 ?? 0,
      }));
      setConsumoPorDia(consumoFormatado);
    };

    fetchData();
  }, []);

  const mediaPorDia =
    leituras.length > 0 ? (leituras.length / 30).toFixed(2) : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Cards de KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-gray-500 text-sm">Gasômetros</h3>
          <p className="text-2xl font-bold">{totalGasometros}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-gray-500 text-sm">Leituras últimos 30 dias</h3>
          <p className="text-2xl font-bold">{leituras.length}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-gray-500 text-sm">Média/dia</h3>
          <p className="text-2xl font-bold">{mediaPorDia}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h3 className="text-gray-500 text-sm">Alertas ativos</h3>
          <p className="text-2xl font-bold">{alertasAtivos}</p>
        </div>
      </div>

      {/* Gráfico de consumo */}
      <div className="bg-white shadow p-4 rounded h-96">
        <h3 className="text-gray-500 text-sm mb-2">Consumo por dia</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={consumoPorDia}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
