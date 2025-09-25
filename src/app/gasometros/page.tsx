"use client";

import { useEffect, useState } from "react";
import { GasometroService } from "@/services/gasometroService";
import Link from "next/link";

export default function GasometrosPage() {
  const gasometroService = GasometroService();
  const [gasometros, setGasometros] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await gasometroService.listar(); // <-- usar listar()
      setGasometros(data);
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Gasômetros</h1>
        <Link href="/gasometros/novo" className="bg-blue-600 text-white px-4 py-2 rounded">
          Novo
        </Link>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Identificador</th>
            <th className="border px-4 py-2">Localização</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {gasometros.map((g) => (
            <tr key={g.id}>
              <td className="border px-4 py-2">{g.id}</td>
              <td className="border px-4 py-2">{g.identificador}</td>
              <td className="border px-4 py-2">{g.localizacao}</td>
              <td className="border px-4 py-2">{g.status}</td>
              <td className="border px-4 py-2">
                <Link href={`/gasometros/${g.id}`} className="text-blue-600 hover:underline">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
