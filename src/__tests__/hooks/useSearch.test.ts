import useSearch from '@/hooks/useSearch'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { Product } from '@/types'

describe('useSearch', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      sku: 'G-1',
      name: 'G-Shock Watch',
      category: 'G-Shock',
      price: 1000,
      image: '',
      description: 'test',
      rating: 4.8,
      reviews: 20,
      stock: 10,
      sold: 12,
      gender: 'Unisex',
      movement: 'Quartz',
      warrantyMonths: 24,
    },
    {
      id: '2',
      sku: 'E-1',
      name: 'Edifice Watch',
      category: 'Edifice',
      price: 2000,
      image: '',
      description: 'test',
      rating: 4.7,
      reviews: 18,
      stock: 8,
      sold: 10,
      gender: 'Nam',
      movement: 'Solar',
      warrantyMonths: 24,
    },
    {
      id: '3',
      sku: 'B-1',
      name: 'Baby-G Watch',
      category: 'Baby-G',
      price: 1500,
      image: '',
      description: 'test',
      rating: 4.6,
      reviews: 16,
      stock: 9,
      sold: 11,
      gender: 'Nữ',
      movement: 'Quartz',
      warrantyMonths: 24,
    },
  ]

  it('should return empty results for empty query', () => {
    const { result } = renderHook(() => useSearch(mockProducts, { debounceMs: 0 }))
    expect(result.current.results).toHaveLength(0)
  })

  it('should filter products by name', async () => {
    const { result } = renderHook(() => useSearch(mockProducts, { debounceMs: 0 }))

    act(() => {
      result.current.setQuery('G-Shock')
    })

    await waitFor(() => expect(result.current.results).toHaveLength(1))
    expect(result.current.results[0]?.name).toBe('G-Shock Watch')
  })

  it('should filter products by category', async () => {
    const { result } = renderHook(() => useSearch(mockProducts, { debounceMs: 0 }))

    act(() => {
      result.current.setQuery('Edifice')
    })

    await waitFor(() => expect(result.current.isSearching).toBe(true))
    expect(result.current.results[0]?.category).toBe('Edifice')
  })
})
