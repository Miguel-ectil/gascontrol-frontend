'use client'
import React from 'react'
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItemButton, ListItemText, IconButton, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/gasometros', label: 'Gasômetros' },
  { href: '/leituras', label: 'Leituras' },
  { href: '/alertas', label: 'Alertas' }
]

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => setOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flex: 1 }}>GasControl</Typography>
          <Link href="/logout">Sair</Link>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280 }} role="presentation" onClick={() => setOpen(false)}>
          <Typography variant="h6" sx={{ p: 2 }}>Menu</Typography>
          <Divider />
          <List>
            {items.map((it) => (
              <ListItemButton key={it.href} component={Link} href={it.href} selected={pathname.startsWith(it.href)}>
                <ListItemText primary={it.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
