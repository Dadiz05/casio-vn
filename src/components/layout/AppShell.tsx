'use client'

import { useEffect, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingContact from './FloatingContact'
import { QueryProvider } from '@/lib/query-provider'

type Props = {
  children: ReactNode
}

function ScrollToTopOnRouteChange() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function AppShell({ children }: Props) {
  return (
    <QueryProvider>
      <div className="casio-shell min-h-screen flex flex-col">
        <ScrollToTopOnRouteChange />
        <Navbar />

        <main className="flex-1 pt-16">{children}</main>

        <Footer />
        <FloatingContact />
      </div>
    </QueryProvider>
  )
}
