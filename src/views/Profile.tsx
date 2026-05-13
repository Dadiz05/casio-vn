'use client'

import { Link, useNavigate } from '@/lib/navigation'
import { Heart, LogOut, Mail, PackageCheck, Shield, User } from 'lucide-react'
import { formatCurrency } from '@/lib/cart'
import { useStore } from '@/store/useStore'

export default function Profile() {
  const { user, logout, orders, wishlistIds } = useStore()
  const navigate = useNavigate()
  const customerOrders = orders.filter(
    (order) => order.customerEmail === user?.email || order.customerId === user?.id
  )

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined)
    logout()
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="casio-container casio-section flex min-h-[72vh] items-center justify-center">
        <div className="profile-empty">
          <User size={62} />
          <h1 className="site-title mt-5 text-3xl">Bạn chưa đăng nhập</h1>
          <p className="site-copy mt-3">
            Đăng nhập để xem thông tin tài khoản và lịch sử đơn hàng.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="site-button site-button--primary mt-6"
          >
            Đi đến trang đăng nhập
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="casio-container casio-section page-fade max-w-6xl py-10">
      <div className="profile-hero">
        <div className="profile-avatar">
          <User size={38} />
        </div>
        <div className="min-w-0">
          <span className="site-kicker text-white/80">Tài khoản Casio VN</span>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">{user.name}</h1>
          <p className="mt-2 text-white/72">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="account-stat-card">
          <Mail size={20} />
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>
        <div className="account-stat-card">
          <Shield size={20} />
          <span>Vai trò</span>
          <strong>{user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}</strong>
        </div>
        <Link to="/wishlist" className="account-stat-card account-stat-card--link">
          <Heart size={20} />
          <span>Sản phẩm yêu thích</span>
          <strong>{wishlistIds.length} mẫu đã lưu</strong>
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="site-card p-5 sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <span className="site-kicker">
                <PackageCheck size={16} />
                Đơn hàng
              </span>
              <h2 className="site-title mt-2 text-2xl">Lịch sử mua hàng</h2>
            </div>
            <Link to="/shop" className="site-button site-button--ghost hidden sm:inline-flex">
              Mua thêm
            </Link>
          </div>

          <div className="space-y-3">
            {customerOrders.length === 0 ? (
              <div className="rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border-strong)] p-6 text-[var(--color-text-secondary)]">
                Bạn chưa có đơn hàng nào.
              </div>
            ) : (
              customerOrders.map((order) => (
                <div key={order.id} className="order-mini-card">
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">{order.id}</p>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                      {order.items.length} sản phẩm •{' '}
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[var(--color-text-primary)]">
                      {formatCurrency(order.total)}
                    </p>
                    <span className="mt-1 inline-flex rounded-full bg-[rgba(16,4,4,0.05)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="site-card p-5 sm:p-7">
          <span className="site-kicker">Hỗ trợ nhanh</span>
          <h2 className="site-title mt-2 text-2xl">Quản lý tài khoản</h2>
          <div className="mt-5 space-y-3">
            <Link
              to="/wishlist"
              className="site-button site-button--secondary w-full justify-between"
            >
              Xem sản phẩm yêu thích
              <Heart size={18} />
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/admin"
                className="site-button site-button--secondary w-full justify-between"
              >
                Đi đến quản trị
                <Shield size={18} />
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="site-button site-button--ghost w-full justify-center text-[var(--color-surface-raised)]"
            >
              <LogOut size={20} />
              Đăng xuất khỏi tài khoản
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
