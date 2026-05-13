import type { Metadata } from 'next'
import ProductDetail from '@/views/ProductDetail'
import { initialProducts } from '@/data/products'

type Props = {
  params: Promise<{ id: string }>
}

export const revalidate = 3600

export function generateStaticParams() {
  return initialProducts.slice(0, 24).map((product) => ({ id: product.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = initialProducts.find((item) => item.id === id)

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm',
      description: 'Sản phẩm không tồn tại trong catalog Casio VN Store.',
    }
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/product/${product.id}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: 'website',
    },
  }
}

export default function ProductPage() {
  return <ProductDetail />
}
