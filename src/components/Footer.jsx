import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Showroom Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          <div>
            <h3 className="text-yellow-400 font-semibold text-lg mb-4">
              HÀ NỘI
            </h3>
            <p className="text-gray-300 leading-relaxed">
              170 Xã Đàn, Phường Văn Miếu - Quốc Tử Giám, TP. Hà Nội
              <br />
              Hotline: <span className="text-white">0942.27.3388</span>
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold text-lg mb-4">
              ĐÀ NẴNG
            </h3>
            <p className="text-gray-300 leading-relaxed">
              228 Điện Biên Phủ, Phường Thanh Khê, TP. Đà Nẵng
              <br />
              Hotline: <span className="text-white">0943.72.3388</span>
            </p>
          </div>

          <div>
            <h3 className="text-yellow-400 font-semibold text-lg mb-4">
              TP. HỒ CHÍ MINH
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              431 Cách Mạng Tháng 8, Phường Hòa Hưng
              <br />
              Hotline: <span className="text-white">0941.82.3388</span>
            </p>
            <p className="text-gray-300 leading-relaxed">
              835 Phan Văn Trị, Phường Hạnh Thông
              <br />
              Hotline: <span className="text-white">0948.92.3388</span>
            </p>
          </div>
        </div>

        {/* Opening hours & Support */}
        <div className="border-t border-gray-800 pt-10 pb-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-gray-400 text-sm mb-2">Mở cửa:</p>
            <p className="text-white">09:00 - 21:00 (Thứ 2 - Chủ Nhật)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-yellow-400 font-medium mb-3">
                Hỗ trợ kỹ thuật
              </p>
              <p className="text-gray-300 text-sm">
                (0243)-910-3333
                <br />
                0943.72.3388{" "}
                <span className="text-xs text-gray-500">(09:00 - 21:00)</span>
              </p>
            </div>
            <div>
              <p className="text-yellow-400 font-medium mb-3">
                Khiếu nại - Góp ý - Bảo hành
              </p>
              <p className="text-gray-300 text-sm">
                (0242)-217-9999
                <br />
                0948.92.3388{" "}
                <span className="text-xs text-gray-500">(09:00 - 18:00)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tư vấn & Danh mục */}
        <div className="border-t border-gray-800 pt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-yellow-400 font-medium mb-4">
              Tư vấn mua hàng - Trả góp (24/7)
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gray-900 px-4 py-2 rounded-lg text-sm text-white">
                0943.72.3388
              </span>
              <span className="bg-gray-900 px-4 py-2 rounded-lg text-sm text-white">
                0941.82.3388
              </span>
              <span className="bg-gray-900 px-4 py-2 rounded-lg text-sm text-white">
                0942.27.3388
              </span>
            </div>
          </div>

          <div>
            <p className="text-yellow-400 font-medium mb-4">
              Danh mục sản phẩm
            </p>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-300">
              <Link
                to="/shop?category=G-Shock"
                className="hover:text-yellow-400"
              >
                G-SHOCK
              </Link>
              <Link
                to="/shop?category=Baby-G"
                className="hover:text-yellow-400"
              >
                BABY-G
              </Link>
              <Link
                to="/shop?category=Edifice"
                className="hover:text-yellow-400"
              >
                EDIFICE
              </Link>
              <Link to="#" className="hover:text-yellow-400">
                SHEEN
              </Link>
              <Link to="#" className="hover:text-yellow-400">
                PRO-TREK
              </Link>
              <Link to="/shop" className="hover:text-yellow-400">
                CASIO
              </Link>
              <Link to="#" className="hover:text-yellow-400">
                Sản Phẩm Mới
              </Link>
              <Link to="#" className="hover:text-yellow-400">
                Limited Edition
              </Link>
            </div>
          </div>

          <div>
            <p className="text-yellow-400 font-medium mb-4">
              Hỗ trợ - Chính sách
            </p>
            <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-300">
              <Link to="#" className="hover:text-yellow-400">
                Chính sách giao hàng
              </Link>
              <Link to="#" className="hover:text-yellow-400">
                Chính sách đổi hàng
              </Link>
              <Link to="#" className="hover:text-yellow-400">
                Chính sách bảo hành
              </Link>
              <Link to="#" className="hover:text-yellow-400">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-gray-800 pt-12 mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-gray-400 text-sm mb-3">Kết nối với chúng tôi</p>
            <div className="flex items-center gap-6">
              {/* Facebook */}
              <a
                href="#"
                className="flex items-center gap-2 hover:text-yellow-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span>Facebook</span>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="flex items-center gap-2 hover:text-yellow-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>Instagram</span>
              </a>

              {/* Zalo */}
              <a
                href="#"
                className="flex items-center gap-2 hover:text-yellow-400 transition"
              >
                <MessageCircle size={24} />
                <span>Zalo OA</span>
              </a>
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-gray-500">
            © 2022 Công Ty TNHH TAGroup. GPDKKD: 0109952575
            <br />
            Địa chỉ: 170 Xã Đàn, Phường Văn Miếu - Quốc Tử Giám, TP. Hà Nội
          </div>
        </div>
      </div>
    </footer>
  );
}
