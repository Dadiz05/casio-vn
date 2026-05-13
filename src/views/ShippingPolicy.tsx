'use client'

import { Truck } from 'lucide-react'
import PolicyPage from '@/components/common/PolicyPage'

export default function ShippingPolicy() {
  return (
    <PolicyPage
      icon={<Truck size={34} />}
      kicker="Hỗ trợ giao hàng"
      title="Chính sách giao hàng"
      description="Quy trình giao nhận rõ ràng, cập nhật trạng thái đơn và đóng gói an toàn cho đồng hồ Casio chính hãng."
      highlights={[
        { label: 'Phạm vi', value: 'Toàn quốc' },
        { label: 'Thời gian', value: '2-5 ngày' },
        { label: 'Miễn phí', value: 'Từ 2 triệu' },
      ]}
      sections={[
        {
          title: 'Khu vực giao hàng',
          body: 'Casio VN Store hỗ trợ giao hàng tới Hà Nội, Đà Nẵng, TP. Hồ Chí Minh và các tỉnh thành.',
          items: [
            'Giao nội thành nhanh hơn tùy khu vực',
            'Đơn dưới 2 triệu áp dụng phí 30.000 - 50.000 đ',
            'Có thể nhận tại showroom',
          ],
        },
        {
          title: 'Quy trình xử lý',
          items: [
            'Xác nhận đơn trong 24 giờ',
            'Đóng gói chống sốc và niêm phong hộp',
            'Gửi mã theo dõi đơn cho khách hàng',
          ],
        },
        {
          title: 'Khi nhận hàng',
          items: [
            'Kiểm tra hộp và phụ kiện trước khi ký nhận',
            'Không nhận nếu kiện hàng móp méo bất thường',
            'Liên hệ trong 48 giờ nếu có phát sinh',
          ],
        },
      ]}
      noteTitle="Theo dõi đơn hàng"
      note="Cần kiểm tra trạng thái giao hàng hoặc đổi lịch nhận? Gọi hotline để được hỗ trợ nhanh."
    />
  )
}
