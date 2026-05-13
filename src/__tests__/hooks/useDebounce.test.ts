import useDebounce from '@/hooks/useDebounce'
import { renderHook, act } from '@testing-library/react'

describe('useDebounce', () => {
  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    })

    expect(result.current).toBe('initial')

    rerender({ value: 'updated', delay: 300 })
    expect(result.current).toBe('initial')

    await act(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 350)
        })
    )

    rerender({ value: 'updated', delay: 300 })
    expect(result.current).toBe('updated')
  })

  it('should reset debounce timer on new value', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'a', delay: 100 },
    })

    rerender({ value: 'b', delay: 100 })
    await act(() => new Promise((resolve) => setTimeout(resolve, 50)))

    rerender({ value: 'c', delay: 100 })
    expect(result.current).toBe('a')

    await act(() => new Promise((resolve) => setTimeout(resolve, 150)))
    expect(result.current).toBe('c')
  })
})
