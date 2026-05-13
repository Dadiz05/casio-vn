import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from '@/lib/navigation'
import Login from '@/views/Login'

describe('Login Page', () => {
  it('should render login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    expect(screen.getByRole('heading', { name: 'Đăng nhập' })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mật khẩu/i)).toBeInTheDocument()
  })

  it('should show email validation error', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const submitButton = screen.getByRole('button', { name: /đăng nhập/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email không hợp lệ/i)).toBeInTheDocument()
    })
  })

  it('should show password validation error', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'test@test.com')
    await user.click(screen.getByRole('button', { name: /đăng nhập/i }))

    await waitFor(() => {
      expect(screen.getByText(/mật khẩu tối thiểu/i)).toBeInTheDocument()
    })
  })

  it('should have link to register page', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const registerLink = screen.getByRole('link', { name: /đăng ký/i })
    expect(registerLink).toHaveAttribute('href', '/register')
  })
})
