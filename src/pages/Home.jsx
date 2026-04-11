import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { useStore } from "../store/useStore.js";
import ProductCard from "../components/ProductCard.jsx";

import FloatingContact from "../components/FloatingContact.jsx";

export default function Home() {
  const { products } = useStore();

  // Lấy 8 sản phẩm nổi bật (có thể thay đổi sau)
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
       <FloatingContact />
      {/* Hero Section */}
      <div className="relative h-screen bg-black flex items-center">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/1920/1080')] bg-cover bg-center opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-white z-10">
          <div className="max-w-xl">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
              CASIO
              <br />
              <span className="text-yellow-400">VIỆT NAM</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200">
              Đồng hồ chính hãng Nhật Bản
              <br />
              Chất lượng vượt thời gian
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-10 py-4 rounded-xl text-lg inline-flex items-center gap-3 transition-all"
              >
                Mua sắm ngay
                <ArrowRight size={24} />
              </Link>

              <Link
                to="/shop"
                className="border-2 border-white hover:bg-white hover:text-black font-semibold px-10 py-4 rounded-xl text-lg transition-all"
              >
                Khám phá bộ sưu tập
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-black rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Bảo hành chính hãng
              </h3>
              <p className="text-gray-600">
                Bảo hành lên đến 5 năm từ Casio Nhật Bản
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-black rounded-2xl flex items-center justify-center mb-6">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Chống nước tốt</h3>
              <p className="text-gray-600">
                Công nghệ tiên tiến, phù hợp mọi hoạt động
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-black rounded-2xl flex items-center justify-center mb-6">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Chất lượng Nhật Bản
              </h3>
              <p className="text-gray-600">
                Được sản xuất và kiểm tra nghiêm ngặt
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers Section - ĐÃ SỬA */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold">Sản phẩm nổi bật</h2>
              <p className="text-gray-600 mt-2">
                Những mẫu đồng hồ Casio được yêu thích nhất
              </p>
            </div>
            <Link
              to="/shop"
              className="text-black hover:text-yellow-600 flex items-center gap-2 font-medium group"
            >
              Xem tất cả
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition"
              />
            </Link>
          </div>

          {/* Hiển thị sản phẩm nổi bật */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <div className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">
            Casio – Đồng hồ của sự bền bỉ
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Từ năm 1974, Casio đã mang đến những chiếc đồng hồ không chỉ là công
            cụ xem giờ, mà còn là người bạn đồng hành đáng tin cậy trong mọi
            hành trình của bạn.
          </p>
        </div>
      </div>
    </div>
  );
}
