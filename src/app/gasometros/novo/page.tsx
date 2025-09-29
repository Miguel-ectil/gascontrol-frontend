'use client'
import React from 'react'
import AppShell from '@/components/AppShell'
import { Card, CardContent, Stack, TextField, Button, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export default function NovoGasometro() {
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    await api.post('/gasometros/', Object.fromEntries(fd as any))
    router.push('/gasometros')
  }
  return (
    <AppShell>
      <Card><CardContent>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField name="identificador" label="Identificador" required />
            <TextField name="descricao" label="Descrição" />
            <TextField name="localizacao" label="Localização" />
            <TextField select name="status" label="Status" defaultValue="ativo">
              <MenuItem value="ativo">Ativo</MenuItem>
              <MenuItem value="inativo">Inativo</MenuItem>
            </TextField>
            <Button variant="contained" type="submit">Salvar</Button>
          </Stack>
        </form>
      </CardContent></Card>
    </AppShell>
  )
}
