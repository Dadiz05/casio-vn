import { cookies } from 'next/headers'
import { ACCESS_COOKIE, verifyAuthToken } from '@/lib/server/auth'
import { fail, ok } from '@/lib/server/responses'
import { mockDb, withoutSensitiveUserFields } from '@/lib/server/mock-db'

export async function GET() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value
  const session = await verifyAuthToken(accessToken, 'access')

  if (!session) {
    return fail('Unauthenticated', 401)
  }

  const user = mockDb.users.find((item) => item.id === session.sub)
  if (!user) {
    return fail('User not found', 404)
  }

  return ok({ user: withoutSensitiveUserFields(user) })
}
