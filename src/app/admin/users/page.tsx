import type { Metadata } from 'next'
import AdminUsers from '@/views/admin/Users'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Quản lý người dùng',
  description: 'Quản lý tài khoản và trạng thái người dùng.',
  alternates: {
    canonical: '/admin/users',
  },
}

export default function AdminUsersPage() {
  return <AdminUsers />
}
