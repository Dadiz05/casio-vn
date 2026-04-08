import { Link } from "react-router-dom";
import { useStore } from "../store/useStore.js";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="text-8xl mb-6">🛍️</div>
        <h2 className="text-3xl font-bold mb-4">Giỏ hàng trống</h2>
        <p className="text-gray-600 mb-10">
          Bạn chưa có sản phẩm nào trong giỏ hàng.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl hover:bg-gray-800 transition"
        >
          <ArrowLeft size={20} />
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10">Giỏ hàng của bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-6 border-b last:border-none"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-2xl"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-xl">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity - 1)
                        }
                        className="px-4 py-2 hover:bg-gray-100 rounded-l-xl"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-6 py-2 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.quantity + 1)
                        }
                        className="px-4 py-2 hover:bg-gray-100 rounded-r-xl"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-xl text-red-600">
                        {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-6 text-red-600 hover:text-red-700 text-sm flex items-center gap-2"
          >
            <Trash2 size={18} />
            Xóa toàn bộ giỏ hàng
          </button>
        </div>

        {/* Thanh toán */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 sticky top-24">
            <h3 className="text-2xl font-semibold mb-6">Tổng tiền</h3>

            <div className="flex justify-between text-lg mb-6">
              <span>Tạm tính:</span>
              <span className="font-bold">
                {totalPrice.toLocaleString("vi-VN")} ₫
              </span>
            </div>

            <div className="h-px bg-gray-200 my-6"></div>

            <div className="flex justify-between text-xl font-bold mb-8">
              <span>Tổng cộng:</span>
              <span className="text-red-600">
                {totalPrice.toLocaleString("vi-VN")} ₫
              </span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-black text-white text-center py-4 rounded-2xl font-semibold hover:bg-gray-800 transition"
            >
              Tiến hành thanh toán
            </Link>

            <Link
              to="/shop"
              className="block text-center mt-4 text-gray-600 hover:text-black"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
