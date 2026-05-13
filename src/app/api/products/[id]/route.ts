import { mockDb } from '@/lib/server/mock-db'
import { fail, ok, readJson } from '@/lib/server/responses'
import type { Product } from '@/types'

type Context = {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params
  const product = mockDb.products.find((item) => item.id === id)

  if (!product) {
    return fail('Không tìm thấy sản phẩm.', 404)
  }

  return ok({ product })
}

export async function PATCH(request: Request, context: Context) {
  const { id } = await context.params
  const payload = await readJson<Partial<Product>>(request)
  const index = mockDb.products.findIndex((item) => item.id === id)

  if (index === -1) {
    return fail('Không tìm thấy sản phẩm.', 404)
  }

  mockDb.products[index] = { ...mockDb.products[index], ...payload }
  return ok({ product: mockDb.products[index] })
}

export async function DELETE(_request: Request, context: Context) {
  const { id } = await context.params
  const before = mockDb.products.length
  mockDb.products = mockDb.products.filter((item) => item.id !== id)

  if (mockDb.products.length === before) {
    return fail('Không tìm thấy sản phẩm.', 404)
  }

  return ok({ deleted: true })
}
