// src/services/AlertaService.ts
import { AxiosResponse } from "axios";
import httpClient from "@/lib/axios";

const Url = "/alertas";

export const AlertaService = () => {
  const listAlertas = async (params?: Record<string, any>): Promise<any[]> => {
    const res: AxiosResponse<any[]> = await httpClient.get(`${Url}/`, { params });
    return res.data;
  };

  const updateStatus = async (id: number, status: string): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.patch(`${Url}/${id}/`, { status });
    return res.data;
  };

  return { listAlertas, updateStatus };
};
