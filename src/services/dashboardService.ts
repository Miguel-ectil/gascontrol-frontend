import { httpClient } from "../configs/axios";
import { AxiosResponse } from "axios";

export const DashboardServices = () => {
  const obterGasometros = async (): Promise<number> => {
    const res: AxiosResponse<any[]> = await httpClient.get("/api/gasometros/");
    return res.data.length;
  };

  const obterLeituras30Dias = async (): Promise<any[]> => {
    const hoje = new Date();
    const dataInicio = new Date();
    dataInicio.setDate(hoje.getDate() - 30);

    const res: AxiosResponse<any[]> = await httpClient.get(
      `/api/leituras/?data_inicio=${dataInicio.toISOString()}&data_fim=${hoje.toISOString()}`
    );
    return res.data;
  };

  const obterAlertasAtivos = async (): Promise<number> => {
    const res: AxiosResponse<any[]> = await httpClient.get("/api/alertas/");
    return res.data.filter(a => a.status !== "resolvido").length;
  };

  const obterConsumoPorDia = async (): Promise<any[]> => {
    const res: AxiosResponse<any[]> = await httpClient.get("/api/relatorios/consumo_condominio/");
    return res.data; // verificar formato no Swagger
  };

  return { obterGasometros, obterLeituras30Dias, obterAlertasAtivos, obterConsumoPorDia };
};
