import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
      {/* Hình ảnh sản phẩm */}
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="relative h-64 overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badge loại sản phẩm */}
          <div className="absolute top-4 left-4 bg-black/90 text-white text-xs font-medium px-3.5 py-1 rounded-full backdrop-blur-sm">
            {product.category}
          </div>

          {/* Nút yêu thích */}
          <button
            onClick={handleLike}
            className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all active:scale-90"
          >
            <Heart
              size={20}
              className={`transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
            />
          </button>
        </div>
      </Link>

      {/* Thông tin sản phẩm */}
      <div className="p-6 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="font-semibold text-xl leading-tight mb-3 line-clamp-2 hover:text-yellow-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-gray-500 text-sm mb-6 line-clamp-2">
            {product.description}
          </p>
        </Link>

        {/* Phần giá - Đã chỉnh lại cho đẹp hơn */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-red-600">
              {product.price.toLocaleString("vi-VN")}
            </span>
            <span className="text-2xl font-medium text-red-600">₫</span>
          </div>
        </div>
      </div>
    </div>
  );
}
