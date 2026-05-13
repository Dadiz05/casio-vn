'use client'

import { useMemo, type MouseEvent } from 'react'
import { Link } from '@/lib/navigation'
import Image from 'next/image'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useStore } from '@/store/useStore'
import type { Product } from '@/types'

type Props = {
  product: Product
}

const formatPrice = (price: number) => `${price.toLocaleString('vi-VN')} ₫`

export default function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, wishlistIds } = useStore()
  const isWishlisted = wishlistIds.includes(product.id)
  const hasDiscount =
    typeof product.originalPrice === 'number' && product.originalPrice > product.price
  const isInlineImage = product.image.startsWith('data:') || product.image.startsWith('blob:')
  const stockPercent = useMemo(() => {
    const baseline = Math.max(product.stock + product.sold, 1)
    return Math.max(8, Math.min(100, (product.stock / baseline) * 100))
  }, [product.sold, product.stock])

  const handleWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    toggleWishlist(product.id)
  }

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addToCart(product)
  }

  return (
    <article className="product-card group site-card overflow-hidden h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f3f4f6)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized={isInlineImage}
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.06]"
            loading="lazy"
          />

          <div className="absolute left-4 top-4 flex flex-col gap-2">
            <span className="site-chip bg-white/95 text-[var(--color-text-primary)] shadow-sm">
              {product.category}
            </span>
            {product.badge && (
              <span className="inline-flex w-fit rounded-full bg-[var(--color-surface-raised)] px-3 py-1 text-xs font-bold text-white shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleWishlist}
            aria-pressed={isWishlisted}
            aria-label={isWishlisted ? 'Bỏ yêu thích sản phẩm' : 'Yêu thích sản phẩm'}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white/95 text-[var(--color-text-primary)] shadow-sm transition-all hover:bg-[rgba(221,51,51,0.08)] active:scale-95"
          >
            <Heart
              size={20}
              className={`transition-colors ${
                isWishlisted
                  ? 'fill-[var(--color-surface-raised)] text-[var(--color-surface-raised)]'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            />
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3 text-sm">
          <span className="inline-flex items-center gap-1 text-amber-600">
            <Star size={15} className="fill-current" />
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[var(--color-text-secondary)]">Đã bán {product.sold}</span>
        </div>

        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="site-title text-lg sm:text-xl mb-2 line-clamp-2 group-hover:text-[var(--color-surface-raised)] transition-colors">
            {product.name}
          </h3>

          <p className="site-copy text-sm mb-5 line-clamp-2">{product.description}</p>
        </Link>

        <div className="mt-auto space-y-4 border-t border-[var(--color-border-strong)] pt-4">
          <div>
            {hasDiscount && (
              <p className="mb-1 text-sm text-[var(--color-text-secondary)] line-through">
                {formatPrice(product.originalPrice ?? product.price)}
              </p>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-[var(--color-surface-base)]">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-[var(--color-text-secondary)]">
              <span>Còn {product.stock}</span>
              <span>{product.movement}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(16,4,4,0.08)]">
              <div
                className="h-full rounded-full bg-[var(--color-surface-raised)] transition-all"
                style={{ width: `${stockPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="site-button site-button--primary w-full"
          >
            <ShoppingCart size={18} />
            {product.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
          </button>
        </div>
      </div>
    </article>
  )
}
