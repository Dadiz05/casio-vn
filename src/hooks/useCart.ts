import { useMemo } from 'react'
import { useStore } from '@/store/useStore'
import type { Product } from '@/types'

interface UseCartReturn {
  items: (Product & { quantity: number })[]
  total: number
  itemCount: number
}

export default function useCart(): UseCartReturn {
  const { cart } = useStore()

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  )

  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

  return { items: cart, total, itemCount }
}
