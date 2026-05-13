'use client'

import { LockKeyhole } from 'lucide-react'
import PolicyPage from '@/components/common/PolicyPage'

export default function PrivacyPolicy() {
  return (
    <PolicyPage
      icon={<LockKeyhole size={34} />}
      kicker="An toàn dữ liệu"
      title="Chính sách bảo mật"
      description="Cam kết bảo vệ thông tin cá nhân, dữ liệu đơn hàng và lịch sử mua sắm của khách hàng."
      highlights={[
        { label: 'Dữ liệu', value: 'Tối thiểu' },
        { label: 'Giao dịch', value: 'Bảo mật' },
        { label: 'Chia sẻ', value: 'Có kiểm soát' },
      ]}
      sections={[
        {
          title: 'Thông tin thu thập',
          items: [
            'Họ tên, số điện thoại, email và địa chỉ giao hàng',
            'Lịch sử đơn hàng và sản phẩm yêu thích',
            'Thông tin kỹ thuật cần thiết để vận hành website',
          ],
        },
        {
          title: 'Mục đích sử dụng',
          items: [
            'Xử lý đơn hàng và giao hàng',
            'Cập nhật trạng thái mua hàng',
            'Cải thiện dịch vụ tư vấn và trải nghiệm người dùng',
          ],
        },
        {
          title: 'Bảo vệ thông tin',
          items: [
            'Không hiển thị thông tin nhạy cảm công khai',
            'Giới hạn dữ liệu gửi tới các tính năng AI',
            'Chỉ chia sẻ với đối tác vận chuyển khi cần giao hàng',
          ],
        },
        {
          title: 'Quyền của khách hàng',
          items: [
            'Yêu cầu chỉnh sửa thông tin sai',
            'Hủy nhận nội dung quảng cáo',
            'Yêu cầu hỗ trợ xóa hoặc cập nhật tài khoản',
          ],
        },
      ]}
      noteTitle="Câu hỏi về bảo mật"
      note="Nếu bạn cần kiểm tra hoặc cập nhật dữ liệu cá nhân, hãy liên hệ đội hỗ trợ."
    />
  )
}
