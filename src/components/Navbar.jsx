import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useStore } from "../store/useStore.js";
import SearchBar from "./SearchBar";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, cart, logout, products } = useStore();
  const isAdmin = user?.role === "admin";

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleAdminAccess = () => {
    if (!isAdmin) {
      navigate("/");
      setIsMenuOpen(false);
      return;
    }

    navigate("/admin");
    setIsMenuOpen(false);
  };

  return (
    <nav className="site-header text-[var(--color-text-primary)]">
      <div className="casio-container">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link to="/" className="site-brand text-xl sm:text-2xl">
            CASIO <span className="site-brand__accent">VN</span>
          </Link>

          <div className="flex-1 max-w-xs sm:max-w-md md:max-w-xl block">
            <SearchBar products={products} />
          </div>
          <div className="hidden lg:flex items-center gap-2 lg:gap-3">
            <Link to="/" className="site-nav-link">
              Trang chủ
            </Link>
            <Link to="/shop" className="site-nav-link">
              Cửa hàng
            </Link>
            <Link to="/cart" className="site-nav-link">
              <ShoppingCart size={20} />
              Giỏ hàng
              {cartCount > 0 && (
                <span className="site-chip text-[var(--color-text-primary)] bg-[rgba(221,51,51,0.14)] border-[rgba(221,51,51,0.2)]">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="site-nav-link">
                  <User size={20} />
                  <span>{user.name}</span>
                </Link>

                {isAdmin && (
                  <button
                    onClick={handleAdminAccess}
                    className="site-nav-button font-medium"
                  >
                    Quản trị
                  </button>
                )}

                <button onClick={handleLogout} className="site-nav-button">
                  <LogOut size={20} />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link to="/login" className="site-nav-link">
                Đăng nhập
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="site-nav-button lg:hidden min-w-11 px-3 py-2"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-5 pt-1">
            <div className="casio-card bg-[var(--color-surface-muted)] p-4 space-y-2">
              <Link
                to="/"
                className="site-nav-link w-full justify-start px-0 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                to="/shop"
                className="site-nav-link w-full justify-start px-0 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Cửa hàng
              </Link>
              <Link
                to="/cart"
                className="site-nav-link w-full justify-start px-0 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={20} />
                Giỏ hàng ({cartCount})
              </Link>

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="site-nav-link w-full justify-start px-0 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    {user.name}
                  </Link>

                  {isAdmin && (
                    <button
                      onClick={handleAdminAccess}
                      className="site-nav-button w-full justify-start"
                    >
                      Quản trị viên
                    </button>
                  )}

                  <button
                    onClick={handleLogout}
                    className="site-nav-button w-full justify-start"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="site-nav-link w-full justify-start px-0 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
