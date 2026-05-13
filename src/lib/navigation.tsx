'use client'

import NextLink from 'next/link'
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import type { ComponentProps, ReactNode } from 'react'

type RouteTarget = string | { pathname: string; search?: string }

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to: RouteTarget
}

type NavLinkProps = Omit<LinkProps, 'className'> & {
  className?: string | ((state: { isActive: boolean }) => string)
  children: ReactNode
}

const hrefFromTarget = (to: RouteTarget) => {
  if (typeof to === 'string') return to
  return `${to.pathname}${to.search ?? ''}`
}

export function Link({ to, ...props }: LinkProps) {
  return <NextLink href={hrefFromTarget(to)} {...props} />
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function NavLink({ to, className, children, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const href = hrefFromTarget(to)
  const targetPath = href.split('?')[0] || '/'
  const isActive = targetPath === '/' ? pathname === '/' : pathname.startsWith(targetPath)
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className

  return (
    <NextLink href={href} className={resolvedClassName} {...props}>
      {children}
    </NextLink>
  )
}

export function useNavigate() {
  const router = useRouter()

  return (to: RouteTarget, options?: { replace?: boolean }) => {
    const href = hrefFromTarget(to)
    if (options?.replace) {
      router.replace(href)
      return
    }

    router.push(href)
  }
}

export function useLocation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()

  return {
    pathname,
    search: search ? `?${search}` : '',
  }
}

export function useParams() {
  return useNextParams<Record<string, string>>()
}
