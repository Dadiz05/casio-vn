import type { Metadata } from 'next'
import Register from '@/views/Register'

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Tạo tài khoản người dùng Casio VN Store.',
  alternates: {
    canonical: '/register',
  },
}

export default function RegisterPage() {
  return <Register />
}
