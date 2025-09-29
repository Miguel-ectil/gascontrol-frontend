export type Gasometro = {
  id: number
  identificador: string
  descricao?: string
  localizacao?: string
  status?: 'ativo' | 'inativo' | string
}
export type Leitura = {
  id: number
  gasometro: number
  data_leitura: string
  consumo: number
  observacao?: string
}
export type Alerta = {
  id: number
  tipo: string
  gasometro: number
  status: string
  mensagem: string
  criado_em: string
}
