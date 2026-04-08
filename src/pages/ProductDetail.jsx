import { useParams, Link } from "react-router-dom";
import { useStore } from "../store/useStore.js";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useStore();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Không tìm thấy sản phẩm</h2>
        <Link
          to="/shop"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8"
      >
        <ArrowLeft size={20} />
        Quay lại cửa hàng
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Hình ảnh */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <div className="mb-4">
            <span className="inline-block bg-black text-white text-sm px-4 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight mb-6">
            {product.name}
          </h1>

          <div className="text-5xl font-bold text-red-600 mb-8">
            {product.price.toLocaleString("vi-VN")} ₫
          </div>

          <div className="prose text-gray-600 mb-10">
            <p>{product.description}</p>
            <p className="mt-4">
              Sản phẩm chính hãng Casio Nhật Bản. Bảo hành 5 năm. Giao hàng toàn
              quốc trong 2-4 ngày làm việc.
            </p>
          </div>

          {/* Thông số kỹ thuật */}
          <div className="mb-10">
            <h3 className="font-semibold text-lg mb-4">Thông số nổi bật</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✔</span>
                Chống sốc và chống nước
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✔</span>
                Pin năng lượng mặt trời (một số mẫu)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 mt-1">✔</span>
                Thiết kế thời trang, bền bỉ
              </li>
            </ul>
          </div>

          {/* Nút hành động */}
          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-black hover:bg-yellow-400 hover:text-black text-white py-4 rounded-2xl font-semibold text-lg transition flex items-center justify-center gap-3"
            >
              <ShoppingCart size={24} />
              Thêm vào giỏ hàng
            </button>

            <Link
              to="/cart"
              className="flex-1 border-2 border-black text-black py-4 rounded-2xl font-semibold text-lg text-center hover:bg-gray-100 transition"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
