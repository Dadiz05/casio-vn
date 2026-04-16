import { useParams, Link } from "react-router-dom";
import { useStore } from "../store/useStore.js";
import {
  ArrowLeft,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useStore();

  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Xanh Lá");

  // === TỰ ĐỘNG CUỘN LÊN ĐẦU TRANG KHI VÀO CHI TIẾT SẢN PHẨM ===
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // "instant" = nhảy thẳng, không cuộn
    });
  }, [id]);

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

  const images = product.images || [product.image];

  const colors = [
    { name: "Xanh Lá", value: "Xanh Lá", hex: "#10b981" },
    { name: "Hồng", value: "Hồng", hex: "#ec4899" },
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Phần còn lại giữ nguyên như code trước đó của bạn */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8"
      >
        <ArrowLeft size={20} />
        Quay lại cửa hàng
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Phần ảnh sản phẩm */}
        <div>
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm mb-6 group">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 ${
                    currentImageIndex === index
                      ? "border-black scale-105"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phần thông tin sản phẩm */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              New
            </span>
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight mb-4">
            {product.name}
          </h1>

          {/* Chọn màu */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Bạn đang xem{" "}
              <span className="font-semibold text-black">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-9 h-9 rounded-full border-2 transition-all ${
                    selectedColor === color.value
                      ? "border-black scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl font-bold text-red-600">
              {product.price.toLocaleString("vi-VN")} ₫
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Phần thông tin chính hãng, fullbox, khuyến mãi... (giữ nguyên như trước) */}
          <div className="space-y-6 mb-8 text-sm">
            <div>
              <p className="font-medium text-green-700">
                Sản phẩm 100% chính hãng CASIO Nhật Bản, bảo hành chính hãng
              </p>
              <p className="text-red-600 font-medium">
                Hoàn tiền gấp 10 lần nếu phát hiện hàng giả, hàng nhái
              </p>
            </div>

            <div>
              <p className="font-medium">Chấp nhận thanh toán:</p>
              <p className="text-gray-600">
                Thẻ ATM, VISA, Master Card, Airpay & QR-Code
              </p>
              <p className="text-gray-600">
                Trả góp qua thẻ, Kredivo, HomePay, Credit, CCCD
              </p>
            </div>

            <div>
              <p className="font-medium">
                Bộ sản phẩm fullbox chính hãng bao gồm:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
                <li>
                  Túi, hộp, thẻ bảo hành, bảo hành điện tử, xuất hoá đơn eVAT
                </li>
                <li>Hướng dẫn sử dụng, voucher giảm giá mua hàng, linh kiện</li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-amber-600">
                Khuyến mãi (áp dụng với đơn đặt hàng & thanh toán online):
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span> Giảm 100.000đ
                  khi nhập mã{" "}
                  <span className="font-mono bg-gray-100 px-1 rounded">
                    EXP001
                  </span>{" "}
                  (đơn từ 2.000.000đ)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span> Giảm 200.000đ
                  khi nhập mã{" "}
                  <span className="font-mono bg-gray-100 px-1 rounded">
                    EXP002
                  </span>{" "}
                  (đơn từ 4.000.000đ)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span> Giảm 300.000đ
                  khi nhập mã{" "}
                  <span className="font-mono bg-gray-100 px-1 rounded">
                    EXP003
                  </span>{" "}
                  (đơn từ 6.000.000đ)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">•</span> Giảm 20% khi
                  In logo / khắc laser logo, tên, họa tiết lên đồng hồ theo yêu
                  cầu
                </li>
              </ul>
            </div>
          </div>

          {/* Chọn số lượng + Nút */}
          <div className="flex items-center gap-6 mb-8">
            <span className="font-medium text-gray-700">Số lượng:</span>
            <div className="flex items-center border border-gray-300 rounded-2xl">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-6 py-3 hover:bg-gray-100 rounded-l-2xl"
              >
                −
              </button>
              <span className="px-10 py-3 font-semibold text-lg">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-6 py-3 hover:bg-gray-100 rounded-r-2xl"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black hover:bg-yellow-400 hover:text-black text-white py-4 rounded-2xl font-semibold transition flex items-center justify-center gap-3"
            >
              <ShoppingCart size={22} />
              Thêm vào giỏ hàng
            </button>

            <button className="flex-1 border-2 border-black text-black py-4 rounded-2xl font-semibold hover:bg-gray-50 transition">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Phần mô tả + specs + features bên dưới (giữ nguyên) */}
      <div className="mt-16">
        <div className="border-b pb-4 mb-8">
          <h2 className="text-2xl font-semibold">Mô tả sản phẩm</h2>
        </div>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-12">
          <p>{product.fullDescription}</p>
        </div>

        {product.specs && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">Thông tin cơ bản</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">
                    {key === "size"
                      ? "Kích thước vỏ (Dài × Rộng × Cao)"
                      : key === "weight"
                        ? "Trọng lượng"
                        : key === "caseMaterial"
                          ? "Vật liệu vỏ và gờ"
                          : key === "strapMaterial"
                            ? "Dây đeo"
                            : key === "waterResistance"
                              ? "Chống nước"
                              : key === "batteryLife"
                                ? "Tuổi thọ pin"
                                : key}
                  </span>
                  <span className="font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.features && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Tính năng nổi bật</h3>
            <ul className="space-y-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-green-600 mt-0.5">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
