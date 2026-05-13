import type { Metadata } from 'next'
import Checkout from '@/views/Checkout'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Thanh toán',
  description: 'Nhập thông tin giao hàng và hoàn tất đơn hàng Casio VN Store.',
  alternates: {
    canonical: '/checkout',
  },
}

export default function CheckoutPage() {
  return <Checkout />
}
