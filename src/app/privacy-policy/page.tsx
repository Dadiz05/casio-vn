import type { Metadata } from 'next'
import PrivacyPolicy from '@/views/PrivacyPolicy'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật',
  description: 'Chính sách bảo mật thông tin người dùng tại Casio VN Store.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />
}
