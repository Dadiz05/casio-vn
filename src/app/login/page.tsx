import type { Metadata } from 'next'
import Login from '@/views/Login'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập tài khoản Casio VN Store.',
  alternates: {
    canonical: '/login',
  },
}

export default function LoginPage() {
  return <Login />
}
