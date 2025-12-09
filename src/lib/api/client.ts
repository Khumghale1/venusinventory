import type { ApiError, RequestConfig } from './types'

class ApiClient {
  private baseURL: string
  private timeout: number

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL 
    this.timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 30000
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('venus_auth_token')
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestConfig
  ): Promise<Response> {
    const { timeout = this.timeout, ...fetchOptions } = options

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw this.createError('Request timeout', 408)
      }
      throw error
    }
  }

  private createError(message: string, status?: number): ApiError {
    return {
      message,
      status,
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')

    if (!response.ok) {
      if (response.status === 401) {
        // Clear auth state on unauthorized
        localStorage.removeItem('venus_auth_token')
        localStorage.removeItem('venus_user')
        window.location.href = '/'
      }

      let errorMessage = `Request failed with status ${response.status}`

      if (isJson) {
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Failed to parse error JSON
        }
      }

      throw this.createError(errorMessage, response.status)
    }

    if (isJson) {
      return response.json()
    }

    return response.text() as Promise<T>
  }

  async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(config.headers as Record<string, string>),
    }

    const token = this.getAuthToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const options: RequestConfig = {
      ...config,
      headers,
    }

    try {
      const response = await this.fetchWithTimeout(url, options)
      return this.handleResponse<T>(response)
    } catch (error) {
      if (error instanceof Error) {
        if ((error as ApiError).status !== undefined) {
          throw error
        }
        throw this.createError(error.message)
      }
      throw this.createError('An unexpected error occurred')
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
