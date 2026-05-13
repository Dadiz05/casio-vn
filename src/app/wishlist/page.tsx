import type { Metadata } from 'next'
import Wishlist from '@/views/Wishlist'

export const metadata: Metadata = {
  title: 'Yêu thích',
  description: 'Danh sách đồng hồ Casio yêu thích của người dùng.',
  alternates: {
    canonical: '/wishlist',
  },
}

export default function WishlistPage() {
  return <Wishlist />
}
