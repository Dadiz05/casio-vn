import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/useStore.js";

export default function Checkout() {
  const { cart, clearCart } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="casio-container casio-section py-12">
      <div className="site-card p-6 sm:p-8">
        <span className="site-kicker">Checkout</span>
        <h1 className="site-title text-3xl sm:text-4xl mt-2 mb-3">
          Thanh toán
        </h1>
        <p className="site-copy mb-8">
          Đây là trang thanh toán demo. Bạn có thể dùng nó làm nền để nối
          backend sau.
        </p>

        <div className="space-y-4 mb-8">
          {cart.length === 0 ? (
            <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] p-8 text-center text-[var(--color-text-secondary)]">
              Giỏ hàng hiện đang trống.
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-[var(--radius-sm)] bg-[rgba(16,4,4,0.03)] p-4"
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
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t pt-6 mb-8">
          <span className="text-lg font-medium">Tổng cộng</span>
          <span className="text-2xl font-bold text-[var(--color-surface-raised)]">
            {totalPrice.toLocaleString("vi-VN")} ₫
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={clearCart}
            disabled={cart.length === 0}
            className="site-button site-button--secondary flex-1 disabled:cursor-not-allowed"
          >
            Xóa giỏ hàng
          </button>
          <Link to="/shop" className="site-button site-button--primary flex-1">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
