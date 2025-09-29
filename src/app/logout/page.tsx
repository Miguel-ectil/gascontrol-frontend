'use client'
import React, { useEffect } from 'react'
import { logout } from '@/lib/auth'
import { CircularProgress, Box, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()
  useEffect(() => {
    logout()
    router.replace('/login')
  }, [router])
  return (
    <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <Box textAlign="center">
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Saindo...</Typography>
      </Box>
    </Box>
  )
}
