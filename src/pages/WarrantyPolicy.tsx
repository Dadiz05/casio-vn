import { Link } from "react-router-dom";
import { ArrowLeft, Shield, AlertCircle, FileCheck } from "lucide-react";

export default function WarrantyPolicy() {
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
          <Shield size={32} className="text-[#dd3333]" />
          <h1 className="site-title text-4xl">Chính Sách Bảo Hành</h1>
        </div>

        <div className="site-card p-8 space-y-8">
          <section>
            <h2 className="site-title text-2xl mb-4">1. Thời Gian Bảo Hành</h2>
            <div className="space-y-4 text-[var(--color-text-primary)]">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-[#dd3333]">
                <p>
                  <strong>Bảo hành chính hãng:</strong> 24 tháng kể từ ngày mua
                  hàng
                </p>
              </div>
              <p>Bảo hành bao gồm:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Sửa chữa miễn phí lỗi do nhà sản xuất</li>
                <li>Thay thế sản phẩm nếu không thể sửa chữa</li>
                <li>Kiểm tra kỹ thuật miễn phí</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">2. Điều Kiện Bảo Hành</h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <p className="font-semibold">Sản phẩm được bảo hành nếu:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Còn trong thời hạn 24 tháng</li>
                <li>Có chứng chỉ bảo hành nguyên vẹn, chưa sửa chữa</li>
                <li>Lỗi do nhà sản xuất, không do va đập, ngâm nước</li>
                <li>Số seri không bị xóa hoặc chỉnh sửa</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">
              3. Trường Hợp Không Được Bảo Hành
            </h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Hết thời hạn 24 tháng bảo hành</li>
                <li>Sản phẩm bị hư hỏng do va đập, rơi, ngâm nước</li>
                <li>Bị lỏng dịch chất lạ, có vết bỏng xạ</li>
                <li>
                  Không có chứng chỉ bảo hành hoặc chứng chỉ bị xóa/chỉnh sửa
                </li>
                <li>Sản phẩm đã được sửa chữa bởi cơ sở không được ủy quyền</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="site-title text-2xl mb-4">4. Quy Trình Bảo Hành</h2>
            <div className="space-y-3 text-[var(--color-text-primary)]">
              <div className="flex gap-3 mb-3">
                <FileCheck
                  size={20}
                  className="text-[#dd3333] flex-shrink-0 mt-1"
                />
                <div>
                  <strong>Bước 1:</strong> Mang sản phẩm + chứng chỉ bảo hành
                  đến showroom
                </div>
              </div>
              <div className="flex gap-3 mb-3">
                <FileCheck
                  size={20}
                  className="text-[#dd3333] flex-shrink-0 mt-1"
                />
                <div>
                  <strong>Bước 2:</strong> Kỹ thuật viên kiểm tra tình trạng
                </div>
              </div>
              <div className="flex gap-3 mb-3">
                <FileCheck
                  size={20}
                  className="text-[#dd3333] flex-shrink-0 mt-1"
                />
                <div>
                  <strong>Bước 3:</strong> Sửa chữa trong vòng 5-7 ngày làm việc
                </div>
              </div>
              <div className="flex gap-3">
                <FileCheck
                  size={20}
                  className="text-[#dd3333] flex-shrink-0 mt-1"
                />
                <div>
                  <strong>Bước 4:</strong> Nhận lại sản phẩm đã sửa
                </div>
              </div>
            </div>
          </section>

          <section className="bg-yellow-50 p-6 rounded-lg border-l-4 border-[#dd3333]">
            <h2 className="site-title text-lg mb-3 flex items-center gap-2">
              <AlertCircle size={20} className="text-[#dd3333]" />
              Lưu Ý Quan Trọng
            </h2>
            <p className="text-[var(--color-text-primary)]">
              Để bảo hành được cấp và hiệu lực, vui lòng yêu cầu nhân viên bán
              hàng điền đầy đủ thông tin trên chứng chỉ bảo hành (tên khách, số
              seri sản phẩm, ngày mua). Chứng chỉ bảo hành phải được ký tên và
              dấu của cửa hàng.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
