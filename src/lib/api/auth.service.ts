import { storage } from '../utils/storage'
import { apiClient } from './client'
import type { LoginRequest, LoginResponse } from './types'

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', {
      email,
      password,
    } as LoginRequest)

    // Store token and user data
    storage.setToken(response.token)
    storage.setUser(response.user)

    return response
  },

  logout(): void {
    storage.clearAuth()
  },

  isAuthenticated(): boolean {
    return storage.getToken() !== null
  },

  getUser() {
    return storage.getUser<LoginResponse['user']>()
  },
}
