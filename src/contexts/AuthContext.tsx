import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authService } from '../services/authService'
import type { AuthUser } from '../types'

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const authUser = await authService.getAuthUser()
      setUser(authUser)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    // Initial load
    authService.getAuthUser().then(u => {
      setUser(u)
      setLoading(false)
    }).catch(() => {
      setUser(null)
      setLoading(false)
    })

    // Listen to auth changes
    const { data: { subscription } } = authService.onAuthStateChange(async (authUser) => {
      setUser(authUser)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    await authService.signIn(email, password)
    await refreshUser()
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function useRequireAuth(requiredRole?: string) {
  const { user, loading } = useAuth()
  return { user, loading, authorized: !loading && user !== null && (!requiredRole || user.role === requiredRole) }
}
