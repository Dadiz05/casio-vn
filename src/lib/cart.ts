import type { CartItem, CartSummary } from '@/types'

export const VOUCHERS: Record<string, { minSubtotal: number; discount: number; label: string }> = {
  EXP001: { minSubtotal: 2_000_000, discount: 100_000, label: 'Giảm 100.000 ₫' },
  EXP002: { minSubtotal: 4_000_000, discount: 200_000, label: 'Giảm 200.000 ₫' },
  EXP003: { minSubtotal: 6_000_000, discount: 300_000, label: 'Giảm 300.000 ₫' },
}

export const FREE_SHIPPING_MIN = 2_000_000
export const DEFAULT_SHIPPING_FEE = 35_000

export const formatCurrency = (value: number) => `${value.toLocaleString('vi-VN')} ₫`

export const calculateCartSummary = (cart: CartItem[], voucherCode = ''): CartSummary => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const normalizedVoucher = voucherCode.trim().toUpperCase()
  const voucher = VOUCHERS[normalizedVoucher]
  const discount = voucher && subtotal >= voucher.minSubtotal ? voucher.discount : 0
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : DEFAULT_SHIPPING_FEE
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return {
    subtotal,
    discount,
    shippingFee,
    total: Math.max(0, subtotal - discount + shippingFee),
    itemCount,
  }
}
