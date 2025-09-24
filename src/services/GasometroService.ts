// src/services/GasometroService.ts
import { AxiosResponse } from "axios";
import httpClient from "@/lib/axios";

const Url = "/gasometros";

export const GasometroService = () => {
  const listGasometros = async (params?: Record<string, any>): Promise<any[]> => {
    const res: AxiosResponse<any[]> = await httpClient.get(`${Url}/`, { params });
    return res.data;
  };

  const getGasometroById = async (id: number): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.get(`${Url}/${id}/`);
    return res.data;
  };

  const createGasometro = async (gasometro: any): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.post(`${Url}/`, gasometro);
    return res.data;
  };

  const updateGasometro = async (id: number, gasometro: any): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.put(`${Url}/${id}/`, gasometro);
    return res.data;
  };

  const deleteGasometro = async (id: number): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.delete(`${Url}/${id}/`);
    return res.data;
  };

  const toggleStatus = async (id: number, ativo: boolean): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.patch(`${Url}/${id}/`, { status: ativo ? "ativo" : "inativo" });
    return res.data;
  };

  return {
    listGasometros,
    getGasometroById,
    createGasometro,
    updateGasometro,
    deleteGasometro,
    toggleStatus,
  };
};
