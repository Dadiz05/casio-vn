import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useStore } from "../store/useStore.js";
import SearchBar from "./SearchBar";
export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user, cart, logout } = useStore();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };
  const { products } = useStore();

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-wider"
          >
            CASIO <span className="text-yellow-400">VN</span>
          </Link>

          {/* SearchBar - thêm wrapper này */}
          <div className="flex-1 max-w-md hidden md:block">
            <SearchBar products={products} />
          </div>
          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Trang chủ
            </Link>
            <Link
              to="/shop"
              className="hover:text-yellow-400 transition-colors"
            >
              Cửa hàng
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
            >
              <ShoppingCart size={20} />
              Giỏ hàng
              {cartCount > 0 && (
                <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-6">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                >
                  <User size={20} />
                  <span>{user.name}</span>
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="hover:text-yellow-400 transition-colors font-medium"
                  >
                    Quản trị
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <LogOut size={20} />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hover:text-yellow-400 transition-colors"
              >
                Đăng nhập
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4 space-y-4">
            <Link
              to="/"
              className="block py-2 hover:text-yellow-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/shop"
              className="block py-2 hover:text-yellow-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Cửa hàng
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 py-2 hover:text-yellow-400"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart size={20} />
              Giỏ hàng ({cartCount})
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 hover:text-yellow-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  👤 {user.name}
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block py-2 hover:text-yellow-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Quản trị viên
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-400 hover:text-red-500"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng nhập
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
