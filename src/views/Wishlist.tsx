'use client'

import { Link } from '@/lib/navigation'
import { ArrowRight, Heart, ShoppingCart, Trash2 } from 'lucide-react'
import ProductCard from '@/features/products/components/ProductCard'
import { useStore } from '@/store/useStore'
import { formatCurrency } from '@/lib/cart'

export default function Wishlist() {
  const { products, wishlistIds, toggleWishlist, addToCart, clearWishlist } = useStore()
  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id))

  return (
    <div className="casio-container casio-section page-fade py-10">
      <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <span className="site-kicker">
            <Heart size={16} />
            Bộ sưu tập cá nhân
          </span>
          <h1 className="site-title mt-3 text-3xl sm:text-5xl">Sản phẩm yêu thích</h1>
          <p className="site-copy mt-3 max-w-2xl">
            Lưu lại các mẫu Casio bạn đang cân nhắc, so sánh nhanh và thêm vào giỏ khi đã sẵn sàng.
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button onClick={clearWishlist} className="site-button site-button--ghost">
            <Trash2 size={18} />
            Xóa danh sách
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty__icon">
            <Heart size={34} />
          </div>
          <h2 className="site-title text-3xl">Chưa có sản phẩm yêu thích</h2>
          <p className="site-copy mx-auto mt-3 max-w-lg">
            Khi gặp mẫu đồng hồ phù hợp, bấm biểu tượng trái tim để lưu vào trang này.
          </p>
          <Link to="/shop" className="site-button site-button--primary mt-6">
            Khám phá cửa hàng
            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 grid gap-3 md:grid-cols-3">
            <div className="wishlist-summary-card">
              <span>Đã lưu</span>
              <strong>{wishlistProducts.length}</strong>
            </div>
            <div className="wishlist-summary-card">
              <span>Còn hàng</span>
              <strong>{wishlistProducts.filter((product) => product.stock > 0).length}</strong>
            </div>
            <div className="wishlist-summary-card">
              <span>Giá thấp nhất</span>
              <strong>
                {formatCurrency(Math.min(...wishlistProducts.map((product) => product.price)))}
              </strong>
            </div>
          </div>

          <div className="mb-10 grid gap-3">
            {wishlistProducts.slice(0, 4).map((product) => (
              <div key={product.id} className="wishlist-row">
                <img src={product.image} alt={product.name} className="wishlist-row__image" />
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/product/${product.id}`}
                    className="line-clamp-1 font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-surface-raised)]"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {product.category} • {product.sku} • {formatCurrency(product.price)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                    className="site-button site-button--primary min-h-10 px-4 py-2"
                  >
                    <ShoppingCart size={16} />
                    <span className="hidden sm:inline">Thêm giỏ</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="site-button site-button--ghost min-h-10 px-3 py-2"
                    aria-label={`Bỏ yêu thích ${product.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
