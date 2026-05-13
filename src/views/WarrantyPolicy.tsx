'use client'

import { ShieldCheck } from 'lucide-react'
import PolicyPage from '@/components/common/PolicyPage'

export default function WarrantyPolicy() {
  return (
    <PolicyPage
      icon={<ShieldCheck size={34} />}
      kicker="Bảo hành chính hãng"
      title="Chính sách bảo hành"
      description="Bảo hành điện tử cho đồng hồ Casio chính hãng, quy trình tiếp nhận rõ ràng và có cập nhật trạng thái."
      highlights={[
        { label: 'Thời hạn', value: '24 tháng' },
        { label: 'Kiểm tra', value: 'Miễn phí' },
        { label: 'Xử lý', value: '5-7 ngày' },
      ]}
      sections={[
        {
          title: 'Phạm vi bảo hành',
          items: [
            'Lỗi kỹ thuật do nhà sản xuất',
            'Kiểm tra bộ máy và tình trạng vận hành',
            'Hỗ trợ thay thế nếu không thể sửa chữa',
          ],
        },
        {
          title: 'Điều kiện áp dụng',
          items: [
            'Còn thời hạn bảo hành',
            'Có chứng từ mua hàng hoặc thông tin bảo hành điện tử',
            'Số seri rõ ràng và chưa bị chỉnh sửa',
          ],
        },
        {
          title: 'Không thuộc bảo hành',
          items: [
            'Hư hỏng do rơi vỡ, va đập hoặc dùng sai cách',
            'Vào nước vượt mức chống nước công bố',
            'Tự ý sửa tại nơi không được ủy quyền',
          ],
        },
        {
          title: 'Quy trình tiếp nhận',
          items: [
            'Mang sản phẩm đến showroom',
            'Kỹ thuật viên kiểm tra tình trạng',
            'Thông báo phương án xử lý',
            'Nhận lại sản phẩm sau khi hoàn tất',
          ],
        },
      ]}
      noteTitle="Kích hoạt bảo hành"
      note="Giữ lại hóa đơn và thông tin serial để việc bảo hành được tiếp nhận nhanh hơn."
    />
  )
}
