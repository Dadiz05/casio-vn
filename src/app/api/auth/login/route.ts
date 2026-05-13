import { loginSchema } from '@/schemas/auth'
import { findUserByEmail, withoutSensitiveUserFields } from '@/lib/server/mock-db'
import { fail, readJson } from '@/lib/server/responses'
import { setAuthCookies } from '@/lib/server/auth'
import { NextResponse } from 'next/server'

type LoginBody = {
  email?: string
  password?: string
}

export async function POST(request: Request) {
  const body = await readJson<LoginBody>(request)
  const parsed = loginSchema.safeParse(body)

  if (!parsed.success) {
    return fail(
      'Validation failed',
      422,
      parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))
    )
  }

  const user = findUserByEmail(parsed.data.email)
  const validPassword =
    (user?.email === 'admin@casio.vn' && parsed.data.password === 'admin123') ||
    (user?.email === 'user@casio.vn' && parsed.data.password === 'user123') ||
    Boolean(user && user.role === 'user' && parsed.data.password.length >= 6)

  if (!user || !validPassword || user.status === 'inactive') {
    return fail('Email hoặc mật khẩu không đúng, hoặc tài khoản đã bị khóa.', 401)
  }

  const response = NextResponse.json({
    success: true,
    data: { user: withoutSensitiveUserFields(user) },
  })
  await setAuthCookies(response, user)
  return response
}
