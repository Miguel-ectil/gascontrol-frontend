'use client'
import { cookies } from 'next/headers' // type only
import api from './api'

export async function login(username: string, password: string) {
  // Adjust to backend contract; expecting {access: string}
  const { data } = await api.post('/auth/login/', { username, password })
  const token = data.access || data.token
  if (!token) throw new Error('Token não retornado pela API')
  if (typeof window !== 'undefined') {
    localStorage.setItem('gc_token', token)
    // Set a cookie so middleware can guard routes
    document.cookie = `gc_token=${token}; Path=/; SameSite=Lax`
  }
  return token
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('gc_token')
    document.cookie = 'gc_token=; Max-Age=0; Path=/; SameSite=Lax'
  }
}
