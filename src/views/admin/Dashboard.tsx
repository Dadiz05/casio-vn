'use client'

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from '@/lib/navigation'
import { useStore } from '@/store/useStore'
import { Brain, DollarSign, Loader2, ShoppingCart, Sparkles, TrendingUp, Users } from 'lucide-react'
import { requestAiInsights, toProductBrief } from '@/lib/ai'
import type { AiInsightResult } from '@/types/ai'

const RevenueBarChart = lazy(() => import('@/features/admin/components/RevenueBarChart'))

function InsightList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white p-4">
      <p className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">{title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-6 text-[var(--color-text-secondary)]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function AdminDashboard() {
  const { products, user, orders, users } = useStore()
  const [shouldLoadChart, setShouldLoadChart] = useState(false)
  const [aiInsights, setAiInsights] = useState<AiInsightResult | null>(null)
  const [aiInsightLoading, setAiInsightLoading] = useState(false)
  const [aiInsightError, setAiInsightError] = useState('')
  const chartCardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartCardRef.current || shouldLoadChart) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadChart(true)
          observer.disconnect()
        }
      },
      { rootMargin: '180px' }
    )

    observer.observe(chartCardRef.current)
    return () => observer.disconnect()
  }, [shouldLoadChart])

  const chartData = useMemo(() => {
    const monthTotals = new Map<string, number>()
    orders.forEach((order) => {
      const month = `T${new Date(order.createdAt).getMonth() + 1}`
      monthTotals.set(month, (monthTotals.get(month) || 0) + order.total)
    })

    return ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].map((month) => ({
      month,
      revenue: monthTotals.get(month) || 0,
    }))
  }, [orders])

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const totalUsers = users.length
  const metricCards = [
    {
      label: 'Tổng doanh thu',
      value: `${(totalRevenue / 1000000).toFixed(0)} triệu ₫`,
      icon: <DollarSign className="text-[var(--color-surface-raised)]" size={26} />,
    },
    {
      label: 'Số đơn hàng',
      value: totalOrders,
      icon: <ShoppingCart className="text-[var(--color-text-primary)]" size={26} />,
    },
    {
      label: 'Sản phẩm',
      value: products.length,
      icon: <TrendingUp className="text-[var(--color-text-secondary)]" size={26} />,
    },
    {
      label: 'Khách hàng',
      value: totalUsers,
      icon: <Users className="text-[var(--color-text-secondary)]" size={26} />,
    },
  ]
  const productNameById = useMemo(
    () => new Map(products.map((product) => [product.id, product.name])),
    [products]
  )

  const handleGenerateInsights = async () => {
    setAiInsightLoading(true)
    setAiInsightError('')

    try {
      const result = await requestAiInsights({
        products: products.map(toProductBrief),
        orders,
        users,
      })
      setAiInsights(result)
    } catch (error) {
      setAiInsightError(error instanceof Error ? error.message : 'Không tạo được phân tích AI.')
    } finally {
      setAiInsightLoading(false)
    }
  }

  return (
    <div className="casio-container casio-section py-10">
      <div className="mb-8">
        <span className="site-kicker">Admin</span>
        <h1 className="site-title text-3xl sm:text-4xl mt-2">Dashboard</h1>
        <p className="site-copy mt-2">Chào mừng quay trở lại, {user?.name || 'Admin'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {metricCards.map((card) => (
          <div key={card.label} className="site-card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">{card.label}</p>
                <p className="text-2xl sm:text-3xl font-bold mt-2 text-[var(--color-text-primary)]">
                  {card.value}
                </p>
              </div>
              <div className="site-chip bg-[rgba(221,51,51,0.1)] border-[rgba(221,51,51,0.2)]">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="site-card p-6 sm:p-8 mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="site-kicker">
              <Brain size={16} />
              AI analyst
            </span>
            <h2 className="site-title mt-3 text-2xl sm:text-3xl">Gợi ý vận hành hôm nay</h2>
          </div>
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            {aiInsights && (
              <span className="site-chip">
                {aiInsights.source === 'openai' ? 'OpenAI' : 'Fallback nội bộ'}
              </span>
            )}
            <button
              type="button"
              onClick={handleGenerateInsights}
              disabled={aiInsightLoading}
              className="site-button site-button--primary"
            >
              {aiInsightLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              Phân tích AI
            </button>
          </div>
        </div>

        {aiInsightError && (
          <p className="mt-4 rounded-[var(--radius-sm)] border border-[rgba(221,51,51,0.24)] bg-[rgba(221,51,51,0.08)] px-4 py-3 text-sm text-[var(--color-surface-raised)]">
            {aiInsightError}
          </p>
        )}

        {aiInsights ? (
          <div className="mt-6 space-y-5">
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.02)] p-4">
              <p className="font-semibold text-[var(--color-text-primary)]">{aiInsights.summary}</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <InsightList title="Việc cần làm" items={aiInsights.actionItems} />
              <InsightList title="Rủi ro" items={aiInsights.risks} />
              <InsightList title="Cơ hội" items={aiInsights.opportunities} />
            </div>

            {aiInsights.inventoryAlerts.length > 0 && (
              <div className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white p-4">
                <p className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">
                  Cảnh báo tồn kho
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {aiInsights.inventoryAlerts.map((alert) => (
                    <div
                      key={`${alert.productId}-${alert.message}`}
                      className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-4 py-3"
                    >
                      <div className="mb-1 flex items-center justify-between gap-3">
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {productNameById.get(alert.productId) || alert.productId}
                        </p>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            alert.priority === 'high'
                              ? 'bg-[rgba(221,51,51,0.12)] text-[var(--color-surface-raised)]'
                              : alert.priority === 'medium'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {alert.priority}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)]">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.02)] p-5">
            <p className="site-copy">
              Bấm phân tích để lấy đề xuất từ dữ liệu đơn hàng, khách hàng và tồn kho hiện tại.
            </p>
          </div>
        )}
      </div>

      <div ref={chartCardRef} className="site-card p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
          Doanh thu theo tháng
        </h2>
        <p className="site-copy mb-6">Dữ liệu demo để kiểm tra bố cục dashboard và biểu đồ.</p>
        {shouldLoadChart ? (
          <Suspense
            fallback={
              <div className="h-80 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.02)] grid place-items-center">
                <p className="site-copy">Đang tải biểu đồ...</p>
              </div>
            }
          >
            <RevenueBarChart data={chartData} />
          </Suspense>
        ) : (
          <div className="h-80 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.02)] grid place-items-center">
            <div className="text-center px-6">
              <p className="site-copy mb-4">
                Biểu đồ sẽ tải khi bạn cuộn tới khu vực này hoặc bấm nút bên dưới.
              </p>
              <button
                onClick={() => setShouldLoadChart(true)}
                className="site-button site-button--secondary"
              >
                Tải biểu đồ ngay
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Link
          to="/admin/products"
          className="site-card p-6 sm:p-8 hover:-translate-y-0.5 transition"
        >
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Quản lý Sản phẩm
          </h3>
          <p className="site-copy">Thêm, sửa, xóa sản phẩm đồng hồ Casio</p>
        </Link>

        <Link to="/admin/orders" className="site-card p-6 sm:p-8 hover:-translate-y-0.5 transition">
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Quản lý Đơn hàng
          </h3>
          <p className="site-copy">Xem và cập nhật trạng thái đơn hàng</p>
        </Link>
      </div>
    </div>
  )
}
