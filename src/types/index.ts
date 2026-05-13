// Product Types
export interface ProductSpecs {
  size: string
  weight: string
  caseMaterial: string
  strapMaterial: string
  structure: string
  waterResistance: string
  batteryLife: string
  glass: string
  strapSize: string
  other: string
}

export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  images?: string[]
  description: string
  fullDescription?: string
  specs?: ProductSpecs
  features?: string[]
  rating?: number
  reviews?: number
}

// User Types
export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status?: 'active' | 'inactive'
  createdAt?: string
  updatedAt?: string
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

// Order Types
export type OrderStatus = 'pending' | 'completed' | 'cancelled'

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  items: CartItem[]
  total: number
  status: OrderStatus
  createdAt: string
  updatedAt?: string
}

// Auth Types
export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// Store Types
export interface AppStore {
  // Auth
  user: User | null
  setUser: (userData: User) => void
  logout: () => void

  // Products
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void

  // Users
  users: User[]
  addUser: (user: User) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void

  // Orders
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void

  // Cart
  cart: Cart
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}
