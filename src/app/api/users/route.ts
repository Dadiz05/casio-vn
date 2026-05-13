import { mockDb, withoutSensitiveUserFields } from '@/lib/server/mock-db'
import { fail, ok, readJson } from '@/lib/server/responses'
import type { User } from '@/types'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search')?.trim().toLowerCase()
  const role = url.searchParams.get('role')

  let users = mockDb.users.map(withoutSensitiveUserFields)
  if (search) {
    users = users.filter((user) => [user.name, user.email].join(' ').toLowerCase().includes(search))
  }
  if (role) users = users.filter((user) => user.role === role)

  return ok({ users })
}

export async function POST(request: Request) {
  const user = await readJson<User>(request)

  if (!user.id || !user.name || !user.email || !user.role) {
    return fail('Người dùng thiếu thông tin bắt buộc.', 422)
  }

  if (mockDb.users.some((item) => item.email.toLowerCase() === user.email.toLowerCase())) {
    return fail('Email đã tồn tại.', 409)
  }

  mockDb.users.unshift(user)
  return ok({ user: withoutSensitiveUserFields(user) }, 201)
}
