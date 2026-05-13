import { render, screen } from '@testing-library/react'
import { BrowserRouter } from '@/lib/navigation'
import ProductCard from '@/features/products/components/ProductCard'
import type { Product } from '@/types'

const mockProduct: Product = {
  id: '1',
  sku: 'TEST-1',
  name: 'Test Watch',
  category: 'G-Shock',
  price: 1000,
  originalPrice: 1200,
  image: 'https://via.placeholder.com/300',
  description: 'A test watch product',
  rating: 4.8,
  reviews: 20,
  stock: 12,
  sold: 30,
  gender: 'Unisex',
  movement: 'Quartz',
  warrantyMonths: 24,
}

describe('ProductCard', () => {
  it('should render product name', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    )
    expect(screen.getByText('Test Watch')).toBeInTheDocument()
  })

  it('should render product category', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    )
    expect(screen.getByText('G-Shock')).toBeInTheDocument()
  })

  it('should render product image', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    )
    const img = screen.getByAltText('Test Watch')
    expect(img).toHaveAttribute('src', mockProduct.image)
  })

  it('should have link to product detail', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/product/1')
  })
})
