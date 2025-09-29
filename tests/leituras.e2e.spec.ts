import { test, expect } from '@playwright/test'

test('Fluxo de Registro de Leitura', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Usuário').fill(process.env.GC_LOGIN_USERNAME || 'admin')
  await page.getByLabel('Senha').fill(process.env.GC_LOGIN_PASSWORD || 'admin123')
  await page.getByRole('button', { name: 'Entrar' }).click()
  await page.waitForURL('**/dashboard')

  await page.goto('/leituras')
  await expect(page.getByText('Registrar Leitura')).toBeVisible()

  // exige seleção de gasômetro
  // (Você pode criar fixtures/seed no backend para ter um gasômetro ID 1)
  await page.getByLabel('Gasômetro').selectOption({ index: 1 })
  await page.getByLabel('Data/Hora').fill(new Date().toISOString().slice(0,16))
  await page.getByLabel('Consumo').fill('12.34')
  await page.getByRole('button', { name: 'Registrar Leitura' }).click()

  // confirma algum feedback: a tabela deve atualizar (heurística simples)
  await expect(page.getByText('Histórico recente')).toBeVisible()
})
