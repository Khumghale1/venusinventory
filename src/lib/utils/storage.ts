const STORAGE_KEYS = {
  AUTH_TOKEN: 'venus_auth_token',
  USER: 'venus_user',
} as const

export const storage = {
  // Token management
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  },

  setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
  },

  removeToken(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
  },

  // User management
  getUser<T>(): T | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)
    if (!userStr) return null

    try {
      return JSON.parse(userStr) as T
    } catch {
      return null
    }
  },

  setUser<T>(user: T): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  removeUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER)
  },

  // Clear all auth data
  clearAuth(): void {
    this.removeToken()
    this.removeUser()
  },
}
