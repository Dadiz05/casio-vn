import { useState, useMemo } from 'react'
import useDebounce from './useDebounce'
import type { Product } from '@/types'

interface SearchOptions {
  debounceMs?: number
  maxResults?: number
}

interface SearchReturn {
  query: string
  setQuery: (q: string) => void
  results: Product[]
  isSearching: boolean
}

export default function useSearch(
  products: Product[] = [],
  { debounceMs = 300, maxResults = 8 }: SearchOptions = {}
): SearchReturn {
  const [query, setQuery] = useState<string>('')
  const debouncedQuery = useDebounce<string>(query, debounceMs)

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    if (!q) return []

    return products
      .filter((p) => {
        const name = (p.name || '').toLowerCase()
        const category = (p.category || '').toLowerCase()
        return name.includes(q) || category.includes(q)
      })
      .slice(0, maxResults)
  }, [debouncedQuery, products, maxResults])

  return {
    query,
    setQuery,
    results,
    isSearching: debouncedQuery.trim().length > 0,
  }
}
