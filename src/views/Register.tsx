'use client'

import { useEffect } from 'react'
import { Link, useNavigate } from '@/lib/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useStore } from '@/store/useStore'
import { registerSchema, type RegisterFormData } from '@/schemas/auth'
import { useState } from 'react'
import { postJson } from '@/lib/client-api'
import type { User } from '@/types'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const { setUser, addUser } = useStore()
  const navigate = useNavigate()
  const [registerError, setRegisterError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onSubmit = async (data: RegisterFormData) => {
    setRegisterError('')

    try {
      const result = await postJson<{ user: User }>('/api/auth/register', data)
      addUser(result.user)
      setUser(result.user)
      navigate('/')
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : 'Không đăng ký được.')
    }
  }

  return (
    <div className="casio-container casio-section min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-6">
      <div className="site-card w-full max-w-md p-7 sm:p-10">
        <div className="text-center mb-10">
          <span className="site-kicker justify-center">Tài khoản</span>
          <h1 className="site-title text-3xl sm:text-4xl mt-2">Đăng ký</h1>
          <p className="site-copy mt-2">Tạo tài khoản mới tại Casio VN</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="register-name"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
            >
              Tên đầy đủ
            </label>
            <input
              id="register-name"
              type="text"
              {...register('name')}
              placeholder="Nhập tên của bạn"
              className={`site-field ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
            >
              Email
            </label>
            <input
              id="register-email"
              type="email"
              {...register('email')}
              placeholder="Nhập email"
              className={`site-field ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
            >
              Mật khẩu
            </label>
            <input
              id="register-password"
              type="password"
              {...register('password')}
              placeholder="Nhập mật khẩu"
              className={`site-field ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="register-confirm-password"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
            >
              Xác nhận mật khẩu
            </label>
            <input
              id="register-confirm-password"
              type="password"
              {...register('confirmPassword')}
              placeholder="Nhập lại mật khẩu"
              className={`site-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="site-button site-button--primary w-full"
          >
            {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
          {registerError && <p className="text-red-600 text-sm text-center">{registerError}</p>}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-[var(--color-surface-raised)] hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
