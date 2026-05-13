import { mockDb } from '@/lib/server/mock-db'
import { fail, ok, readJson } from '@/lib/server/responses'
import type { Order } from '@/types'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const status = url.searchParams.get('status')
  const customerId = url.searchParams.get('customerId')

  let orders = [...mockDb.orders]
  if (status) orders = orders.filter((order) => order.status === status)
  if (customerId) orders = orders.filter((order) => order.customerId === customerId)

  return ok({ orders })
}

export async function POST(request: Request) {
  const order = await readJson<Order>(request)

  if (!order.id || !order.customerName || !order.items?.length) {
    return fail('Đơn hàng thiếu thông tin bắt buộc.', 422)
  }

  mockDb.orders.unshift(order)
  return ok({ order }, 201)
}
