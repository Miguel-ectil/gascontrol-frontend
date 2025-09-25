import { AxiosResponse } from "axios";
import { httpClient } from "../configs/axios";

const Url = "/api/leituras";

export const LeituraService = () => {
  // Listar todas as leituras
  const listar = async (): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.get(Url);
    return res.data;
  };

  // Criar nova leitura
  const criar = async (data: any): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.post(Url, data);
    return res.data;
  };

  // Detalhar uma leitura pelo ID
  const detalhar = async (id: number): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.get(`${Url}/${id}/`);
    return res.data;
  };

  // Atualizar uma leitura
  const atualizar = async (id: number, data: any): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.put(`${Url}/${id}/`, data);
    return res.data;
  };

  // Remover uma leitura
  const remover = async (id: number): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.delete(`${Url}/${id}/`);
    return res.data;
  };

  return { listar, criar, detalhar, atualizar, remover };
};
