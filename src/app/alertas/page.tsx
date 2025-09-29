'use client'
import React from 'react'
import AppShell from '@/components/AppShell'
import { Card, CardContent, Grid, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import api from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export default function AlertasPage() {
  const [status, setStatus] = React.useState('')
  const qc = useQueryClient()
  const { data } = useQuery({
    queryKey: ['alertas', status],
    queryFn: async () => (await api.get('/alertas/', { params: { status } })).data
  })

  const mut = useMutation({
    mutationFn: async ({ id, status }: { id: number, status: string }) => {
      return (await api.patch(`/alertas/${id}/`, { status })).data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alertas'] })
  })

  return (
    <AppShell>
      <Card><CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Select fullWidth value={status} onChange={(e)=>setStatus(String(e.target.value))} displayEmpty>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="novo">Novo</MenuItem>
              <MenuItem value="em_analise">Em análise</MenuItem>
              <MenuItem value="resolvido">Resolvido</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Table size="small" style={{ marginTop: 16 }}>
          <TableHead><TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Gasômetro</TableCell>
            <TableCell>Status</TableCell>
          </TableRow></TableHead>
          <TableBody>
            {(data || []).map((a: any) => (
              <TableRow key={a.id}>
                <TableCell>{a.id}</TableCell>
                <TableCell>{a.tipo}</TableCell>
                <TableCell>{a.gasometro}</TableCell>
                <TableCell>
                  <Select size="small" value={a.status} onChange={(e)=>mut.mutate({ id: a.id, status: String(e.target.value) })}>
                    <MenuItem value="novo">Novo</MenuItem>
                    <MenuItem value="em_analise">Em análise</MenuItem>
                    <MenuItem value="resolvido">Resolvido</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </AppShell>
  )
}
