import '@testing-library/jest-dom'
import React from 'react'
import { TextDecoder, TextEncoder } from 'util'

Object.assign(globalThis, {
  TextDecoder,
  TextEncoder,
})

Object.defineProperty(window, 'scrollTo', {
  value: () => undefined,
  writable: true,
})

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string | { pathname?: string }
    children: React.ReactNode
  }) =>
    React.createElement(
      'a',
      { href: typeof href === 'string' ? href : href.pathname, ...props },
      children
    ),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) =>
    React.createElement('img', { src, alt, ...props }),
}))

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({ id: '1' }),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}))
