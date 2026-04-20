import { useParams, Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { products, addToCart } = useStore();

  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Xanh Lá");

  // === TỰ ĐỘNG CUỘN LÊN ĐẦU TRANG KHI VÀO CHI TIẾT SẢN PHẨM ===
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="casio-container casio-section py-20 text-center">
        <h2 className="site-title text-3xl sm:text-4xl">
          Không tìm thấy sản phẩm
        </h2>
        <Link to="/shop" className="site-button site-button--ghost mt-5">
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
    <div className="casio-container casio-section py-12">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-8"
      >
        <ArrowLeft size={20} />
        Quay lại cửa hàng
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
        <div>
          <div className="site-card relative overflow-hidden mb-6 group">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-auto object-contain aspect-square p-6 bg-[linear-gradient(180deg,#fff,#f5f5f5)]"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 site-button site-button--secondary opacity-0 group-hover:opacity-100 transition-all px-3 py-3"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 site-button site-button--secondary opacity-0 group-hover:opacity-100 transition-all px-3 py-3"
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
                  className={`flex-shrink-0 w-20 h-20 bg-white rounded-[var(--radius-sm)] overflow-hidden border-2 cursor-pointer transition-all hover:scale-105 ${
                    currentImageIndex === index
                      ? "border-[var(--color-surface-raised)] scale-105"
                      : "border-[var(--color-border-strong)]"
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

        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="site-chip bg-[var(--color-surface-raised)] text-white border-transparent">
              New
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {product.category}
            </span>
          </div>

          <h1 className="site-title text-3xl sm:text-4xl leading-tight mb-4">
            {product.name}
          </h1>

          <div className="mb-6">
            <p className="text-sm text-[var(--color-text-secondary)] mb-2">
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
            <div className="text-3xl sm:text-4xl font-bold text-[var(--color-accent)]">
              {product.price.toLocaleString("vi-VN")} ₫
            </div>
          </div>

          <p className="text-[var(--color-text-primary)] leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Phần thông tin chính hãng, fullbox, khuyến mãi... (giữ nguyên như trước) */}
          <div className="space-y-6 mb-8 text-sm">
            <div className="space-y-2">
              <p className="font-medium text-[var(--color-success)] flex items-center gap-2">
                <span className="text-lg">✓</span> Sản phẩm 100% chính hãng
                CASIO Nhật Bản, bảo hành chính hãng
              </p>
              <p className="text-[var(--color-error)] font-medium flex items-center gap-2">
                <span className="text-lg">⚠</span> Hoàn tiền gấp 10 lần nếu phát
                hiện hàng giả, hàng nhái
              </p>
            </div>

            <div className="bg-[var(--color-surface-muted)] p-4 rounded-lg space-y-2">
              <p className="font-medium text-[var(--color-text-primary)]">
                Chấp nhận thanh toán:
              </p>
              <p className="text-[var(--color-text-secondary)]">
                Thẻ ATM, VISA, Master Card, Airpay & QR-Code
              </p>
              <p className="text-[var(--color-text-secondary)]">
                Trả góp qua thẻ, Kredivo, HomePay, Credit, CCCD
              </p>
            </div>

            <div className="bg-[var(--color-surface-muted)] p-4 rounded-lg">
              <p className="font-medium text-[var(--color-text-primary)] mb-3">
                Bộ sản phẩm fullbox chính hãng bao gồm:
              </p>
              <ul className="list-disc list-inside text-[var(--color-text-secondary)] space-y-1">
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
            <span className="font-medium text-[var(--color-text-primary)]">
              Số lượng:
            </span>
            <div className="flex items-center border border-[var(--color-border-strong)] rounded-lg bg-[var(--color-surface-muted)]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 sm:px-6 py-2 sm:py-3 hover:bg-[var(--color-surface-raised)] rounded-l-lg transition"
              >
                −
              </button>
              <span className="px-6 sm:px-10 py-2 sm:py-3 font-semibold text-lg text-[var(--color-text-primary)]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 sm:px-6 py-2 sm:py-3 hover:bg-[var(--color-surface-raised)] rounded-r-lg transition"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleAddToCart}
              className="site-button site-button--primary flex items-center justify-center gap-3 flex-1 py-4 sm:py-5"
            >
              <ShoppingCart size={22} />
              Thêm vào giỏ hàng
            </button>

            <button
              onClick={() => {
                handleAddToCart();
                navigate("/cart");
              }}
              className="site-button site-button--secondary flex-1 py-4 sm:py-5 font-semibold"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      {/* Phần mô tả + specs + features bên dưới (giữ nguyên) */}
      <div className="mt-16">
        <div className="border-b border-[var(--color-border-strong)] pb-4 mb-8">
          <h2 className="site-title text-2xl">Mô tả sản phẩm</h2>
        </div>

        <div className="max-w-none text-[var(--color-text-primary)] leading-relaxed mb-12 space-y-4">
          <p>{product.fullDescription}</p>
        </div>

        {product.specs && (
          <div className="mb-12">
            <h3 className="site-title text-xl mb-6">Thông tin cơ bản</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-3 border-b border-[var(--color-border-strong)]"
                >
                  <span className="text-[var(--color-text-secondary)]">
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
                  <span className="font-medium text-[var(--color-text-primary)] text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.features && (
          <div>
            <h3 className="site-title text-xl mb-6">Tính năng nổi bật</h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <span className="text-[var(--color-accent)] font-bold mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-[var(--color-text-primary)]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
