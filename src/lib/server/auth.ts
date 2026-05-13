import { SignJWT } from 'jose/jwt/sign'
import { jwtVerify } from 'jose/jwt/verify'
import type { NextResponse } from 'next/server'
import type { User, UserRole } from '@/types'

export const ACCESS_COOKIE = 'casio_access_token'
export const REFRESH_COOKIE = 'casio_refresh_token'

export type AuthTokenPayload = {
  sub: string
  email: string
  name: string
  role: UserRole
  type: 'access' | 'refresh'
}

const getSecret = () => {
  const secret =
    process.env.AUTH_SECRET ||
    process.env.JWT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    'casio-vn-store-dev-secret-change-in-production'

  return new TextEncoder().encode(secret)
}

export async function signAuthToken(user: User, type: 'access' | 'refresh') {
  return new SignJWT({
    email: user.email,
    name: user.name,
    role: user.role,
    type,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(type === 'access' ? '15m' : '7d')
    .sign(getSecret())
}

export async function verifyAuthToken(token?: string, expectedType?: 'access' | 'refresh') {
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getSecret())
    const parsed = payload as unknown as AuthTokenPayload
    if (expectedType && parsed.type !== expectedType) return null
    if (!parsed.sub || !parsed.email || !parsed.role) return null
    return parsed
  } catch {
    return null
  }
}

export async function setAuthCookies(response: NextResponse, user: User) {
  const accessToken = await signAuthToken(user, 'access')
  const refreshToken = await signAuthToken(user, 'refresh')

  response.cookies.set(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 15 * 60,
  })

  response.cookies.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  })
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(ACCESS_COOKIE, '', { path: '/', maxAge: 0 })
  response.cookies.set(REFRESH_COOKIE, '', { path: '/', maxAge: 0 })
}
