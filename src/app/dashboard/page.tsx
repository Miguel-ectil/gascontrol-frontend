'use client'
import React from 'react'
import AppShell from '@/components/AppShell'
import { Grid, Card, CardContent, Typography, TextField, MenuItem } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { format } from 'date-fns'

export default function Dashboard() {
  const [period, setPeriod] = React.useState('30')
  const { data: kpis } = useQuery({
    queryKey: ['kpis', period],
    queryFn: async () => {
      // You can adapt to real endpoints
      const [g, r] = await Promise.all([
        api.get('/gasometros/summary', { params: { period: period }}).catch(() => ({ data: { total: 0, ativos: 0 }})),
        api.get('/leituras/summary', { params: { period: period }}).catch(() => ({ data: { total: 0, media_diaria: 0 }}))
      ])
      return {
        totalGasometros: g.data.total ?? 0,
        ativos: g.data.ativos ?? 0,
        leiturasPeriodo: r.data.total ?? 0,
        mediaDia: r.data.media_diaria ?? 0
      }
    }
  })
  const { data: series } = useQuery({
    queryKey: ['series', period],
    queryFn: async () => {
      const { data } = await api.get('/leituras/series', { params: { period: period } }).catch(() => ({ data: [] }))
      return data as { date: string, consumo: number }[]
    }
  })

  return (
    <AppShell>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="subtitle2">Total de Gasômetros</Typography>
            <Typography variant="h4">{kpis?.totalGasometros ?? '-'}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="subtitle2">Ativos</Typography>
            <Typography variant="h4">{kpis?.ativos ?? '-'}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="subtitle2">Leituras no período</Typography>
            <Typography variant="h4">{kpis?.leiturasPeriodo ?? '-'}</Typography>
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card><CardContent>
            <Typography variant="subtitle2">Média / dia</Typography>
            <Typography variant="h4">{kpis?.mediaDia ?? '-'}</Typography>
          </CardContent></Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Grid item><Typography variant="h6">Consumo</Typography></Grid>
            <Grid item>
              <TextField select size="small" label="Período" value={period} onChange={(e) => setPeriod(e.target.value)}>
                <MenuItem value="7">7 dias</MenuItem>
                <MenuItem value="30">30 dias</MenuItem>
                <MenuItem value="90">90 dias</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={series || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(v) => format(new Date(v), 'dd/MM')} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="consumo" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </AppShell>
  )
}
