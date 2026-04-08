import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useStore } from "../store/useStore.js";

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useStore();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Ngăn việc click vào Link
    addToCart(product);

    // Hiệu ứng thông báo nhỏ
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    notification.textContent = `Đã thêm "${product.name}" vào giỏ hàng`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
  };

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Hình ảnh sản phẩm */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badge loại sản phẩm */}
          <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
            {product.category}
          </div>

          {/* Nút yêu thích */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <Heart
              size={20}
              className={`${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        </div>
      </Link>

      {/* Thông tin sản phẩm */}
      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 hover:text-yellow-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Giá và nút thêm vào giỏ */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-red-600">
              {product.price.toLocaleString("vi-VN")} ₫
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-black hover:bg-yellow-400 hover:text-black text-white px-5 py-3 rounded-xl transition-all duration-300 font-medium"
          >
            <ShoppingCart size={18} />
            Thêm giỏ
          </button>
        </div>
      </div>
    </div>
  );
}
