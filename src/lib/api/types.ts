// API Error types
export interface ApiError {
  message: string
  status?: number
  errors?: Record<string, Array<string>>
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T
  message?: string
}

// Request configuration
export interface RequestConfig extends RequestInit {
  timeout?: number
}

// Auth types
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
  }
}

// Inventory types
export interface InventoryItem {
  id: string
  name: string
  description?: string
  category?: string
  currentStock: number
  createdAt: string
  updatedAt: string
}

export interface CreateInventoryItemRequest {
  name: string
  description?: string
  category?: string
  initialStock?: number
}

export interface UpdateInventoryItemRequest {
  name?: string
  description?: string
  category?: string
}

// Stock addition types
export interface StockAddition {
  id: string
  itemId: string
  vendor: string
  price: number
  quantity: number
  date: string
  remarks?: string
  createdAt: string
}

export interface CreateStockAdditionRequest {
  itemId: string
  vendor: string
  price: number
  quantity: number
  date: string
  remarks?: string
}

// Stock subtraction types
export interface StockSubtraction {
  id: string
  itemId: string
  vendor: string
  price: number
  quantity: number
  date: string
  remarks?: string
  createdAt: string
}

export interface CreateStockSubtractionRequest {
  itemId: string
  vendor: string
  price: number
  quantity: number
  date: string
  remarks?: string
}
