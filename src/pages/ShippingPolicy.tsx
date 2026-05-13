import { Link } from "react-router-dom";
import { ArrowLeft, Truck, MapPin, Phone } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <div className="casio-container casio-section py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-8"
      >
        <ArrowLeft size={20} />
        Quay lại trang chủ
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Truck size={32} className="text-[#dd3333]" />
          <h1 className="site-title text-4xl">Chính Sách Giao Hàng</h1>
        </div>

        <div className="site-card p-8 space-y-8">
          <section>
            <h2 className="site-title text-2xl mb-4">1. Khu Vực Giao Hàng</h2>
            <div className="space-y-4 text-[var(--color-text-primary)]">
              <p>Casio Việt Nam cung cấp dịch vụ giao hàng toàn quốc:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  Giao hàng tại Hà Nội, Đà Nẵng, TP. Hồ Chí Minh và các tỉnh
                  thành khác
                </li>
                <li>
                  Thời gian giao hàng: 2-5 ngày làm việc (tùy vào khu vực)
                </li>
                <li>Phí giao hàng miễn phí cho đơn hàng từ 2.000.000 ₫</li>
                <li>
                  Đơn hàng dưới 2.000.000 ₫ tính phí giao hàng 30.000 - 50.000 ₫
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">
              2. Phương Thức Giao Hàng
            </h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <p>Chúng tôi hợp tác với các đơn vị vận chuyển uy tín:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Giao hàng tiêu chuẩn (2-5 ngày)</li>
                <li>Giao hàng nhanh (1-2 ngày) - phí tính riêng</li>
                <li>Nhận hàng tại showroom (miễn phí)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">3. Quy Trình Giao Hàng</h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Đơn hàng được xác nhận trong 24 giờ</li>
                <li>Hàng được đóng gói cẩn thận và bảo hiểm giá trị</li>
                <li>
                  Khách hàng sẽ nhận tin nhắn/email cập nhật tình trạng đơn hàng
                </li>
                <li>Giao hàng vào giờ hành chính (08:00 - 18:00)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">4. Lưu Ý Khi Nhận Hàng</h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Kiểm tra tình trạng hàng hóa trước khi ký nhận</li>
                <li>Không nhận nếu thấy hàng bị hư hỏng, bể vỡ</li>
                <li>Giữ hóa đơn và mã tracking cho trường hợp phát sinh</li>
                <li>
                  Liên hệ ngay nếu có vấn đề trong vòng 48h sau khi nhận hàng
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="site-title text-2xl mb-4 flex items-center gap-2">
              <Phone size={24} className="text-[#dd3333]" />
              Liên Hệ Hỗ Trợ
            </h2>
            <div className="space-y-2 text-[var(--color-text-primary)]">
              <p>
                <strong>Hotline giao hàng:</strong> 0943.72.3388
              </p>
              <p>
                <strong>Email:</strong> support@casiovn.com
              </p>
              <p>
                <strong>Thời gian hỗ trợ:</strong> 09:00 - 21:00 (Thứ 2 - Chủ
                Nhật)
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
