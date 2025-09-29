'use client'
import React from 'react'
import AppShell from '@/components/AppShell'
import { Card, CardContent, Grid, Stack, TextField, Button, Alert, MenuItem, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '@/lib/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { downloadCSV } from '@/utils/csv'
import { isAnomalous } from '@/utils/anomaly'

const schema = z.object({
  gasometro: z.coerce.number().int().positive(),
  data_leitura: z.string(),
  consumo: z.coerce.number().refine(v => v >= 0, 'Valor não pode ser negativo'),
  observacao: z.string().optional()
})

type FormValues = z.infer<typeof schema>

export default function LeiturasPage() {
  const { data: gasometros } = useQuery({ queryKey: ['gasometros-all'], queryFn: async () => (await api.get('/gasometros/')).data })
  const [alerta, setAlerta] = React.useState<string | null>(null)
  const qc = useQueryClient()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, watch } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const { data: historico } = useQuery({
    queryKey: ['leituras-historico', watch('gasometro')],
    queryFn: async () => {
      const gid = watch('gasometro')
      if (!gid) return []
      const { data } = await api.get('/leituras/', { params: { gasometro: gid, ordering: '-data_leitura', limit: 20 } })
      return data?.results || data || []
    },
    enabled: !!watch('gasometro')
  })

  const mut = useMutation({
    mutationFn: async (payload: FormValues) => {
      const now = new Date(payload.data_leitura)
      if (now.getTime() > Date.now()) throw new Error('Data futura não é permitida')
      // anomaly check (avg of last N)
      const last = (historico || []).slice(0, 5).map((r: any) => Number(r.consumo))
      if (isAnomalous(Number(payload.consumo), last, 200)) {
        setAlerta('Consumo acima de 200% da média das últimas leituras deste medidor.')
      } else {
        setAlerta(null)
      }
      return (await api.post('/leituras/', payload)).data
    },
    onSuccess: () => {
      reset()
      qc.invalidateQueries({ queryKey: ['leituras-historico'] })
    }
  })

  const onSubmit = (data: FormValues) => mut.mutate(data)

  return (
    <AppShell>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Card><CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {alerta && <Alert severity="warning">{alerta}</Alert>}
                <TextField select label="Gasômetro" {...register('gasometro')} required>
                  <option value="" hidden></option>
                  {(gasometros || []).map((g: any) => (
                    <MenuItem key={g.id} value={g.id}>{g.identificador}</MenuItem>
                  ))}
                </TextField>
                <TextField type="datetime-local" label="Data/Hora" InputLabelProps={{ shrink: true }} {...register('data_leitura')} required />
                <TextField type="number" label="Consumo" inputProps={{ step: '0.01', min: 0 }} {...register('consumo')} required />
                {errors.consumo && <Alert severity="error">{errors.consumo.message}</Alert>}
                <TextField label="Observação" {...register('observacao')} />
                <Button type="submit" variant="contained" disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Registrar Leitura'}</Button>
              </Stack>
            </form>
          </CardContent></Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card><CardContent>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
              <strong>Histórico recente</strong>
              <Button size="small" onClick={() => downloadCSV('leituras.csv', historico || [])}>Exportar CSV</Button>
            </Stack>
            <Table size="small">
              <TableHead><TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Gasômetro</TableCell>
                <TableCell>Consumo</TableCell>
                <TableCell>Obs.</TableCell>
              </TableRow></TableHead>
              <TableBody>
                {(historico || []).map((r: any) => (
                  <TableRow key={r.id}>
                    <TableCell>{new Date(r.data_leitura).toLocaleString()}</TableCell>
                    <TableCell>{r.gasometro}</TableCell>
                    <TableCell>{r.consumo}</TableCell>
                    <TableCell>{r.observacao || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </Grid>
      </Grid>
    </AppShell>
  )
}
