import { useStore } from "../../store/useStore.js";
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const { products, user } = useStore();

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

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Chào mừng quay trở lại, {user?.name || "Admin"}
        </p>
      </div>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tổng doanh thu</p>
              <p className="text-3xl font-bold mt-2">
                {(totalRevenue / 1000000).toFixed(0)} triệu ₫
              </p>
            </div>
            <DollarSign className="text-green-600" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Số đơn hàng</p>
              <p className="text-3xl font-bold mt-2">{totalOrders}</p>
            </div>
            <ShoppingCart className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Sản phẩm</p>
              <p className="text-3xl font-bold mt-2">{products.length}</p>
            </div>
            <TrendingUp className="text-purple-600" size={40} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Khách hàng</p>
              <p className="text-3xl font-bold mt-2">{totalUsers}</p>
            </div>
            <Users className="text-orange-600" size={40} />
          </div>
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="bg-white p-8 rounded-3xl shadow-sm mb-10">
        <h2 className="text-2xl font-semibold mb-6">Doanh thu theo tháng</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [
                `${value.toLocaleString("vi-VN")} ₫`,
                "Doanh thu",
              ]}
            />
            <Bar dataKey="revenue" fill="#111111" radius={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Link nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="/admin/products"
          className="block p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-2xl font-semibold mb-2">Quản lý Sản phẩm</h3>
          <p className="text-gray-600">Thêm, sửa, xóa sản phẩm đồng hồ Casio</p>
        </a>

        <a
          href="/admin/orders"
          className="block p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-2xl font-semibold mb-2">Quản lý Đơn hàng</h3>
          <p className="text-gray-600">Xem và cập nhật trạng thái đơn hàng</p>
        </a>
      </div>
    </div>
  );
}
