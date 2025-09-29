# GasControl Frontend (Next.js + MUI)

SPA para **cadastrar gasômetros**, **registrar leituras** e **visualizar históricos/alertas**.
Atende aos fluxos principais descritos no enunciado do desafio. Telas: login, dashboard (KPIs + gráfico), gasômetros (CRUD), leituras (registro + histórico + CSV), alertas (lista + troca de status).

## Requisitos
- Node 18+
- Backend GasControl rodando localmente (veja repo backend). Configure `NEXT_PUBLIC_API_BASE_URL`.

## Rodando
```bash
cp .env.example .env
pnpm i # ou npm i / yarn
pnpm dev
```
Acesse http://localhost:3000

## Scripts
- `dev`, `build`, `start`
- `lint`
- `test` (Vitest)
- `e2e` (Playwright)

## Configuração
- `.env`:
  - `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api`
  - `GC_LOGIN_USERNAME`, `GC_LOGIN_PASSWORD` (para E2E)

## Integração com a API
- Axios com interceptors em `src/lib/api.ts` adiciona `Authorization: Bearer <token>` de `localStorage`.
- Login em `src/lib/auth.ts` **ajuste a rota** conforme backend (`/auth/login/`). Ao logar, token é salvo em `localStorage` e cookie `gc_token` (proteção de rotas via `middleware.ts`).

## Validações de Leituras
- Negativos bloqueados.
- Decimais aceitos.
- Data futura bloqueada.
- Anomalia: > 200% da média das últimas N leituras (config em `utils/anomaly.ts`).

## Gráficos
- Recharts (linha) no Dashboard; séries vindas de `/leituras/series?period=...` (ajuste ao seu backend).

## CSV
- Exportação client-side em `utils/csv.ts` na página de Leituras.

## Testes
- **E2E** `tests/leituras.e2e.spec.ts`: fluxo de login + registro de leitura.
- **Unit**: `utils/anomaly.test.ts` e `leituras/validation.test.ts`.

## Acessibilidade
- Campos com `label`, botões com `name`, foco padrão dos componentes MUI.

## Observações
- Endpoints/contratos foram **assumidos** com base no enunciado; ajuste nomes/rotas conforme o backend real.
- Para paginação/ordenacão de listas, adapte os parâmetros conforme a API.
- Sinta-se à vontade para trocar estado global (usa React Query) por Redux/Zustand se preferir.
