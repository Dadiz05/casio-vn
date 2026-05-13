'use client'

import { Link } from '@/lib/navigation'
import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import { FREE_SHIPPING_MIN, calculateCartSummary, formatCurrency } from '@/lib/cart'

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const summary = calculateCartSummary(cart)
  const freeShippingProgress = Math.min(100, (summary.subtotal / FREE_SHIPPING_MIN) * 100)

  if (cart.length === 0) {
    return (
      <div className="casio-container casio-section py-16 text-center max-w-4xl">
        <div className="text-7xl mb-6">🛍️</div>
        <span className="site-kicker justify-center mb-3">Giỏ hàng</span>
        <h2 className="site-title text-3xl sm:text-4xl mb-4">Giỏ hàng trống</h2>
        <p className="site-copy mb-10">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
        <Link to="/shop" className="site-button site-button--primary">
          <ArrowLeft size={20} />
          Tiếp tục mua sắm
        </Link>
      </div>
    )
  }

  return (
    <div className="casio-container casio-section py-12 page-fade">
      <div className="mb-8">
        <span className="site-kicker">Thanh toán</span>
        <h1 className="site-title text-3xl sm:text-4xl mt-2">Giỏ hàng của bạn</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="site-card overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 p-5 sm:p-6 border-b border-[var(--color-border-strong)] last:border-none"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl bg-[linear-gradient(180deg,#fff,#f4f4f4)] p-2 border border-[var(--color-border-strong)]"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                  <p className="site-copy text-sm">{item.category}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-[var(--color-border-strong)] rounded-full overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-4 py-2 hover:bg-[rgba(16,4,4,0.04)] transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-5 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-4 py-2 hover:bg-[rgba(16,4,4,0.04)] transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg sm:text-xl text-[var(--color-surface-raised)]">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-[var(--color-surface-raised)] hover:text-[var(--color-surface-base)] p-2"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-6 site-button site-button--ghost text-[var(--color-surface-raised)]"
          >
            <Trash2 size={18} />
            Xóa toàn bộ giỏ hàng
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="site-card p-6 sm:p-8 sticky top-24">
            <h3 className="text-2xl font-semibold mb-6">Tổng tiền</h3>
            <div className="mb-6 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.03)] p-4">
              <div className="mb-2 flex justify-between text-sm text-[var(--color-text-secondary)]">
                <span>Miễn phí vận chuyển từ {formatCurrency(FREE_SHIPPING_MIN)}</span>
                <span>{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[var(--color-surface-raised)] transition-all"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-lg mb-6">
              <span>Tạm tính:</span>
              <span className="font-bold text-[var(--color-text-primary)]">
                {formatCurrency(summary.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-lg mb-6">
              <span>Phí vận chuyển:</span>
              <span className="font-bold text-[var(--color-text-primary)]">
                {summary.shippingFee === 0 ? 'Miễn phí' : formatCurrency(summary.shippingFee)}
              </span>
            </div>

            <div className="site-divider my-6"></div>

            <div className="flex justify-between text-xl font-bold mb-8">
              <span>Tổng cộng:</span>
              <span className="text-[var(--color-surface-raised)]">
                {formatCurrency(summary.total)}
              </span>
            </div>

            <Link to="/checkout" className="site-button site-button--primary w-full">
              Tiến hành thanh toán
            </Link>

            <Link
              to="/shop"
              className="block text-center mt-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
