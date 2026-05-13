import { mockDb } from '@/lib/server/mock-db'
import { fail, ok, readJson } from '@/lib/server/responses'
import type { OrderStatus } from '@/types'

type Context = {
  params: Promise<{ id: string }>
}

type Body = {
  status?: OrderStatus
}

const statuses: OrderStatus[] = ['pending', 'confirmed', 'shipping', 'completed', 'cancelled']

export async function PATCH(request: Request, context: Context) {
  const { id } = await context.params
  const { status } = await readJson<Body>(request)

  if (!status || !statuses.includes(status)) {
    return fail('Trạng thái đơn hàng không hợp lệ.', 422)
  }

  const order = mockDb.orders.find((item) => item.id === id)
  if (!order) {
    return fail('Không tìm thấy đơn hàng.', 404)
  }

  order.status = status
  order.paymentStatus = status === 'completed' ? 'paid' : order.paymentStatus
  order.updatedAt = new Date().toISOString()

  return ok({ order })
}
