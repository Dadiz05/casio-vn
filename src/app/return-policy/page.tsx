import type { Metadata } from 'next'
import ReturnPolicy from '@/views/ReturnPolicy'

export const metadata: Metadata = {
  title: 'Chính sách đổi trả',
  description: 'Thông tin đổi trả sản phẩm tại Casio VN Store.',
  alternates: {
    canonical: '/return-policy',
  },
}

export default function ReturnPolicyPage() {
  return <ReturnPolicy />
}
