import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { useStore } from "../store/useStore.js";
import ProductCard from "../components/ProductCard.jsx";

import FloatingContact from "../components/FloatingContact.jsx";

export default function Home() {
  const { products } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      <FloatingContact />

      <section className="casio-section pt-8 sm:pt-12">
        <div className="casio-container">
          <div className="site-card overflow-hidden relative bg-[linear-gradient(135deg,rgba(16,4,4,0.98),rgba(16,4,4,0.88)_46%,rgba(181,30,30,0.88))] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_30%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-end p-7 sm:p-10 lg:p-14">
              <div className="space-y-6 max-w-2xl">
                <span className="site-kicker text-white/80">
                  CASIO VIỆT NAM
                </span>
                <h1 className="site-title text-4xl sm:text-6xl lg:text-7xl text-white! max-w-2xl leading-[1.03]">
                  <span className="block font-semibold tracking-[-0.01em] text-black!">
                    Đồng hồ bền bỉ, chính xác.
                  </span>
                  <span className="mt-2 block font-semibold tracking-[-0.01em] text-white! [text-shadow:0_3px_12px_rgba(0,0,0,0.62)]">
                    Sẵn sàng cho mọi ngày bận rộn.
                  </span>
                </h1>
                <p className="text-white/78 text-base sm:text-lg max-w-lg leading-7">
                  Bộ sưu tập Casio chính hãng được tổ chức rõ ràng, tìm nhanh,
                  mua nhanh và tối ưu cho trải nghiệm mobile-first.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/shop"
                    className="site-button site-button--primary bg-white text-[var(--color-text-primary)]"
                  >
                    Mua sắm ngay
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    to="/shop"
                    className="site-button site-button--secondary bg-transparent text-white border-white/30 hover:border-white hover:text-white"
                  >
                    Xem bộ sưu tập
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    iconNode: <Shield size={20} />,
                    title: "Bảo hành chính hãng",
                    description:
                      "Thông tin rõ ràng, hỗ trợ sau bán hàng dễ hiểu.",
                    tag: "CAM KẾT",
                    colSpan: "",
                  },
                  {
                    iconNode: <Clock size={20} />,
                    title: "Tìm sản phẩm nhanh",
                    description:
                      "Lọc theo dòng, giá, vật liệu và mức chống nước.",
                    tag: "TỐI ƯU",
                    colSpan: "",
                  },
                  {
                    iconNode: <Award size={20} />,
                    title: "Thiết kế hướng triển khai",
                    description:
                      "Bố cục gọn, chuẩn token, dễ mở rộng sang nội dung mới.",
                    tag: "MỞ RỘNG",
                    colSpan: "sm:col-span-2",
                  },
                ].map(({ iconNode, title, description, tag, colSpan }) => (
                  <div
                    key={title}
                    className={`relative overflow-hidden rounded-[var(--radius-md)] border border-[#ece7e7] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(246,243,243,0.92))] p-5 text-[var(--color-text-primary)] shadow-[0_12px_24px_rgba(16,4,4,0.12)] backdrop-blur-md ${colSpan}`}
                  >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#dd3333] via-[#ff8c8c] to-transparent" />
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full border border-[#f4cdcd] bg-[#fff4f4] px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#b23232]">
                        {tag}
                      </span>
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ffc0c0] bg-[#ffeaea] text-[#c92b2b]">
                        {iconNode}
                      </div>
                    </div>
                    <p className="mb-2 font-semibold text-[var(--color-text-primary)]">
                      {title}
                    </p>
                    <p className="leading-6 text-[var(--color-text-secondary)]">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="casio-section pt-0">
        <div className="casio-container">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              [
                "Bảo hành chính hãng 24 tháng",
                "Kích hoạt bảo hành điện tử nhanh gọn, hỗ trợ minh bạch sau mua.",
              ],
              [
                "Bền bỉ và chống nước đa mức",
                "Nhiều lựa chọn 50m, 100m, 200m phù hợp từ công việc đến vận động.",
              ],
              [
                "Giao nhanh toàn quốc",
                "Đóng gói cẩn thận, theo dõi đơn hàng rõ ràng, nhận hàng đúng hẹn.",
              ],
            ].map(([title, description]) => (
              <div key={title} className="site-card p-5 sm:p-6">
                <div className="site-chip mb-4 inline-flex">CASIO</div>
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="site-copy">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="casio-section pt-0">
        <div className="casio-container">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="site-kicker">Sản phẩm nổi bật</span>
              <h2 className="site-title text-3xl sm:text-4xl mt-2">
                Danh sách mua nhanh
              </h2>
              <p className="site-copy mt-2 max-w-xl">
                Hiển thị theo bố cục thẳng, rõ nhịp, dễ quét trên desktop lẫn
                mobile.
              </p>
            </div>
            <Link
              to="/shop"
              className="site-button site-button--ghost hidden sm:inline-flex"
            >
              Xem toàn bộ
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="casio-section pt-0 pb-20">
        <div className="casio-container">
          <div className="site-card p-7 sm:p-10 bg-[linear-gradient(180deg,#ffffff,#f8f7f6)]">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-center">
              <div>
                <span className="site-kicker">Brand story</span>
                <h2 className="site-title text-3xl sm:text-4xl mt-2">
                  Casio là người bạn đồng hành đáng tin cậy.
                </h2>
              </div>
              <p className="site-copy text-base sm:text-lg leading-7">
                Từ năm 1974, Casio được xây dựng như một hệ thống sản phẩm bền
                bỉ, rõ tính năng và dễ sử dụng. Giao diện storefront này giữ
                đúng tinh thần đó: gọn, dễ truy cập và tối ưu cho quyết định mua
                hàng nhanh.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
