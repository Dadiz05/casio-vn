import { useMemo } from 'react'
import { useStore } from '@/store/useStore'
import { calculateCartSummary } from '@/lib/cart'
import type { CartItem } from '@/types'

interface UseCartReturn {
  items: CartItem[]
  total: number
  itemCount: number
}

export default function useCart(): UseCartReturn {
  const { cart } = useStore()

  const summary = useMemo(() => calculateCartSummary(cart), [cart])

  return { items: cart, total: summary.total, itemCount: summary.itemCount }
}
