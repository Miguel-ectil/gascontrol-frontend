'use client'
// import type { Metadata } from 'next'
import React from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRouterCacheProvider } from '@/lib/AppRouterCacheProvider' // ✅ correto
import './globals.css'

// export const metadata: Metadata = {
//   title: 'GasControl',
//   description: 'Gestão de gasômetros e leituras'
// }

const theme = createTheme({ palette: { mode: 'light' } })
const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <AppRouterCacheProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
