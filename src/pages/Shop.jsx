import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useStore } from "../store/useStore.js";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function Shop() {
  const { products } = useStore();

  const [selectedCategory, setSelectedCategory] = useState("all");
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
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      result = result.filter((p) => {
        if (max) return p.price >= min && p.price <= max;
        return p.price >= min;
      });
    }

    if (waterResistance !== "all") {
      result = result.filter((p) => {
        const wr = p.specs?.waterResistance || "";
        return wr.toLowerCase().includes(waterResistance.toLowerCase());
      });
    }

    if (caseMaterial !== "all") {
      result = result.filter((p) => {
        const cm = p.specs?.caseMaterial || "";
        return cm.toLowerCase().includes(caseMaterial.toLowerCase());
      });
    }

    if (strapMaterial !== "all") {
      result = result.filter((p) => {
        const sm = p.specs?.strapMaterial || "";
        return sm.toLowerCase().includes(strapMaterial.toLowerCase());
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
    priceRange,
    waterResistance,
    caseMaterial,
    strapMaterial,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setPriceRange("all");
    setWaterResistance("all");
    setCaseMaterial("all");
    setStrapMaterial("all");
    setSortBy("default");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Cửa Hàng Casio</h1>
        <p className="text-gray-600">
          Khám phá bộ sưu tập đồng hồ Casio chính hãng
        </p>
      </div>

      {/* Bộ lọc - Tất cả nằm cùng hàng, nút xóa bên phải */}
      <div className="bg-white p-8 rounded-3xl shadow-sm mb-12">
        <div className="flex flex-wrap items-end gap-6 lg:gap-8">
          {/* Các bộ lọc chính */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 flex-1 gap-6">
            {/* Dòng sản phẩm */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Dòng sản phẩm
              </div>
              <select
                value={selectedCategory}
                onChange={handleFilterChange(setSelectedCategory)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black bg-white text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="G-Shock">G-Shock</option>
                <option value="Edifice">Edifice</option>
                <option value="Baby-G">Baby-G</option>
                <option value="Classic">Classic</option>
              </select>
            </div>

            {/* Khoảng giá */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Khoảng giá
              </div>
              <select
                value={priceRange}
                onChange={handleFilterChange(setPriceRange)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black bg-white text-sm"
              >
                <option value="all">Giá từ</option>
                <option value="0-1000000">Dưới 1 triệu</option>
                <option value="1000000-2000000">1 - 2 triệu</option>
                <option value="2000000-3000000">2 - 3 triệu</option>
                <option value="3000000-5000000">3 - 5 triệu</option>
                <option value="5000000">Trên 5 triệu</option>
              </select>
            </div>

            {/* Chống nước */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Chống nước
              </div>
              <select
                value={waterResistance}
                onChange={handleFilterChange(setWaterResistance)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black bg-white text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="100">100 mét</option>
                <option value="200">200 mét</option>
              </select>
            </div>

            {/* Vật liệu vỏ */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Vật liệu vỏ
              </div>
              <select
                value={caseMaterial}
                onChange={handleFilterChange(setCaseMaterial)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black bg-white text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="nhựa">Nhựa</option>
                <option value="thép">Thép không gỉ</option>
              </select>
            </div>

            {/* Dây đeo */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Dây đeo
              </div>
              <select
                value={strapMaterial}
                onChange={handleFilterChange(setStrapMaterial)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black bg-white text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="nhựa">Nhựa</option>
                <option value="kim loại">Kim loại</option>
              </select>
            </div>
          </div>

          {/* Phần Sắp xếp + Nút xóa (cùng hàng) */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 min-w-fit">
            <div className="w-full sm:w-56">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Sắp xếp theo
              </div>
              <select
                value={sortBy}
                onChange={handleFilterChange(setSortBy)}
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-black bg-white text-sm"
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
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-100 rounded-2xl text-sm font-medium transition-colors whitespace-nowrap mt-auto"
            >
              <X size={18} />
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Số lượng sản phẩm */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600">
          Hiển thị{" "}
          <span className="font-semibold text-black">
            {currentProducts.length}
          </span>{" "}
          /{" "}
          <span className="font-semibold text-black">
            {filteredProducts.length}
          </span>{" "}
          sản phẩm
        </p>
        <p className="text-sm text-gray-500">
          Trang {currentPage} / {totalPages || 1}
        </p>
      </div>

      {/* Danh sách sản phẩm */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            Không tìm thấy sản phẩm nào phù hợp
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 px-8 py-3 bg-black text-white rounded-2xl hover:bg-gray-800"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={20} /> Trước
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-2xl font-medium transition ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Sau <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
