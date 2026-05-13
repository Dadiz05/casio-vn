'use client'

import { RotateCcw } from 'lucide-react'
import PolicyPage from '@/components/common/PolicyPage'

export default function ReturnPolicy() {
  return (
    <PolicyPage
      icon={<RotateCcw size={34} />}
      kicker="Đổi hàng minh bạch"
      title="Chính sách đổi hàng"
      description="Hỗ trợ đổi sản phẩm khi còn nguyên tình trạng, đầy đủ hộp phụ kiện và đáp ứng điều kiện kiểm tra."
      highlights={[
        { label: 'Thời hạn', value: '30 ngày' },
        { label: 'Phản hồi', value: 'Trong 48h' },
        { label: 'Tình trạng', value: 'Nguyên vẹn' },
      ]}
      sections={[
        {
          title: 'Điều kiện đổi hàng',
          items: [
            'Sản phẩm chưa qua sử dụng hoặc chỉ thử đeo',
            'Còn hộp, phụ kiện và chứng từ mua hàng',
            'Không trầy xước, rơi vỡ hoặc can thiệp kỹ thuật',
          ],
        },
        {
          title: 'Quy trình đổi hàng',
          items: [
            'Liên hệ hỗ trợ để ghi nhận yêu cầu',
            'Gửi hình ảnh tình trạng sản phẩm',
            'Mang hoặc gửi sản phẩm về showroom',
            'Nhận sản phẩm thay thế sau khi xác minh',
          ],
        },
        {
          title: 'Trường hợp không áp dụng',
          items: [
            'Quá thời hạn đổi hàng',
            'Sản phẩm hư hỏng do sử dụng sai cách',
            'Thiếu hộp hoặc giấy tờ ban đầu',
            'Yêu cầu đổi do khác kỳ vọng cá nhân sau khi đã sử dụng',
          ],
        },
      ]}
      noteTitle="Cần đổi mẫu khác?"
      note="Đội hỗ trợ sẽ kiểm tra điều kiện và tư vấn mẫu thay thế phù hợp ngân sách của bạn."
    />
  )
}
