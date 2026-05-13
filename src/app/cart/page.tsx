import type { Metadata } from 'next'
import Cart from '@/views/Cart'

export const metadata: Metadata = {
  title: 'Giỏ hàng',
  description: 'Xem và cập nhật giỏ hàng đồng hồ Casio trước khi thanh toán.',
  alternates: {
    canonical: '/cart',
  },
}

export default function CartPage() {
  return <Cart />
}
