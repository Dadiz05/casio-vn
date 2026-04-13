import { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useStore } from "../store/useStore.js";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Shop() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  // Đọc giá trị từ URL (do SearchBar ở Navbar điều hướng tới)
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "all";

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState("default");

  // Đồng bộ khi URL thay đổi (ví dụ: người dùng nhấn nút Back hoặc SearchBar điều hướng)
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  // Cập nhật URL khi người dùng thay đổi filter trực tiếp trong trang
  const updateParams = (newSearch, newCategory) => {
    const params = {};
    if (newSearch) params.search = newSearch;
    if (newCategory && newCategory !== "all") params.category = newCategory;
    setSearchParams(params, { replace: true });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    updateParams(val, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
    updateParams(searchTerm, val);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("default");
    setSearchParams({}, { replace: true });
  };

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const hasActiveFilters = searchTerm || selectedCategory !== "all";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-center mb-2">Cửa Hàng Casio</h1>
        <p className="text-gray-600 text-center">
          Khám phá bộ sưu tập đồng hồ Casio chính hãng
        </p>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Ô tìm kiếm */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm đồng hồ Casio..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          {/* Lọc theo loại */}
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none bg-white"
            >
              <option value="all">Tất cả sản phẩm</option>
              <option value="G-Shock">G-Shock</option>
              <option value="Edifice">Edifice</option>
              <option value="Baby-G">Baby-G</option>
              <option value="Classic">Classic</option>
            </select>

            {/* Sắp xếp */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none bg-white"
            >
              <option value="default">Mặc định</option>
              <option value="price-low">Giá thấp đến cao</option>
              <option value="price-high">Giá cao đến thấp</option>
              <option value="name">Tên A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kết quả */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          {hasActiveFilters ? (
            <>
              Kết quả cho{" "}
              {searchTerm && <span className="font-semibold text-black">"{searchTerm}"</span>}
              {searchTerm && selectedCategory !== "all" && " trong "}
              {selectedCategory !== "all" && (
                <span className="font-semibold text-black">{selectedCategory}</span>
              )}
              {" — "}
            </>
          ) : null}
          Tìm thấy{" "}
          <span className="font-semibold text-black">{filteredProducts.length}</span>{" "}
          sản phẩm
        </p>

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-500 underline hover:text-black transition"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            Không tìm thấy sản phẩm nào phù hợp
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-4 px-8 py-3.5 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
