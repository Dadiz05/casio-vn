import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../store/useStore.js";
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const RevenueBarChart = lazy(
  () => import("../../components/admin/RevenueBarChart.jsx"),
);

export default function AdminDashboard() {
  const { products, user } = useStore();
  const [shouldLoadChart, setShouldLoadChart] = useState(false);
  const chartCardRef = useRef(null);

  useEffect(() => {
    if (!chartCardRef.current || shouldLoadChart) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadChart(true);
          observer.disconnect();
        }
      },
      { rootMargin: "180px" },
    );

    observer.observe(chartCardRef.current);
    return () => observer.disconnect();
  }, [shouldLoadChart]);

  // Dữ liệu giả cho biểu đồ
  const chartData = [
    { month: "T1", revenue: 45000000 },
    { month: "T2", revenue: 62000000 },
    { month: "T3", revenue: 38000000 },
    { month: "T4", revenue: 71000000 },
    { month: "T5", revenue: 89000000 },
  ];

  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = 124;
  const totalUsers = 856;
  const metricCards = [
    {
      label: "Tổng doanh thu",
      value: `${(totalRevenue / 1000000).toFixed(0)} triệu ₫`,
      icon: (
        <DollarSign className="text-[var(--color-surface-raised)]" size={26} />
      ),
    },
    {
      label: "Số đơn hàng",
      value: totalOrders,
      icon: (
        <ShoppingCart className="text-[var(--color-text-primary)]" size={26} />
      ),
    },
    {
      label: "Sản phẩm",
      value: products.length,
      icon: (
        <TrendingUp className="text-[var(--color-text-secondary)]" size={26} />
      ),
    },
    {
      label: "Khách hàng",
      value: totalUsers,
      icon: <Users className="text-[var(--color-text-secondary)]" size={26} />,
    },
  ];

  return (
    <div className="casio-container casio-section py-10">
      <div className="mb-8">
        <span className="site-kicker">Admin</span>
        <h1 className="site-title text-3xl sm:text-4xl mt-2">Dashboard</h1>
        <p className="site-copy mt-2">
          Chào mừng quay trở lại, {user?.name || "Admin"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {metricCards.map((card) => (
          <div key={card.label} className="site-card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {card.label}
                </p>
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

      <div ref={chartCardRef} className="site-card p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
          Doanh thu theo tháng
        </h2>
        <p className="site-copy mb-6">
          Dữ liệu demo để kiểm tra bố cục dashboard và biểu đồ.
        </p>
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
                Biểu đồ sẽ tải khi bạn cuộn tới khu vực này hoặc bấm nút bên
                dưới.
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

        <Link
          to="/admin/orders"
          className="site-card p-6 sm:p-8 hover:-translate-y-0.5 transition"
        >
          <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">
            Quản lý Đơn hàng
          </h3>
          <p className="site-copy">Xem và cập nhật trạng thái đơn hàng</p>
        </Link>
      </div>
    </div>
  );
}
