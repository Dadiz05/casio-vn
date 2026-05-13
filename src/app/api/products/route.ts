import { mockDb } from '@/lib/server/mock-db'
import { fail, ok, readJson } from '@/lib/server/responses'
import type { Product } from '@/types'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search')?.trim().toLowerCase()
  const category = url.searchParams.get('category')
  const movement = url.searchParams.get('movement')
  const gender = url.searchParams.get('gender')

  let products = [...mockDb.products]

  if (search) {
    products = products.filter((product) =>
      [product.name, product.sku, product.category, product.description, ...(product.tags ?? [])]
        .join(' ')
        .toLowerCase()
        .includes(search)
    )
  }

  if (category) products = products.filter((product) => product.category === category)
  if (movement) products = products.filter((product) => product.movement === movement)
  if (gender) products = products.filter((product) => product.gender === gender)

  return ok({ products })
}

export async function POST(request: Request) {
  const product = await readJson<Product>(request)

  if (!product.id || !product.name || !product.sku) {
    return fail('Thiếu id, SKU hoặc tên sản phẩm.', 422)
  }

  if (mockDb.products.some((item) => item.id === product.id || item.sku === product.sku)) {
    return fail('Sản phẩm hoặc SKU đã tồn tại.', 409)
  }

  mockDb.products.unshift(product)
  return ok({ product }, 201)
}
