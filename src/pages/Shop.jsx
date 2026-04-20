import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { useStore } from "../store/useStore.js";

export default function Shop() {
  const { products } = useStore();
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const selectedCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("search") || "";
  const [priceRange, setPriceRange] = useState("all");
  const [waterResistance, setWaterResistance] = useState("all");
  const [caseMaterial, setCaseMaterial] = useState("all");
  const [strapMaterial, setStrapMaterial] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const PRODUCTS_PER_PAGE = 20;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    if (normalizedSearchQuery) {
      result = result.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const description = product.description?.toLowerCase() || "";
        const category = product.category?.toLowerCase() || "";

        return (
          name.includes(normalizedSearchQuery) ||
          description.includes(normalizedSearchQuery) ||
          category.includes(normalizedSearchQuery)
        );
      });
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((product) => {
        if (max) return product.price >= min && product.price <= max;
        return product.price >= min;
      });
    }

    if (waterResistance !== "all") {
      result = result.filter((product) => {
        const value = product.specs?.waterResistance || "";
        return value.toLowerCase().includes(waterResistance.toLowerCase());
      });
    }

    if (caseMaterial !== "all") {
      result = result.filter((product) => {
        const value = product.specs?.caseMaterial || "";
        return value.toLowerCase().includes(caseMaterial.toLowerCase());
      });
    }

    if (strapMaterial !== "all") {
      result = result.filter((product) => {
        const value = product.specs?.strapMaterial || "";
        return value.toLowerCase().includes(strapMaterial.toLowerCase());
      });
    }

    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name")
      result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "newest")
      result.sort((a, b) => Number(b.id) - Number(a.id));

    return result;
  }, [
    products,
    selectedCategory,
    searchQuery,
    priceRange,
    waterResistance,
    caseMaterial,
    strapMaterial,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  // Scroll to top when filters or pagination change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [
    selectedCategory,
    searchQuery,
    priceRange,
    waterResistance,
    caseMaterial,
    strapMaterial,
    sortBy,
    currentPage,
  ]);

  const handleCategoryChange = (event) => {
    const params = new URLSearchParams(search);
    if (event.target.value === "all") {
      params.delete("category");
    } else {
      params.set("category", event.target.value);
    }

    navigate({
      pathname: "/shop",
      search: params.toString() ? `?${params.toString()}` : "",
    });
    setCurrentPage(1);
  };

  const handleFilterChange = (setter) => (event) => {
    setter(event.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    navigate("/shop");
    setPriceRange("all");
    setWaterResistance("all");
    setCaseMaterial("all");
    setStrapMaterial("all");
    setSortBy("default");
    setCurrentPage(1);
  };

  return (
    <div className="casio-container casio-section py-10">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <span className="site-kicker justify-center">Danh mục sản phẩm</span>
        <h1 className="site-title text-3xl sm:text-4xl mt-3 mb-3">
          Cửa Hàng Casio
        </h1>
        <p className="site-copy">
          Khám phá bộ sưu tập đồng hồ Casio chính hãng
        </p>
        {searchQuery.trim() && (
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            Kết quả cho:{" "}
            <span className="font-medium text-[var(--color-text-primary)]">
              {searchQuery}
            </span>
          </p>
        )}
      </div>

      <div className="site-card p-5 sm:p-7 mb-10">
        <div className="flex flex-col sm:flex-wrap sm:items-end gap-5 lg:gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 flex-1 gap-3 sm:gap-4 w-full">
            <div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Dòng sản phẩm
              </div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="site-select text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="G-Shock">G-Shock</option>
                <option value="Edifice">Edifice</option>
                <option value="Baby-G">Baby-G</option>
                <option value="Classic">Classic</option>
              </select>
            </div>

            <div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Khoảng giá
              </div>
              <select
                value={priceRange}
                onChange={handleFilterChange(setPriceRange)}
                className="site-select text-sm"
              >
                <option value="all">Giá từ</option>
                <option value="0-1000000">Dưới 1 triệu</option>
                <option value="1000000-2000000">1 - 2 triệu</option>
                <option value="2000000-3000000">2 - 3 triệu</option>
                <option value="3000000-5000000">3 - 5 triệu</option>
                <option value="5000000">Trên 5 triệu</option>
              </select>
            </div>

            <div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Chống nước
              </div>
              <select
                value={waterResistance}
                onChange={handleFilterChange(setWaterResistance)}
                className="site-select text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="100">100 mét</option>
                <option value="200">200 mét</option>
              </select>
            </div>

            <div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Vật liệu vỏ
              </div>
              <select
                value={caseMaterial}
                onChange={handleFilterChange(setCaseMaterial)}
                className="site-select text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="nhựa">Nhựa</option>
                <option value="thép">Thép không gỉ</option>
              </select>
            </div>

            <div>
              <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Dây đeo
              </div>
              <select
                value={strapMaterial}
                onChange={handleFilterChange(setStrapMaterial)}
                className="site-select text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="nhựa">Nhựa</option>
                <option value="kim loại">Kim loại</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col w-full sm:flex-row gap-4 lg:gap-6 min-w-fit">
            <div className="w-full sm:w-56 min-w-56">
              <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Sắp xếp theo
              </div>
              <select
                value={sortBy}
                onChange={handleFilterChange(setSortBy)}
                className="site-select text-sm"
              >
                <option value="default">Mặc định</option>
                <option value="newest">Mới nhất</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="site-button site-button--ghost w-full sm:w-auto min-w-40 whitespace-nowrap mt-0 sm:mt-auto"
            >
              <X size={18} />
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <p className="site-copy">
          Hiển thị{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {currentProducts.length}
          </span>{" "}
          /{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {filteredProducts.length}
          </span>{" "}
          sản phẩm
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Trang {currentPage} / {totalPages}
        </p>
      </div>

      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 xl:gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="site-card text-center py-16 px-6">
          <p className="text-xl text-[var(--color-text-secondary)]">
            Không tìm thấy sản phẩm nào phù hợp
          </p>
          <button
            onClick={resetFilters}
            className="site-button site-button--primary mt-6"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="site-button site-button--secondary"
          >
            <ChevronLeft size={20} /> Trước
          </button>

          <div className="flex gap-2 flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-10 h-10 px-3 rounded-full font-medium transition ${
                    currentPage === page
                      ? "bg-[var(--color-surface-base)] text-white"
                      : "border border-[var(--color-border-strong)] bg-white hover:bg-[rgba(16,4,4,0.04)]"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="site-button site-button--secondary"
          >
            Sau <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
