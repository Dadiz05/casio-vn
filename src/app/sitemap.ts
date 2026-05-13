import type { MetadataRoute } from 'next'
import { initialProducts } from '@/data/products'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/shop',
    '/cart',
    '/login',
    '/register',
    '/shipping-policy',
    '/return-policy',
    '/warranty-policy',
    '/privacy-policy',
  ]

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...initialProducts.slice(0, 50).map((product) => ({
      url: `${siteUrl}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
    })),
  ]
}
