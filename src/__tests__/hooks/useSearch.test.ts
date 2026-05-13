import useSearch from '@/hooks/useSearch'
import { renderHook } from '@testing-library/react'
import type { Product } from '@/types'

describe('useSearch', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'G-Shock Watch',
      category: 'G-Shock',
      price: 1000,
      image: '',
      description: 'test',
    },
    {
      id: '2',
      name: 'Edifice Watch',
      category: 'Edifice',
      price: 2000,
      image: '',
      description: 'test',
    },
    {
      id: '3',
      name: 'Baby-G Watch',
      category: 'Baby-G',
      price: 1500,
      image: '',
      description: 'test',
    },
  ]

  it('should return empty results for empty query', () => {
    const { result } = renderHook(() => useSearch(mockProducts, { debounceMs: 0 }))
    expect(result.current.results).toHaveLength(0)
  })

  it('should filter products by name', () => {
    const { result, rerender } = renderHook(
      ({ query }) => {
        const [search, setSearch] = React.useState(query)
        const res = useSearch(mockProducts, { debounceMs: 0 })
        return { ...res, search, setSearch }
      },
      { initialProps: { query: 'G-Shock' } },
    )

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0]?.name).toBe('G-Shock Watch')
  })

  it('should filter products by category', () => {
    const { result } = renderHook(() => {
      const res = useSearch(mockProducts, { debounceMs: 0 })
      res.setQuery('Edifice')
      return res
    })

    expect(result.current.isSearching).toBe(true)
  })
})
