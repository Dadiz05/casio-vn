import { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default function AdminOrders() {
  // Dữ liệu demo đơn hàng (không dùng cart nữa)
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
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
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
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Quản lý Đơn hàng</h1>
          <p className="text-gray-600 mt-2">
            Theo dõi và cập nhật trạng thái đơn hàng
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Tổng đơn hàng:{" "}
          <span className="font-semibold text-black">{orders.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-6 font-semibold">Mã đơn hàng</th>
              <th className="text-left p-6 font-semibold">Khách hàng</th>
              <th className="text-left p-6 font-semibold">Ngày đặt</th>
              <th className="text-right p-6 font-semibold">Tổng tiền</th>
              <th className="text-center p-6 font-semibold">Trạng thái</th>
              <th className="text-center p-6 font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-6 font-mono font-medium">{order.id}</td>
                <td className="p-6">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.email}</p>
                  </div>
                </td>
                <td className="p-6 text-gray-600">{order.date}</td>
                <td className="p-6 text-right font-semibold">
                  {order.total.toLocaleString("vi-VN")} ₫
                </td>
                <td className="p-6">
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition"
                      title="Xem chi tiết"
                    >
                      <Eye size={20} />
                    </button>

                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "completed")
                          }
                          className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition"
                          title="Xác nhận"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button
                          onClick={() =>
                            updateOrderStatus(order.id, "cancelled")
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition"
                          title="Hủy"
                        >
                          <XCircle size={20} />
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

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="p-8 border-b flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Chi tiết đơn hàng</h2>
                <p className="text-gray-500">Mã đơn: {selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-black text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-gray-500 text-sm">Khách hàng</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Ngày đặt hàng</p>
                  <p className="font-medium">{selectedOrder.date}</p>
                </div>
              </div>

              <h3 className="font-semibold mb-4">Danh sách sản phẩm</h3>
              <div className="space-y-4 mb-8">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-xl font-bold pt-4 border-t">
                <span>Tổng thanh toán</span>
                <span className="text-red-600">
                  {selectedOrder.total.toLocaleString("vi-VN")} ₫
                </span>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex gap-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 py-4 border border-gray-300 rounded-2xl font-medium"
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
