import { mockDb, withoutSensitiveUserFields } from '@/lib/server/mock-db'
import { fail, ok, readJson } from '@/lib/server/responses'
import type { User } from '@/types'

type Context = {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, context: Context) {
  const { id } = await context.params
  const payload = await readJson<Partial<User>>(request)
  const user = mockDb.users.find((item) => item.id === id)

  if (!user) {
    return fail('Không tìm thấy người dùng.', 404)
  }

  Object.assign(user, payload, { updatedAt: new Date().toISOString() })
  return ok({ user: withoutSensitiveUserFields(user) })
}

export async function DELETE(_request: Request, context: Context) {
  const { id } = await context.params
  const before = mockDb.users.length
  mockDb.users = mockDb.users.filter((item) => item.id !== id)

  if (mockDb.users.length === before) {
    return fail('Không tìm thấy người dùng.', 404)
  }

  return ok({ deleted: true })
}
