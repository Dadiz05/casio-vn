import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useStore } from "../../store/useStore.js";

export default function AdminProducts() {
  const { products, setProducts } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "G-Shock",
    image: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingProduct) {
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? { ...product, ...formData, price: Number(formData.price) }
          : product,
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id: Date.now().toString(),
        ...formData,
        price: Number(formData.price),
      };
      setProducts([...products, newProduct]);
    }

    setShowForm(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      category: "G-Shock",
      image: "",
      description: "",
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="casio-container casio-section py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <span className="site-kicker">Admin catalog</span>
          <h1 className="site-title text-3xl sm:text-4xl mt-2">
            Quản lý Sản phẩm
          </h1>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
          }}
          className="site-button site-button--primary"
        >
          <Plus size={18} />
          Thêm sản phẩm mới
        </button>
      </div>

      {showForm && (
        <div className="site-card p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">
            {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Tên sản phẩm
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
                className="site-field"
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Giá (VND)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(event) =>
                  setFormData({ ...formData, price: event.target.value })
                }
                className="site-field"
                placeholder="Nhập giá"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Danh mục
              </label>
              <select
                value={formData.category}
                onChange={(event) =>
                  setFormData({ ...formData, category: event.target.value })
                }
                className="site-select"
              >
                <option value="G-Shock">G-Shock</option>
                <option value="Edifice">Edifice</option>
                <option value="Baby-G">Baby-G</option>
                <option value="Classic">Classic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Link ảnh
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(event) =>
                  setFormData({ ...formData, image: event.target.value })
                }
                className="site-field"
                placeholder="https://..."
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Mô tả sản phẩm
              </label>
              <textarea
                value={formData.description}
                onChange={(event) =>
                  setFormData({ ...formData, description: event.target.value })
                }
                className="site-textarea min-h-[120px]"
                placeholder="Nhập mô tả ngắn"
              />
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="site-button site-button--primary flex-1"
              >
                {editingProduct ? "Cập nhật" : "Thêm sản phẩm"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="site-button site-button--secondary flex-1"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="site-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[740px]">
            <thead className="bg-[rgba(16,4,4,0.04)] border-b border-[var(--color-border-strong)]">
              <tr>
                <th className="text-left p-5 font-semibold">Sản phẩm</th>
                <th className="text-left p-5 font-semibold">Danh mục</th>
                <th className="text-right p-5 font-semibold">Giá</th>
                <th className="text-center p-5 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-[var(--color-border-strong)] hover:bg-[rgba(16,4,4,0.02)]"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-contain rounded-xl border border-[var(--color-border-strong)] bg-white p-1"
                      />
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)] line-clamp-2">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-[var(--color-text-secondary)]">
                    {product.category}
                  </td>
                  <td className="p-5 text-right font-semibold text-[var(--color-text-primary)]">
                    {product.price.toLocaleString("vi-VN")} ₫
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="site-button site-button--ghost min-h-10 px-3 py-2"
                        aria-label={`Sửa sản phẩm ${product.name}`}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="site-button site-button--ghost min-h-10 px-3 py-2 text-[var(--color-surface-raised)]"
                        aria-label={`Xóa sản phẩm ${product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
