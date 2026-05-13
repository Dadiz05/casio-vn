import type { Metadata } from 'next'
import WarrantyPolicy from '@/views/WarrantyPolicy'

export const metadata: Metadata = {
  title: 'Chính sách bảo hành',
  description: 'Thông tin bảo hành đồng hồ Casio chính hãng.',
  alternates: {
    canonical: '/warranty-policy',
  },
}

export default function WarrantyPolicyPage() {
  return <WarrantyPolicy />
}
