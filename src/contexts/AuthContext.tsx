import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../lib/api/auth.service'
import type { ReactNode } from 'react'
import type { LoginResponse } from '../lib/api/types'

interface User {
  id: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  isLoading: boolean
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: true,
  })

  useEffect(() => {
    // Initialize auth state from localStorage on mount
    const initAuth = () => {
      const isAuthenticated = authService.isAuthenticated()
      const user = authService.getUser()

      setState({
        isAuthenticated,
        user,
        token: isAuthenticated ? localStorage.getItem('venus_auth_token') : null,
        isLoading: false,
      })
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response: LoginResponse = await authService.login(email, password)

      setState({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        isLoading: false,
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }))
      throw error
    }
  }

  const logout = () => {
    authService.logout()

    setState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
