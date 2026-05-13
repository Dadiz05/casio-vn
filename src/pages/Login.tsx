import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from '@/store/useStore'
import { loginSchema, type LoginFormData } from '@/schemas/auth'
import type { User } from '@/types'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { setUser } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onSubmit = async (data: LoginFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Demo login
    let user: User | null = null

    if (data.email === 'admin@casio.vn' && data.password === 'admin123') {
      user = {
        id: '1',
        name: 'Admin Casio',
        email: 'admin@casio.vn',
        role: 'admin',
      }
      setUser(user)
      navigate('/admin')
    } else if (data.email === 'user@casio.vn' && data.password === 'user123') {
      user = {
        id: '2',
        name: 'Nguyễn Văn A',
        email: 'user@casio.vn',
        role: 'user',
      }
      setUser(user)
      navigate('/')
    }
  }

  return (
    <div className="casio-container casio-section min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-6">
      <div className="site-card w-full max-w-md p-7 sm:p-10">
        <div className="text-center mb-10">
          <span className="site-kicker justify-center">Tài khoản</span>
          <h1 className="site-title text-3xl sm:text-4xl mt-2">Đăng nhập</h1>
          <p className="site-copy mt-2">Chào mừng bạn quay trở lại Casio VN</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="admin@casio.vn hoặc user@casio.vn"
              className={`site-field ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="Nhập mật khẩu"
              className={`site-field ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="site-button site-button--primary w-full"
          >
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-[var(--color-surface-raised)] hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
