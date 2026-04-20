import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Eye, Shield } from "lucide-react";

export default function PrivacyPolicy() {
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
          <Lock size={32} className="text-[#dd3333]" />
          <h1 className="site-title text-4xl">Chính Sách Bảo Mật</h1>
        </div>

        <div className="site-card p-8 space-y-8">
          <section>
            <h2 className="site-title text-2xl mb-4">1. Cam Kết Bảo Mật</h2>
            <div className="space-y-4 text-[var(--color-text-primary)]">
              <p>
                Công ty TNHH Casio Việt Nam cam kết bảo vệ quyền riêng tư và an
                toàn thông tin cá nhân của tất cả khách hàng. Chúng tôi tuân thủ
                các quy định về bảo vệ dữ liệu cá nhân theo luật pháp Việt Nam.
              </p>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">
              2. Thông Tin Chúng Tôi Thu Thập
            </h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <p>
                Khi bạn mua hàng hoặc đăng ký tài khoản, chúng tôi có thể thu
                thập:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  Thông tin cá nhân: Họ tên, số điện thoại, email, địa chỉ
                </li>
                <li>
                  Thông tin thanh toán: Số thẻ tín dụng, tài khoản ngân hàng
                  (được mã hóa)
                </li>
                <li>Lịch sử mua hàng và sở thích sản phẩm</li>
                <li>Địa chỉ IP, loại trình duyệt, hệ điều hành</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">
              3. Cách Chúng Tôi Sử Dụng Thông Tin
            </h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Xử lý đơn hàng và giao hàng sản phẩm</li>
                <li>Gửi thông báo về đơn hàng, khuyến mãi, cập nhật mới</li>
                <li>Cải thiện dịch vụ khách hàng và trải nghiệm người dùng</li>
                <li>Phân tích hành vi khách hàng để phục vụ tốt hơn</li>
                <li>Tuân thủ các yêu cầu pháp lý</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">4. Bảo Vệ Thông Tin</h2>
            <div className="space-y-4 text-[var(--color-text-primary)]">
              <p>Chúng tôi sử dụng các biện pháp bảo mật:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Mã hóa SSL/TLS cho tất cả giao dịch trực tuyến</li>
                <li>Mật khẩu được mã hóa bằng các thuật toán hiện đại</li>
                <li>
                  Hạn chế truy cập vào cơ sở dữ liệu chứa thông tin nhạy cảm
                </li>
                <li>Kiểm tra bảo mật định kỳ</li>
                <li>Tuân thủ các tiêu chuẩn bảo mật quốc tế</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">5. Chia Sẻ Thông Tin</h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <p>
                Chúng tôi <strong>KHÔNG chia sẻ</strong> thông tin cá nhân của
                bạn với bên thứ ba, ngoại trừ:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Những đối tác vận chuyển (để giao hàng)</li>
                <li>Những đối tác thanh toán (xử lý giao dịch)</li>
                <li>Khi được pháp luật yêu cầu</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">
              6. Quyền Của Khách Hàng
            </h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <p>Bạn có quyền:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Xem, kiểm tra thông tin cá nhân của mình</li>
                <li>Yêu cầu chỉnh sửa hoặc cập nhật thông tin sai</li>
                <li>Hủy bỏ đăng ký nhận email quảng cáo</li>
                <li>Yêu cầu xóa tài khoản và dữ liệu cá nhân</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="site-title text-lg mb-4 flex items-center gap-2">
              <Shield size={24} className="text-[#dd3333]" />
              Liên Hệ Về Bảo Mật
            </h2>
            <p className="text-[var(--color-text-primary)] mb-3">
              Nếu bạn có thắc mắc hoặc quan ngại về bảo mật dữ liệu, vui lòng
              liên hệ:
            </p>
            <div className="space-y-1 text-[var(--color-text-primary)]">
              <p>
                <strong>Email:</strong> privacy@casiovn.com
              </p>
              <p>
                <strong>Điện thoại:</strong> 0243-910-3333
              </p>
              <p>
                <strong>Địa chỉ:</strong> 170 Xã Đàn, Phường Văn Miếu - Quốc Tử
                Giám, TP. Hà Nội
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
