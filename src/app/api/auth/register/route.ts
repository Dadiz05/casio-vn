import { NextResponse } from 'next/server'
import { registerSchema } from '@/schemas/auth'
import { setAuthCookies } from '@/lib/server/auth'
import { findUserByEmail, mockDb, withoutSensitiveUserFields } from '@/lib/server/mock-db'
import { fail, readJson } from '@/lib/server/responses'
import type { User } from '@/types'

type RegisterBody = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export async function POST(request: Request) {
  const body = await readJson<RegisterBody>(request)
  const parsed = registerSchema.safeParse(body)

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

  if (findUserByEmail(parsed.data.email)) {
    return fail('Email này đã được đăng ký.', 409)
  }

  const user: User = {
    id: String(mockDb.users.length + 1),
    name: parsed.data.name,
    email: parsed.data.email,
    role: 'user',
    status: 'active',
    createdAt: new Date().toISOString(),
  }

  mockDb.users.unshift(user)

  const response = NextResponse.json(
    { success: true, data: { user: withoutSensitiveUserFields(user) } },
    { status: 201 }
  )
  await setAuthCookies(response, user)
  return response
}
