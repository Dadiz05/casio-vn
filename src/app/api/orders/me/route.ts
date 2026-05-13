import { cookies } from 'next/headers'
import { ACCESS_COOKIE, verifyAuthToken } from '@/lib/server/auth'
import { mockDb } from '@/lib/server/mock-db'
import { fail, ok } from '@/lib/server/responses'

export async function GET() {
  const cookieStore = await cookies()
  const session = await verifyAuthToken(cookieStore.get(ACCESS_COOKIE)?.value, 'access')

  if (!session) {
    return fail('Unauthenticated', 401)
  }

  return ok({ orders: mockDb.orders.filter((order) => order.customerId === session.sub) })
}
