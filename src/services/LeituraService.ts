// src/services/LeituraService.ts
import { AxiosResponse } from "axios";
import httpClient from "@/lib/axios";

const Url = "/leituras";

export const LeituraService = () => {
  const listLeituras = async (params?: Record<string, any>): Promise<any[]> => {
    const res: AxiosResponse<any[]> = await httpClient.get(`${Url}/`, { params });
    return res.data;
  };

  const createLeitura = async (leitura: {
    gasometro: number;
    data_leitura: string;
    consumo: number;
    observacao?: string;
  }): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.post(`${Url}/`, leitura);
    return res.data;
  };

  const getLeiturasByGasometro = async (id: number): Promise<any[]> => {
    const res: AxiosResponse<any[]> = await httpClient.get(`${Url}/?gasometro=${id}`);
    return res.data;
  };

  return { listLeituras, createLeitura, getLeiturasByGasometro };
};
