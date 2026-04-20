import { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "Nguyễn Văn A",
      email: "user@casio.vn",
      date: "2026-04-07",
      total: 6340000,
      status: "pending",
      items: [
        { name: "G-Shock DW-5600BB", quantity: 1, price: 2450000 },
        { name: "Edifice EF-527D", quantity: 1, price: 3890000 },
      ],
    },
    {
      id: "ORD002",
      customer: "Trần Thị B",
      email: "btran@gmail.com",
      date: "2026-04-06",
      total: 1890000,
      status: "completed",
      items: [{ name: "Baby-G BGD-565-7", quantity: 1, price: 1890000 }],
    },
    {
      id: "ORD003",
      customer: "Lê Minh C",
      email: "minhc@gmail.com",
      date: "2026-04-05",
      total: 2450000,
      status: "pending",
      items: [{ name: "G-Shock DW-5600BB", quantity: 1, price: 2450000 }],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-[rgba(34,197,94,0.15)] text-green-700";
      case "pending":
        return "bg-[rgba(245,158,11,0.16)] text-amber-700";
      case "cancelled":
        return "bg-[rgba(221,51,51,0.14)] text-[var(--color-surface-raised)]";
      default:
        return "bg-[rgba(16,4,4,0.08)] text-[var(--color-text-secondary)]";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Đã hoàn thành";
      case "pending":
        return "Chờ xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <div className="casio-container casio-section py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <span className="site-kicker">Admin orders</span>
          <h1 className="site-title text-3xl sm:text-4xl mt-2">
            Quản lý Đơn hàng
          </h1>
          <p className="site-copy mt-2">
            Theo dõi và cập nhật trạng thái đơn hàng
          </p>
        </div>
        <div className="site-chip text-sm">
          Tổng đơn hàng:{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {orders.length}
          </span>
        </div>
      </div>

      <div className="site-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[rgba(16,4,4,0.04)] border-b border-[var(--color-border-strong)]">
              <tr>
                <th className="text-left p-5 font-semibold">Mã đơn hàng</th>
                <th className="text-left p-5 font-semibold">Khách hàng</th>
                <th className="text-left p-5 font-semibold">Ngày đặt</th>
                <th className="text-right p-5 font-semibold">Tổng tiền</th>
                <th className="text-center p-5 font-semibold">Trạng thái</th>
                <th className="text-center p-5 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-[var(--color-border-strong)] hover:bg-[rgba(16,4,4,0.02)]"
                >
                  <td className="p-5 font-mono font-medium">{order.id}</td>
                  <td className="p-5">
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {order.customer}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {order.email}
                    </p>
                  </td>
                  <td className="p-5 text-[var(--color-text-secondary)]">
                    {order.date}
                  </td>
                  <td className="p-5 text-right font-semibold">
                    {order.total.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="p-5 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusText(order.status)}
                    </span>
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

                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "completed")
                            }
                            className="site-button site-button--ghost min-h-10 px-3 py-2 text-green-700"
                            title="Xác nhận"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button
                            onClick={() =>
                              updateOrderStatus(order.id, "cancelled")
                            }
                            className="site-button site-button--ghost min-h-10 px-3 py-2 text-[var(--color-surface-raised)]"
                            title="Hủy"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
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
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="site-card max-w-2xl w-full overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-[var(--color-border-strong)] flex items-center justify-between gap-4">
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

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Khách hàng
                  </p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Ngày đặt hàng
                  </p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
              </div>

              <h3 className="font-semibold mb-4 text-[var(--color-text-primary)]">
                Danh sách sản phẩm
              </h3>
              <div className="space-y-3 mb-6">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={`${selectedOrder.id}-${index}`}
                    className="flex items-center justify-between py-3 border-b border-[var(--color-border-strong)]"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-xl font-bold pt-4 border-t border-[var(--color-border-strong)]">
                <span>Tổng thanh toán</span>
                <span className="text-[var(--color-surface-raised)]">
                  {selectedOrder.total.toLocaleString("vi-VN")} ₫
                </span>
              </div>
            </div>

            <div className="p-5 border-t border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.03)]">
              <button
                onClick={() => setSelectedOrder(null)}
                className="site-button site-button--secondary w-full"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
