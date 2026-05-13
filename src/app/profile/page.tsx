import type { Metadata } from 'next'
import Profile from '@/views/Profile'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tài khoản',
  description: 'Quản lý hồ sơ, đơn hàng và wishlist của người dùng.',
  alternates: {
    canonical: '/profile',
  },
}

export default function ProfilePage() {
  return <Profile />
}
