import { NextResponse, type NextRequest } from 'next/server'
import { ACCESS_COOKIE, verifyAuthToken } from '@/lib/server/auth'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get(ACCESS_COOKIE)?.value
  const session = await verifyAuthToken(token, 'access')

  if (pathname.startsWith('/admin')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (session.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (pathname.startsWith('/api/admin') && session?.role !== 'admin') {
    return NextResponse.json({ success: false, message: 'Forbidden', errors: [] }, { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
