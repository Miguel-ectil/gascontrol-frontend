"use client";

import { useState, useEffect } from "react";
import { LeituraService } from "@/services/leituraService";

export default function RegistrarLeituraPage() {
  const leituraService = LeituraService()
  const [gasometros, setGasometros] = useState<any[]>([]);
  const [gasometroId, setGasometroId] = useState("");
  const [consumo, setConsumo] = useState("");
  const [data, setData] = useState("");
  const [observacao, setObservacao] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await leituraService.listar();
      setGasometros(data);
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(consumo) < 0) {
      setMessage("Consumo não pode ser negativo");
      return;
    }
    try {
      await leituraService.criar({ gasometro: gasometroId, consumo, data_leitura: data, observacao });
      setMessage("Leitura registrada com sucesso!");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Erro ao registrar leitura");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrar Leitura</h1>
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          value={gasometroId}
          onChange={(e) => setGasometroId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Selecione um gasômetro</option>
          {gasometros.map((g) => (
            <option key={g.id} value={g.id}>{g.identificador}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Consumo"
          value={consumo}
          onChange={(e) => setConsumo(e.target.value)}
          className="w-full border p-2 rounded"
          step="0.01"
          min="0"
          required
        />
        <input
          type="datetime-local"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Observações"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Registrar
        </button>
      </form>
    </div>
  );
}
