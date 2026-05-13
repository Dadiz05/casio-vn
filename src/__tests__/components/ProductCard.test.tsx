import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types'

const mockProduct: Product = {
  id: '1',
  name: 'Test Watch',
  category: 'G-Shock',
  price: 1000,
  image: 'https://via.placeholder.com/300',
  description: 'A test watch product',
}

describe('ProductCard', () => {
  it('should render product name', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>,
    )
    expect(screen.getByText('Test Watch')).toBeInTheDocument()
  })

  it('should render product category', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>,
    )
    expect(screen.getByText('G-Shock')).toBeInTheDocument()
  })

  it('should render product image', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>,
    )
    const img = screen.getByAltText('Test Watch')
    expect(img).toHaveAttribute('src', mockProduct.image)
  })

  it('should have link to product detail', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>,
    )
    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/product/1')
  })
})
