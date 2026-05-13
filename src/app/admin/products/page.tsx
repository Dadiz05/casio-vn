import type { Metadata } from 'next'
import AdminProducts from '@/views/admin/Products'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Quản lý sản phẩm',
  description: 'Thêm, sửa, xóa và tìm kiếm sản phẩm Casio.',
  alternates: {
    canonical: '/admin/products',
  },
}

export default function AdminProductsPage() {
  return <AdminProducts />
}
