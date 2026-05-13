import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '@/views/Login'
import Register from '@/views/Register'
import SearchBar from '@/features/search/components/SearchBar'
import type { Product } from '@/types'

const mockFetch = jest.fn()

const product: Product = {
  id: 'gshock-1',
  sku: 'GA-2100',
  name: 'Casio G-Shock GA-2100',
  category: 'G-Shock',
  price: 2500000,
  image: 'https://via.placeholder.com/300',
  description: 'Đồng hồ thể thao bền bỉ',
  rating: 4.8,
  reviews: 20,
  stock: 12,
  sold: 30,
  gender: 'Unisex',
  movement: 'Quartz',
  warrantyMonths: 24,
  tags: ['the thao', 'ben bi'],
}

describe('integration flows', () => {
  beforeEach(() => {
    mockFetch.mockReset()
    global.fetch = mockFetch
  })

  it('logs in with demo admin account through auth API', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          user: {
            id: '1',
            name: 'Admin Casio',
            email: 'admin@casio.vn',
            role: 'admin',
            status: 'active',
          },
        },
      }),
    })

    render(<Login />)

    await user.type(screen.getByLabelText(/email/i), 'admin@casio.vn')
    await user.type(screen.getByLabelText(/mật khẩu/i), 'admin123')
    await user.click(screen.getByRole('button', { name: /đăng nhập/i }))

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/login', expect.anything())
    )
  })

  it('registers a new user through auth API', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          user: {
            id: '4',
            name: 'Người dùng mới',
            email: 'new@casio.vn',
            role: 'user',
            status: 'active',
          },
        },
      }),
    })

    render(<Register />)

    await user.type(screen.getByLabelText(/tên đầy đủ/i), 'Người dùng mới')
    await user.type(screen.getByLabelText(/email/i), 'new@casio.vn')
    await user.type(screen.getByLabelText(/^mật khẩu$/i), 'secret123')
    await user.type(screen.getByLabelText(/xác nhận mật khẩu/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /^đăng ký$/i }))

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/register', expect.anything())
    )
  })

  it('shows product suggestions while searching', async () => {
    const user = userEvent.setup()
    render(<SearchBar products={[product]} />)

    await user.type(screen.getByLabelText(/tìm kiếm sản phẩm/i), 'GA-2100')

    expect(await screen.findByText('Casio G-Shock GA-2100')).toBeInTheDocument()
    expect(screen.getByText('GA-2100')).toBeInTheDocument()
  })
})
