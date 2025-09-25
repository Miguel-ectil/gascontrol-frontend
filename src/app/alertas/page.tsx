"use client";

import { useEffect, useState } from "react";
import { AlertService } from "@/services/alertService";

export default function AlertasPage() {
  const alertService = AlertService(); // inicializa o service
  const [alertas, setAlertas] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await alertService.listar(); // usa o método listar do service
      setAlertas(data);
    };
    load();
  }, []);

  const handleChangeStatus = async (id: number, status: string) => {
    await alertService.atualizarStatus(id, status); // atualiza status
    setAlertas((prev) => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Alertas</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Gasômetro</th>
            <th className="border px-4 py-2">Mensagem</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alertas.map(a => (
            <tr key={a.id}>
              <td className="border px-4 py-2">{a.id}</td>
              <td className="border px-4 py-2">{a.tipo}</td>
              <td className="border px-4 py-2">{a.gasometro}</td>
              <td className="border px-4 py-2">{a.mensagem}</td>
              <td className="border px-4 py-2">{a.status}</td>
              <td className="border px-4 py-2 space-x-2">
                {["novo","em_analise","resolvido"].map(s => (
                  <button
                    key={s}
                    onClick={() => handleChangeStatus(a.id, s)}
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                  >
                    {s}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
