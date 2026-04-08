import { useStore } from "../store/useStore.js";
import { X, Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingCart size={24} />
            <h2 className="text-2xl font-semibold">Giỏ hàng</h2>
            {cart.length > 0 && (
              <span className="bg-yellow-400 text-black text-sm font-bold px-3 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nội dung giỏ hàng */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-7xl mb-6">🛍️</div>
              <h3 className="text-xl font-medium mb-2">Giỏ hàng trống</h3>
              <p className="text-gray-500 mb-8">Bạn chưa có sản phẩm nào</p>
              <Link
                to="/shop"
                onClick={onClose}
                className="bg-black text-white px-8 py-3 rounded-2xl hover:bg-gray-800 transition"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gray-50 p-4 rounded-2xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium leading-tight line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.category}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-xl">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100 rounded-l-xl"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-5 py-1 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100 rounded-r-xl"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-red-600">
                          {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                          ₫
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-1 self-start"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Tổng tiền và nút thanh toán */}
        {cart.length > 0 && (
          <div className="border-t p-6 space-y-4">
            <div className="flex justify-between text-lg">
              <span className="font-medium">Tổng cộng:</span>
              <span className="font-bold text-red-600">
                {totalPrice.toLocaleString("vi-VN")} ₫
              </span>
            </div>

            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full bg-black text-white text-center py-4 rounded-2xl font-semibold hover:bg-gray-800 transition"
            >
              Tiến hành thanh toán
            </Link>

            <button
              onClick={() => {
                clearCart();
                onClose();
              }}
              className="w-full text-red-600 hover:text-red-700 text-sm py-2"
            >
              Xóa toàn bộ giỏ hàng
            </button>
          </div>
        )}
      </div>
    </>
  );
}
