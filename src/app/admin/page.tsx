import type { Metadata } from 'next'
import AdminDashboard from '@/views/admin/Dashboard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Dashboard quản trị doanh thu, đơn hàng, khách hàng và tồn kho.',
  alternates: {
    canonical: '/admin',
  },
}

export default function AdminPage() {
  return <AdminDashboard />
}
