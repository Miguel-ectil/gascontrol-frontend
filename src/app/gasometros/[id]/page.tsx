'use client'
import React from 'react'
import AppShell from '@/components/AppShell'
import api from '@/lib/api'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, Typography, Stack, Chip } from '@mui/material'

export default function GasometroDetail() {
  const params = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: ['gasometro', params.id],
    queryFn: async () => (await api.get(`/gasometros/${params.id}/`)).data
  })
  return (
    <AppShell>
      <Card><CardContent>
        <Typography variant="h5">{data?.identificador}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Chip label={data?.status || '—'} color={data?.status === 'ativo' ? 'success' : 'default'} />
        </Stack>
        <Typography sx={{ mt: 2 }}><b>Descrição:</b> {data?.descricao || '—'}</Typography>
        <Typography><b>Localização:</b> {data?.localizacao || '—'}</Typography>
      </CardContent></Card>
    </AppShell>
  )
}
