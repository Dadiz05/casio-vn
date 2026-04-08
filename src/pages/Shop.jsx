import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useStore } from "../store/useStore.js";
import { Search } from "lucide-react";

export default function Shop() {
  const { products } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Tìm kiếm theo tên
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Lọc theo category
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // Sắp xếp
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black"
            />
          </div>

          {/* Lọc theo loại */}
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
          Tìm thấy{" "}
          <span className="font-semibold text-black">
            {filteredProducts.length}
          </span>{" "}
          sản phẩm
        </p>
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
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSortBy("default");
            }}
            className="mt-4 px-8 py-3.5 bg-black text-white rounded-2xl hover:bg-gray-800 transition"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
}
