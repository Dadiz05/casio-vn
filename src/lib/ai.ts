import type {
  AiInsightRequest,
  AiInsightResult,
  AiProductCopyRequest,
  AiProductCopyResult,
  AiRecommendationRequest,
  AiRecommendationResult,
  ProductBrief,
} from '@/types/ai'
import type { Product } from '@/types'

const postJson = async <TResponse>(url: string, body: unknown): Promise<TResponse> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with ${response.status}`)
  }

  return response.json() as Promise<TResponse>
}

export const toProductBrief = (product: Product): ProductBrief => ({
  id: product.id,
  sku: product.sku,
  name: product.name,
  price: product.price,
  originalPrice: product.originalPrice,
  category: product.category,
  description: product.description,
  features: product.features,
  rating: product.rating,
  reviews: product.reviews,
  stock: product.stock,
  sold: product.sold,
  gender: product.gender,
  movement: product.movement,
  warrantyMonths: product.warrantyMonths,
  tags: product.tags,
  waterResistance: product.specs?.waterResistance,
  caseMaterial: product.specs?.caseMaterial,
  strapMaterial: product.specs?.strapMaterial,
})

export const requestAiRecommendation = (payload: AiRecommendationRequest) =>
  postJson<AiRecommendationResult>('/api/ai/recommend', payload)

export const requestAiProductCopy = (payload: AiProductCopyRequest) =>
  postJson<AiProductCopyResult>('/api/ai/product-copy', payload)

export const requestAiInsights = (payload: AiInsightRequest) =>
  postJson<AiInsightResult>('/api/ai/insights', payload)
