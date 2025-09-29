'use client'
import React from 'react'
import AppShell from '@/components/AppShell'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import api from '@/lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Gasometro } from '@/types'
import Link from 'next/link'

export default function GasometrosPage() {
  const [q, setQ] = React.useState('')
  const [status, setStatus] = React.useState('')
  const qc = useQueryClient()

  const { data } = useQuery({
    queryKey: ['gasometros', q, status],
    queryFn: async () => {
      const { data } = await api.get('/gasometros/', { params: { search: q, status } })
      return data as Gasometro[]
    }
  })

  const del = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/gasometros/${id}/`)
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gasometros'] })
  })

  return (
    <AppShell>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Buscar" value={q} onChange={e => setQ(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField select fullWidth label="Status" value={status} onChange={e => setStatus(e.target.value)}>
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="ativo">Ativo</MenuItem>
            <MenuItem value="inativo">Inativo</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md="auto">
          <Button variant="contained" startIcon={<AddIcon />} component={Link} href="/gasometros/novo">
            Novo
          </Button>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Identificador</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Localização</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(data || []).map(g => (
                <TableRow key={g.id} hover>
                  <TableCell>{g.id}</TableCell>
                  <TableCell>
                    <Link href={`/gasometros/${g.id}`}>{g.identificador}</Link>
                  </TableCell>
                  <TableCell>{g.descricao}</TableCell>
                  <TableCell>{g.localizacao}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={g.status || '-'}
                      color={g.status === 'ativo' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="right" className="table-actions">
                    <Link href={`/gasometros/${g.id}/editar`} passHref>
                      <IconButton size="small" component="a">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Link>
                    <IconButton size="small" onClick={() => del.mutate(g.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  )
}
