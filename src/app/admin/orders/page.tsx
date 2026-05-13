import type { Metadata } from 'next'
import AdminOrders from '@/views/admin/Orders'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Quản lý đơn hàng',
  description: 'Theo dõi và cập nhật trạng thái đơn hàng.',
  alternates: {
    canonical: '/admin/orders',
  },
}

export default function AdminOrdersPage() {
  return <AdminOrders />
}
