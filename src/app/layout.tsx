import type { Metadata } from 'next'
import { Suspense, type ReactNode } from 'react'
import AppShell from '@/components/layout/AppShell'
import '@/styles/index.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Casio VN Store',
    template: '%s | Casio VN Store',
  },
  description: 'Web app thương mại điện tử bán đồng hồ Casio chính hãng tại Việt Nam.',
  openGraph: {
    title: 'Casio VN Store',
    description: 'Khám phá, tìm kiếm và mua đồng hồ Casio chính hãng.',
    url: '/',
    siteName: 'Casio VN Store',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
}

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning>
        <Suspense fallback={null}>
          <AppShell>{children}</AppShell>
        </Suspense>
      </body>
    </html>
  )
}
