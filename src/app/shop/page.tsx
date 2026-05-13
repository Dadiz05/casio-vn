import type { Metadata } from 'next'
import { Suspense } from 'react'
import Shop from '@/views/Shop'

export const metadata: Metadata = {
  title: 'Cửa hàng',
  description:
    'Tìm kiếm, lọc và phân trang các mẫu đồng hồ Casio G-Shock, Edifice, Baby-G và Classic.',
  alternates: {
    canonical: '/shop',
  },
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="casio-container py-16">Đang tải cửa hàng...</div>}>
      <Shop />
    </Suspense>
  )
}
