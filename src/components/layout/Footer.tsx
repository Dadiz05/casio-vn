'use client'

import { Link } from '@/lib/navigation'
import { Camera, Clock, MapPin, MessageCircle, Phone, Send } from 'lucide-react'

const stores = [
  {
    city: 'Hà Nội',
    address: '170 Xã Đàn, Phường Văn Miếu - Quốc Tử Giám',
    phone: '0942.27.3388',
  },
  {
    city: 'Đà Nẵng',
    address: '228 Điện Biên Phủ, Phường Thanh Khê',
    phone: '0943.72.3388',
  },
  {
    city: 'TP. Hồ Chí Minh',
    address: '431 Cách Mạng Tháng 8, Phường Hòa Hưng',
    phone: '0941.82.3388',
  },
]

const policyLinks = [
  ['Chính sách giao hàng', '/shipping-policy'],
  ['Chính sách đổi hàng', '/return-policy'],
  ['Chính sách bảo hành', '/warranty-policy'],
  ['Chính sách bảo mật', '/privacy-policy'],
]

const categoryLinks = [
  ['G-Shock', '/shop?category=G-Shock'],
  ['Baby-G', '/shop?category=Baby-G'],
  ['Edifice', '/shop?category=Edifice'],
  ['Classic', '/shop?category=Classic'],
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="casio-container">
        <div className="footer-connect">
          <div>
            <span className="site-kicker">Kết nối với chúng tôi</span>
            <h2 className="site-title mt-2 text-3xl sm:text-4xl">Cần tư vấn chọn Casio?</h2>
            <p className="site-copy mt-3 max-w-2xl">
              Nhắn Zalo, Messenger hoặc gọi hotline. Nút liên hệ màu vàng ở góc phải luôn hiển thị
              trên điện thoại để bạn mở kênh hỗ trợ nhanh.
            </p>
          </div>

          <div className="footer-connect__actions">
            <a href="tel:0943723388" className="footer-connect__primary">
              <Phone size={20} />
              0943.72.3388
            </a>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/casiovietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Facebook"
              >
                <Send size={20} />
              </a>
              <a
                href="https://www.instagram.com/casio_vietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Instagram"
              >
                <Camera size={20} />
              </a>
              <a
                href="https://zalo.me/0943723388"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="Zalo"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <Link to="/" className="site-brand text-2xl">
              CASIO <span className="site-brand__accent">VN</span>
            </Link>
            <p className="site-copy mt-4">
              Cửa hàng demo đồng hồ Casio chính hãng, tối ưu cho trải nghiệm mua sắm nhanh, rõ thông
              tin và dễ thao tác trên mọi thiết bị.
            </p>
            <div className="mt-5 flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
              <Clock size={18} className="text-[var(--color-surface-raised)]" />
              09:00 - 21:00, Thứ 2 - Chủ Nhật
            </div>
          </div>

          <div>
            <h3 className="footer-title">Showroom</h3>
            <div className="mt-4 space-y-4">
              {stores.map((store) => (
                <div key={store.city} className="footer-store">
                  <MapPin size={18} />
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">{store.city}</p>
                    <p>{store.address}</p>
                    <a href={`tel:${store.phone.replace(/\./g, '')}`}>{store.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-title">Danh mục</h3>
            <div className="footer-link-list">
              {categoryLinks.map(([label, path]) => (
                <Link key={path} to={path}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-title">Hỗ trợ</h3>
            <div className="footer-link-list">
              {policyLinks.map(([label, path]) => (
                <Link key={path} to={path}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Casio VN Store. Dữ liệu sản phẩm dùng cho đồ án demo thương mại điện tử.</p>
          <p>GPDKKD: 0109952575 • Hotline: (0243)-910-3333</p>
        </div>
      </div>
    </footer>
  )
}
