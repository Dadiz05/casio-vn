import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Clock, CheckCircle } from "lucide-react";

export default function ReturnPolicy() {
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
          <RotateCcw size={32} className="text-[#dd3333]" />
          <h1 className="site-title text-4xl">Chính Sách Đổi Hàng</h1>
        </div>

        <div className="site-card p-8 space-y-8">
          <section>
            <h2 className="site-title text-2xl mb-4">1. Điều Kiện Đổi Hàng</h2>
            <div className="space-y-4 text-[var(--color-text-primary)]">
              <p>Sản phẩm có thể đổi nếu đáp ứng các điều kiện sau:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Đổi hàng trong vòng 30 ngày kể từ khi nhận hàng</li>
                <li>Sản phẩm chưa qua sử dụng hoặc chỉ thử gắn</li>
                <li>Vẫn còn nguyên bao bì, hộp, chứng chỉ bảo hành</li>
                <li>Không bị trầy xước, bỏng, bê bết bức xạ</li>
                <li>Chỉ áp dụng cho lỗi sản phẩm do nhà sản xuất</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">2. Quy Trình Đổi Hàng</h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <div className="flex gap-3 mb-3">
                <div className="bg-[#dd3333] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
                  1
                </div>
                <div>
                  <strong>Liên hệ hỗ trợ</strong> trong vòng 48h sau khi nhận
                  hàng
                </div>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="bg-[#dd3333] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
                  2
                </div>
                <div>
                  <strong>Chuẩn bị hàng</strong> với bao bì, hộp, giấy tờ ban
                  đầu
                </div>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="bg-[#dd3333] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
                  3
                </div>
                <div>
                  <strong>Gửi lại</strong> sản phẩm cũ (phí giao hàng khách trả)
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-[#dd3333] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-semibold">
                  4
                </div>
                <div>
                  <strong>Nhận sản phẩm mới</strong> sau khi xác minh (miễn phí
                  giao hàng)
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">
              3. Trường Hợp Không Được Đổi
            </h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Sản phẩm đã qua sử dụng hoặc có vết dùng</li>
                <li>Hết thời hạn 30 ngày kể từ ngày nhận hàng</li>
                <li>Sản phẩm bị hư hỏng do lỗi khách hàng</li>
                <li>
                  Không có hóa đơn mua hàng hoặc không có chứng chỉ bảo hành
                </li>
                <li>
                  Sản phẩm không đúng hình ảnh giới thiệu (khác màu/model tự
                  chọn)
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="site-title text-2xl mb-4 flex items-center gap-2">
              <CheckCircle size={24} className="text-[#dd3333]" />
              Chính Sách Ưu Đãi
            </h2>
            <p className="text-[var(--color-text-primary)]">
              Nếu đổi hàng mà sản phẩm mới có giá cao hơn, khách hàng chỉ cần
              thanh toán thêm chênh lệch. Nếu sản phẩm mới có giá thấp hơn, sẽ
              không hoàn lại tiền chênh lệch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
