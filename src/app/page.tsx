import type { Metadata } from 'next'
import Home from '@/views/Home'

export const metadata: Metadata = {
  title: 'Trang chủ',
  description:
    'Casio VN Store - cửa hàng đồng hồ Casio chính hãng với catalog, giỏ hàng và quản trị demo.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return <Home />
}
