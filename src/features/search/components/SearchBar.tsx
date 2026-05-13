'use client'

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowRight, Search, X } from 'lucide-react'
import { useNavigate } from '@/lib/navigation'
import useDebounce from '@/hooks/useDebounce'
import type { Product } from '@/types'
import '../styles/SearchBar.css'

interface Category {
  label: string
  path: string
}

type Props = {
  products?: Product[]
}

const CATEGORIES: Category[] = [
  { label: 'Tất cả sản phẩm', path: '/shop' },
  { label: 'G-Shock', path: '/shop?category=G-Shock' },
  { label: 'Edifice', path: '/shop?category=Edifice' },
  { label: 'Baby-G', path: '/shop?category=Baby-G' },
  { label: 'Classic', path: '/shop?category=Classic' },
]

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const formatPrice = (price: number) => `${price.toLocaleString('vi-VN')} đ`

export default function SearchBar({ products = [] }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const debouncedQuery = useDebounce(query, 180)
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const normalizedQuery = normalizeText(debouncedQuery.trim())
  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) return []

    return products
      .filter((product) => {
        const text = normalizeText(
          [
            product.name,
            product.sku,
            product.category,
            product.description,
            ...(product.tags ?? []),
          ]
            .filter(Boolean)
            .join(' ')
        )
        return text.includes(normalizedQuery)
      })
      .slice(0, 6)
  }, [normalizedQuery, products])

  const filteredCategories = useMemo(() => {
    if (!normalizedQuery) return CATEGORIES

    return CATEGORIES.filter((category) => normalizeText(category.label).includes(normalizedQuery))
  }, [normalizedQuery])

  const showDropdown = open && (normalizedQuery.length > 0 || filteredCategories.length > 0)
  const totalItems = filteredCategories.length + filteredProducts.length

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const closeSearch = () => {
    setOpen(false)
    setActiveIndex(-1)
  }

  const clearQuery = () => {
    setQuery('')
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  const handleSearch = () => {
    const value = query.trim()
    if (!value) {
      navigate('/shop')
      closeSearch()
      return
    }

    navigate(`/shop?search=${encodeURIComponent(value)}`)
    closeSearch()
    inputRef.current?.blur()
  }

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`)
    setQuery('')
    closeSearch()
  }

  const handleCategoryClick = (path: string) => {
    navigate(path)
    setQuery('')
    closeSearch()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => Math.min(current + 1, totalItems - 1))
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => Math.max(current - 1, -1))
      return
    }

    if (event.key === 'Escape') {
      closeSearch()
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (activeIndex >= 0 && activeIndex < filteredCategories.length) {
        handleCategoryClick(filteredCategories[activeIndex].path)
        return
      }

      if (activeIndex >= filteredCategories.length) {
        const product = filteredProducts[activeIndex - filteredCategories.length]
        if (product) handleProductClick(product)
        return
      }

      handleSearch()
    }
  }

  return (
    <div className="searchbar-wrapper" ref={containerRef}>
      <div className={`searchbar-input-row ${open ? 'is-open' : ''}`}>
        <Search size={18} className="searchbar-leading-icon" />
        <input
          ref={inputRef}
          type="text"
          className="searchbar-input"
          placeholder="Tìm model, dòng đồng hồ, phong cách..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-label="Tìm kiếm sản phẩm"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-controls="casio-search-results"
        />
        {query && (
          <button
            type="button"
            className="searchbar-clear"
            onClick={clearQuery}
            aria-label="Xóa tìm kiếm"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="button"
          className="searchbar-btn"
          onClick={handleSearch}
          aria-label="Tìm kiếm"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {showDropdown && (
        <div className="searchbar-dropdown" id="casio-search-results" role="listbox">
          {filteredCategories.length > 0 && (
            <div className="searchbar-section">
              <div className="searchbar-section-title">Danh mục</div>
              <div className="searchbar-categories">
                {filteredCategories.map((category, index) => (
                  <button
                    key={category.path}
                    className={`searchbar-category-item ${activeIndex === index ? 'active' : ''}`}
                    onMouseDown={() => handleCategoryClick(category.path)}
                    onMouseEnter={() => setActiveIndex(index)}
                    role="option"
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="searchbar-section">
              <div className="searchbar-section-title">Gợi ý sản phẩm</div>
              {filteredProducts.map((product, index) => {
                const itemIndex = filteredCategories.length + index
                const hasDiscount =
                  typeof product.originalPrice === 'number' && product.originalPrice > product.price

                return (
                  <button
                    key={product.id}
                    className={`searchbar-product-item ${activeIndex === itemIndex ? 'active' : ''}`}
                    onMouseDown={() => handleProductClick(product)}
                    onMouseEnter={() => setActiveIndex(itemIndex)}
                    role="option"
                  >
                    <img
                      className="searchbar-product-img"
                      src={product.image || product.images?.[0]}
                      alt={product.name}
                    />
                    <div className="searchbar-product-info">
                      <div className="searchbar-product-name">{product.name}</div>
                      <div className="searchbar-product-meta">
                        <span>{product.category}</span>
                        <span>{product.sku}</span>
                      </div>
                      <div className="searchbar-product-price">
                        {hasDiscount && (
                          <span className="searchbar-price-original">
                            {formatPrice(product.originalPrice ?? product.price)}
                          </span>
                        )}
                        <span className="searchbar-price-current">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {normalizedQuery.length > 0 &&
            filteredProducts.length === 0 &&
            filteredCategories.length === 0 && (
              <div className="searchbar-no-results">
                Không tìm thấy kết quả cho &ldquo;{debouncedQuery}&rdquo;
              </div>
            )}

          {normalizedQuery.length > 0 && (
            <button className="searchbar-view-all" onMouseDown={handleSearch}>
              Xem tất cả kết quả cho &ldquo;{query}&rdquo;
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
