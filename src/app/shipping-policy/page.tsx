import type { Metadata } from 'next'
import ShippingPolicy from '@/views/ShippingPolicy'

export const metadata: Metadata = {
  title: 'Chính sách giao hàng',
  description: 'Thông tin giao hàng tại Casio VN Store.',
  alternates: {
    canonical: '/shipping-policy',
  },
}

export default function ShippingPolicyPage() {
  return <ShippingPolicy />
}
