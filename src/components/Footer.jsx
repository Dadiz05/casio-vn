import { Link } from "react-router-dom";
import { MessageCircle, MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-black pt-12 sm:pt-16 pb-8 border-t border-[#dd3333]">
      <div className="casio-container">
        {/* Showroom Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-[#dd3333]" />
              <h3 className="font-semibold text-sm uppercase tracking-wide text-black">
                HÀ NỘI
              </h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              170 Xã Đàn, Phường Văn Miếu - Quốc Tử Giám, TP. Hà Nội
            </p>
            <p className="text-[#dd3333] font-semibold text-sm">0942.27.3388</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-[#dd3333]" />
              <h3 className="font-semibold text-sm uppercase tracking-wide text-black">
                ĐÀ NẴNG
              </h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              228 Điện Biên Phủ, Phường Thanh Khê, TP. Đà Nẵng
            </p>
            <p className="text-[#dd3333] font-semibold text-sm">0943.72.3388</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-[#dd3333]" />
              <h3 className="font-semibold text-sm uppercase tracking-wide text-black">
                TP. HỒ CHÍ MINH
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700 text-sm leading-relaxed">
                431 Cách Mạng Tháng 8, Phường Hòa Hưng
              </p>
              <p className="text-[#dd3333] font-semibold text-sm">
                0941.82.3388
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                835 Phan Văn Trị, Phường Hạnh Thông
              </p>
              <p className="text-[#dd3333] font-semibold text-sm">
                0948.92.3388
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-12 sm:my-16"></div>

        {/* Support & Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={20} className="text-[#dd3333]" />
              <h4 className="font-semibold text-black">Giờ mở cửa</h4>
            </div>
            <p className="text-gray-700 text-sm">09:00 - 21:00</p>
            <p className="text-gray-600 text-xs">Thứ 2 - Chủ Nhật</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Phone size={20} className="text-[#dd3333]" />
              <h4 className="font-semibold text-black">Hỗ trợ kỹ thuật</h4>
            </div>
            <p className="text-[#dd3333] font-semibold text-sm">
              (0243)-910-3333
            </p>
            <p className="text-gray-600 text-xs">09:00 - 21:00</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Phone size={20} className="text-[#dd3333]" />
              <h4 className="font-semibold text-black">Khiếu nại & Bảo hành</h4>
            </div>
            <p className="text-[#dd3333] font-semibold text-sm">
              (0242)-217-9999
            </p>
            <p className="text-gray-600 text-xs">09:00 - 18:00</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle size={20} className="text-[#dd3333]" />
              <h4 className="font-semibold text-black">Tư vấn 24/7</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded text-xs text-black font-medium border border-gray-200">
                0943.72.3388
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded text-xs text-black font-medium border border-gray-200">
                0941.82.3388
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-12 sm:my-16"></div>

        {/* Links & Social */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="space-y-4">
            <h4 className="font-semibold text-black text-sm uppercase tracking-wide border-b-2 border-[#dd3333] pb-2">
              Danh mục sản phẩm
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link
                to="/shop?category=G-Shock"
                className="text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                G-SHOCK
              </Link>
              <Link
                to="/shop?category=Baby-G"
                className="text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                BABY-G
              </Link>
              <Link
                to="/shop?category=Edifice"
                className="text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                EDIFICE
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                SHEEN
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                PRO-TREK
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                CASIO
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                Sản Phẩm Mới
              </Link>
              <Link
                to="#"
                className="text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                Limited Edition
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-black text-sm uppercase tracking-wide border-b-2 border-[#dd3333] pb-2">
              Hỗ trợ - Chính sách
            </h4>
            <div className="space-y-3 text-sm">
              <Link
                to="/shipping-policy"
                className="block text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                Chính sách giao hàng
              </Link>
              <Link
                to="/return-policy"
                className="block text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                Chính sách đổi hàng
              </Link>
              <Link
                to="/warranty-policy"
                className="block text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                Chính sách bảo hành
              </Link>
              <Link
                to="/privacy-policy"
                className="block text-gray-700 hover:text-[#dd3333] transition font-medium"
              >
                Chính sách bảo mật
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-black text-sm uppercase tracking-wide border-b-2 border-[#dd3333] pb-2">
              Kết nối với chúng tôi
            </h4>
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/casiovietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg text-gray-700 hover:bg-[#dd3333] hover:text-white transition border border-gray-200"
                title="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/casio_vietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg text-gray-700 hover:bg-[#dd3333] hover:text-white transition border border-gray-200"
                title="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <circle cx="17.5" cy="6.5" r="1.5"></circle>
                </svg>
              </a>

              {/* Zalo */}
              <a
                href="https://zalo.me/0943723388"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg text-gray-700 hover:bg-[#dd3333] hover:text-white transition border border-gray-200"
                title="Zalo"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 pt-8 text-center text-xs text-gray-600">
          <p className="mb-2">
            © 2024 Công Ty TNHH CASIO Việt Nam. Tất cả quyền được bảo lưu.
          </p>
          <p>
            GPDKKD: 0109952575 | Địa chỉ: 170 Xã Đàn, Phường Văn Miếu - Quốc Tử
            Giám, TP. Hà Nội
          </p>
        </div>
      </div>
    </footer>
  );
}
