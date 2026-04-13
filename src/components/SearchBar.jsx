import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import "../css/SearchBar.css";

const CATEGORIES = [
  { label: "Tất cả sản phẩm", path: "/shop" },
  { label: "G-Shock", path: "/shop?category=G-Shock" },
  { label: "Edifice", path: "/shop?category=Edifice" },
  { label: "Baby-G", path: "/shop?category=Baby-G" },
  { label: "Classic", path: "/shop?category=Classic" },
];

export default function SearchBar({ products = [] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 250);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Filter products based on debounced query
  const filteredProducts = debouncedQuery.trim().length > 0
    ? products.filter((p) =>
        p.name?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(debouncedQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  const filteredCategories = debouncedQuery.trim().length > 0
    ? CATEGORIES.filter((c) =>
        c.label.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : CATEGORIES;

  const showDropdown = open && (debouncedQuery.length > 0 || filteredCategories.length > 0);
  const totalItems = filteredCategories.length + filteredProducts.length;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, totalItems - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredCategories.length) {
        navigate(filteredCategories[activeIndex].path);
        setOpen(false);
      } else if (activeIndex >= filteredCategories.length) {
        const product = filteredProducts[activeIndex - filteredCategories.length];
        if (product) handleProductClick(product);
      } else {
        handleSearch();
      }
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id || product.id}`);
    setOpen(false);
    setQuery("");
  };

  const handleCategoryClick = (path) => {
    navigate(path);
    setOpen(false);
    setQuery("");
  };

  const formatPrice = (price) =>
    price?.toLocaleString("vi-VN") + "đ";

  return (
    <div className="searchbar-wrapper" ref={containerRef}>
      <div className={`searchbar-input-row ${open ? "focused" : ""}`}>
        <input
          ref={inputRef}
          type="text"
          className="searchbar-input"
          placeholder="Tìm kiếm sản phẩm..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-label="Tìm kiếm sản phẩm"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
        />
        <button
          className="searchbar-btn"
          onClick={handleSearch}
          aria-label="Tìm kiếm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {showDropdown && (
        <div className="searchbar-dropdown" role="listbox">
          {/* Categories section */}
          {filteredCategories.length > 0 && (
            <div className="searchbar-section">
              <div className="searchbar-section-title">Danh mục sản phẩm</div>
              <div className="searchbar-categories">
                {filteredCategories.map((cat, i) => (
                  <button
                    key={cat.path}
                    className={`searchbar-category-item ${activeIndex === i ? "active" : ""}`}
                    onMouseDown={() => handleCategoryClick(cat.path)}
                    onMouseEnter={() => setActiveIndex(i)}
                    role="option"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Products section */}
          {filteredProducts.length > 0 && (
            <div className="searchbar-section">
              <div className="searchbar-section-title">Sản phẩm</div>
              {filteredProducts.map((product, i) => {
                const idx = filteredCategories.length + i;
                const hasDiscount = product.originalPrice && product.originalPrice > product.price;
                return (
                  <button
                    key={product._id || product.id}
                    className={`searchbar-product-item ${activeIndex === idx ? "active" : ""}`}
                    onMouseDown={() => handleProductClick(product)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    role="option"
                  >
                    <img
                      className="searchbar-product-img"
                      src={product.image || product.images?.[0]}
                      alt={product.name}
                    />
                    <div className="searchbar-product-info">
                      <div className="searchbar-product-name">{product.name}</div>
                      <div className="searchbar-product-price">
                        {hasDiscount && (
                          <span className="searchbar-price-original">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                        <span className="searchbar-price-current">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* No results */}
          {debouncedQuery.trim().length > 0 && filteredProducts.length === 0 && filteredCategories.length === 0 && (
            <div className="searchbar-no-results">
              Không tìm thấy kết quả cho &ldquo;{debouncedQuery}&rdquo;
            </div>
          )}

          {/* View all results link */}
          {debouncedQuery.trim().length > 0 && filteredProducts.length > 0 && (
            <button
              className="searchbar-view-all"
              onMouseDown={handleSearch}
            >
              Xem tất cả kết quả cho &ldquo;{query}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
