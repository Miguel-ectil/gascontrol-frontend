import { httpClient } from "../configs/axios";
import { AxiosResponse } from "axios";

const Url = "/api/alertas";

export const AlertService = () => {
  const listar = async (): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.get(Url);
    return res.data;
  };

  const atualizarStatus = async (id: number, status: string): Promise<any> => {
    const res: AxiosResponse<any> = await httpClient.patch(`${Url}/${id}/`, { status });
    return res.data;
  };

  return { listar, atualizarStatus };
};
