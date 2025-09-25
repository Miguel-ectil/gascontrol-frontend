import { AxiosResponse } from "axios";
import { httpClient } from "../configs/axios";

const Url = "/api/gasometros";

export const GasometroService = () => {

  const listar = async (params = {}): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.get(Url, { params });
    return res.data;
  };

  const detalhar = async (id: number): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.get(`${Url}/${id}/`);
    return res.data;
  };

  const criar = async (data: any): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.post(Url, data);
    return res.data;
  };

  const atualizar = async (id: number, data: any): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.put(`${Url}/${id}/`, data);
    return res.data;
  };

  const remover = async (id: number): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.delete(`${Url}/${id}/`);
    return res.data;
  };

  return { listar, detalhar, criar, atualizar, remover };
};
