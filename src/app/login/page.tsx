'use client'
import React from 'react'
import { Box, Button, Card, CardContent, Stack, TextField, Typography, Alert } from '@mui/material'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const username = String(form.get('username') || '')
    const password = String(form.get('password') || '')
    try {
      setLoading(true)
      setError(null)
      await login(username, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Falha no login')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
      <Card sx={{ width: 380, maxWidth: '100%' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Entrar</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              <TextField name="username" label="Usuário" required fullWidth />
              <TextField name="password" label="Senha" type="password" required fullWidth />
              <Button variant="contained" type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
