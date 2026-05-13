import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { REFRESH_COOKIE, setAuthCookies, verifyAuthToken } from '@/lib/server/auth'
import { fail } from '@/lib/server/responses'
import { mockDb, withoutSensitiveUserFields } from '@/lib/server/mock-db'

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value
  const session = await verifyAuthToken(refreshToken, 'refresh')

  if (!session) {
    return fail('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.', 401)
  }

  const user = mockDb.users.find((item) => item.id === session.sub)
  if (!user || user.status === 'inactive') {
    return fail('Tài khoản không còn hợp lệ.', 401)
  }

  const response = NextResponse.json({
    success: true,
    data: { user: withoutSensitiveUserFields(user) },
  })
  await setAuthCookies(response, user)
  return response
}
