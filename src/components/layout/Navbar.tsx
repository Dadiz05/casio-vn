'use client'

import { useState } from 'react'
import { Link, NavLink, useNavigate } from '@/lib/navigation'
import { Heart, LogOut, Menu, Settings, ShoppingCart, User, X } from 'lucide-react'
import { useStore } from '@/store/useStore'
import SearchBar from '@/features/search/components/SearchBar'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `site-nav-link ${isActive ? 'site-nav-link--active' : ''}`

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const { user, cart, logout, products, wishlistIds } = useStore()
  const isAdmin = user?.role === 'admin'
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined)
    logout()
    closeMenu()
    navigate('/login')
  }

  const handleAdminAccess = () => {
    closeMenu()
    navigate(isAdmin ? '/admin' : '/')
  }

  return (
    <nav className="site-header text-[var(--color-text-primary)]">
      <div className="casio-container">
        <div className="site-header__row">
          <Link to="/" className="site-brand" onClick={closeMenu}>
            CASIO <span className="site-brand__accent">VN</span>
          </Link>

          <div className="site-header__search">
            <SearchBar products={products} />
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <NavLink to="/" className={navLinkClass}>
                Trang chủ
              </NavLink>
              <NavLink to="/shop" className={navLinkClass}>
                Cửa hàng
              </NavLink>
              <NavLink to="/wishlist" className={navLinkClass}>
                <Heart size={18} />
                Yêu thích
                {wishlistIds.length > 0 && <span className="nav-count">{wishlistIds.length}</span>}
              </NavLink>
              <NavLink to="/cart" className={navLinkClass}>
                <ShoppingCart size={18} />
                Giỏ hàng
                {cartCount > 0 && <span className="nav-count">{cartCount}</span>}
              </NavLink>

              {user ? (
                <>
                  <NavLink to="/profile" className={navLinkClass}>
                    <User size={18} />
                    <span className="max-w-28 truncate">{user.name}</span>
                  </NavLink>
                  {isAdmin && (
                    <button onClick={handleAdminAccess} className="site-nav-button font-medium">
                      <Settings size={18} />
                      Quản trị
                    </button>
                  )}
                  <button onClick={handleLogout} className="site-nav-button">
                    <LogOut size={18} />
                  </button>
                </>
              ) : (
                <NavLink to="/login" className={navLinkClass}>
                  Đăng nhập
                </NavLink>
              )}
            </div>

            <div className="relative lg:hidden">
              <button
                onClick={() => setIsMenuOpen((current) => !current)}
                className="site-nav-button px-3 py-2"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {isMenuOpen && (
                <div className="mobile-menu-panel">
                  <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
                    Trang chủ
                  </NavLink>
                  <NavLink to="/shop" className={navLinkClass} onClick={closeMenu}>
                    Cửa hàng
                  </NavLink>
                  <NavLink to="/wishlist" className={navLinkClass} onClick={closeMenu}>
                    <Heart size={20} />
                    Yêu thích ({wishlistIds.length})
                  </NavLink>
                  <NavLink to="/cart" className={navLinkClass} onClick={closeMenu}>
                    <ShoppingCart size={20} />
                    Giỏ hàng ({cartCount})
                  </NavLink>

                  {user ? (
                    <>
                      <NavLink to="/profile" className={navLinkClass} onClick={closeMenu}>
                        <User size={20} />
                        {user.name}
                      </NavLink>
                      {isAdmin && (
                        <button
                          onClick={handleAdminAccess}
                          className="site-nav-button justify-start"
                        >
                          <Settings size={20} />
                          Quản trị viên
                        </button>
                      )}
                      <button onClick={handleLogout} className="site-nav-button justify-start">
                        <LogOut size={20} />
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
                      Đăng nhập
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="site-header__mobile-search">
          <SearchBar products={products} />
        </div>
      </div>
    </nav>
  )
}
