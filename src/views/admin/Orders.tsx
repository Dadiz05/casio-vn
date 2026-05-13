'use client'

import { useMemo, useState, type ChangeEvent } from 'react'
import { Eye, PackageCheck, Search, XCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/cart'
import { useStore } from '@/store/useStore'
import type { Order, OrderStatus } from '@/types'

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
}

const statusClasses: Record<OrderStatus, string> = {
  pending: 'bg-[rgba(245,158,11,0.16)] text-amber-700',
  confirmed: 'bg-[rgba(59,130,246,0.14)] text-blue-700',
  shipping: 'bg-[rgba(14,165,233,0.15)] text-sky-700',
  completed: 'bg-[rgba(34,197,94,0.15)] text-green-700',
  cancelled: 'bg-[rgba(221,51,51,0.14)] text-[var(--color-surface-raised)]',
}

const statuses: OrderStatus[] = ['pending', 'confirmed', 'shipping', 'completed', 'cancelled']

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const matchesQuery =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query)

      return matchesStatus && matchesQuery
    })
  }, [orders, searchQuery, statusFilter])

  const revenue = orders
    .filter((order) => order.status === 'completed')
    .reduce((sum, order) => sum + order.total, 0)

  const handleStatusFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value as OrderStatus | 'all')
  }

  return (
    <div className="casio-container casio-section py-10 page-fade">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="site-kicker">Admin orders</span>
          <h1 className="site-title mt-2 text-3xl sm:text-4xl">Quản lý đơn hàng</h1>
          <p className="site-copy mt-2">Theo dõi xác nhận, giao hàng và thanh toán.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="site-chip justify-center">
            Tổng đơn:{' '}
            <span className="font-semibold text-[var(--color-text-primary)]">{orders.length}</span>
          </div>
          <div className="site-chip justify-center">
            Doanh thu:{' '}
            <span className="font-semibold text-[var(--color-text-primary)]">
              {formatCurrency(revenue)}
            </span>
          </div>
        </div>
      </div>

      <div className="site-card mb-8 grid gap-3 p-4 sm:grid-cols-[1fr_220px] sm:p-5">
        <label className="flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white px-4">
          <Search size={18} className="text-[var(--color-text-secondary)]" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Tìm mã đơn, khách hàng hoặc email"
            className="min-h-12 flex-1 bg-transparent outline-none"
          />
        </label>
        <select value={statusFilter} onChange={handleStatusFilterChange} className="site-select">
          <option value="all">Tất cả trạng thái</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="site-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="border-b border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.04)]">
              <tr>
                <th className="p-5 text-left font-semibold">Mã đơn</th>
                <th className="p-5 text-left font-semibold">Khách hàng</th>
                <th className="p-5 text-left font-semibold">Ngày đặt</th>
                <th className="p-5 text-right font-semibold">Tổng tiền</th>
                <th className="p-5 text-center font-semibold">Trạng thái</th>
                <th className="p-5 text-center font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-[var(--color-border-strong)] transition hover:bg-[rgba(16,4,4,0.02)]"
                >
                  <td className="p-5 font-mono font-medium">{order.id}</td>
                  <td className="p-5">
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {order.customerEmail}
                    </p>
                  </td>
                  <td className="p-5 text-[var(--color-text-secondary)]">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="p-5 text-right font-semibold">{formatCurrency(order.total)}</td>
                  <td className="p-5 text-center">
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(order.id, event.target.value as OrderStatus)
                      }
                      className={`rounded-full border-none px-3 py-1 text-sm font-medium ${statusClasses[order.status]}`}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {statusLabels[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="site-button site-button--ghost min-h-10 px-3 py-2"
                        title="Xem chi tiết"
                      >
                        <Eye size={16} />
                      </button>
                      {order.status !== 'completed' && order.status !== 'cancelled' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="site-button site-button--ghost min-h-10 px-3 py-2 text-green-700"
                          title="Hoàn thành"
                        >
                          <PackageCheck size={16} />
                        </button>
                      )}
                      {order.status !== 'cancelled' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="site-button site-button--ghost min-h-10 px-3 py-2 text-[var(--color-surface-raised)]"
                          title="Hủy"
                        >
                          <XCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="site-card max-h-[90vh] w-full max-w-2xl overflow-y-auto">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border-strong)] p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                  Chi tiết đơn hàng
                </h2>
                <p className="site-copy">Mã đơn: {selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="site-button site-button--ghost min-h-10 px-3 py-2"
                aria-label="Đóng chi tiết đơn hàng"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Khách hàng</p>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">Liên hệ</p>
                  <p className="font-medium">{selectedOrder.shippingInfo.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-[var(--color-text-secondary)]">Địa chỉ</p>
                  <p className="font-medium">
                    {selectedOrder.shippingInfo.address}, {selectedOrder.shippingInfo.city}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-[var(--color-text-primary)]">Sản phẩm</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={`${selectedOrder.id}-${item.productId}`}
                      className="flex items-center justify-between gap-4 border-b border-[var(--color-border-strong)] py-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-lg object-contain"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-[var(--color-text-secondary)]">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-[var(--color-border-strong)] pt-4">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Giảm giá</span>
                  <span>-{formatCurrency(selectedOrder.discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vận chuyển</span>
                  <span>
                    {selectedOrder.shippingFee === 0
                      ? 'Miễn phí'
                      : formatCurrency(selectedOrder.shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Tổng thanh toán</span>
                  <span className="text-[var(--color-surface-raised)]">
                    {formatCurrency(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
