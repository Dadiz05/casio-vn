export type ProductCategory = 'G-Shock' | 'Edifice' | 'Baby-G' | 'Classic'

export type ProductGender = 'Nam' | 'Nữ' | 'Unisex'

export type ProductMovement = 'Quartz' | 'Solar' | 'Bluetooth' | 'Automatic'

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

export interface ProductColorVariant {
  name: string
  value: string
  hex: string
  image?: string
}

export interface Product {
  id: string
  sku: string
  name: string
  price: number
  originalPrice?: number
  category: ProductCategory
  image: string
  images?: string[]
  description: string
  fullDescription?: string
  specs?: ProductSpecs
  features?: string[]
  rating: number
  reviews: number
  stock: number
  sold: number
  badge?: string
  isNew?: boolean
  isLimited?: boolean
  gender: ProductGender
  movement: ProductMovement
  warrantyMonths: number
  tags?: string[]
  colorVariants?: ProductColorVariant[]
}

export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status?: 'active' | 'inactive'
  phone?: string
  address?: string
  createdAt?: string
  updatedAt?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartSummary {
  subtotal: number
  discount: number
  shippingFee: number
  total: number
  itemCount: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled'

export type PaymentMethod = 'cod' | 'bank' | 'card'

export interface OrderLineItem {
  productId: string
  sku: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface ShippingInfo {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  note?: string
}

export interface Order {
  id: string
  customerId?: string
  customerName: string
  customerEmail: string
  shippingInfo: ShippingInfo
  items: OrderLineItem[]
  subtotal: number
  discount: number
  shippingFee: number
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  paymentStatus: 'unpaid' | 'paid'
  voucherCode?: string
  createdAt: string
  updatedAt?: string
}

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

export interface ProductFormInput {
  name: string
  price: string
  originalPrice: string
  category: ProductCategory
  image: string
  description: string
  fullDescription: string
  features: string
  tags: string
  stock: string
  movement: ProductMovement
  gender: ProductGender
  warrantyMonths: string
  badge: string
}
