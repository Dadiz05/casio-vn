import type { Order, Product, ProductCategory, ProductGender, ProductMovement, User } from '@/types'

export type ProductBrief = Pick<
  Product,
  | 'id'
  | 'sku'
  | 'name'
  | 'price'
  | 'originalPrice'
  | 'category'
  | 'description'
  | 'features'
  | 'rating'
  | 'reviews'
  | 'stock'
  | 'sold'
  | 'gender'
  | 'movement'
  | 'warrantyMonths'
  | 'tags'
> & {
  waterResistance?: string
  caseMaterial?: string
  strapMaterial?: string
}

export interface AiRecommendationRequest {
  query: string
  products: ProductBrief[]
}

export interface AiProductSuggestion {
  productId: string
  score: number
  reason: string
  bestFor: string
}

export interface AiRecommendationResult {
  answer: string
  querySummary: string
  suggestedProductIds: string[]
  suggestions: AiProductSuggestion[]
  followUpQuestions: string[]
  source: 'openai' | 'fallback'
}

export interface AiProductCopyRequest {
  product: {
    name: string
    category: ProductCategory
    price: string
    originalPrice?: string
    movement: ProductMovement
    gender: ProductGender
    stock: string
    warrantyMonths: string
    image?: string
    badge?: string
    existingDescription?: string
  }
}

export interface AiProductCopyResult {
  description: string
  fullDescription: string
  features: string[]
  tags: string[]
  badge: string
  seoTitle: string
  source: 'openai' | 'fallback'
}

export interface AiInsightRequest {
  products: ProductBrief[]
  orders: Order[]
  users: User[]
}

export interface AiInsightResult {
  summary: string
  actionItems: string[]
  risks: string[]
  opportunities: string[]
  inventoryAlerts: Array<{
    productId: string
    message: string
    priority: 'low' | 'medium' | 'high'
  }>
  source: 'openai' | 'fallback'
}
