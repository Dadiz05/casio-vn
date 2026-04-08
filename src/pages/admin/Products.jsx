import { useState } from "react";
import { useStore } from "../../store/useStore.js";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminProducts() {
  const { products, setProducts } = useStore(); // Giả sử bạn sẽ thêm setProducts vào store
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "G-Shock",
    image: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      // Cập nhật sản phẩm
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? { ...p, ...formData, price: Number(formData.price) }
          : p,
      );
      setProducts(updatedProducts); // Cần thêm hàm này vào store
    } else {
      // Thêm sản phẩm mới
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
      const filtered = products.filter((p) => p.id !== id);
      setProducts(filtered);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Quản lý Sản phẩm</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
          }}
          className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800"
        >
          <Plus size={20} />
          Thêm sản phẩm mới
        </button>
      </div>

      {/* Form thêm/sửa */}
      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-sm mb-10">
          <h2 className="text-2xl font-semibold mb-6">
            {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-4 border rounded-2xl"
              required
            />
            <input
              type="number"
              placeholder="Giá (VND)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="p-4 border rounded-2xl"
              required
            />
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="p-4 border rounded-2xl"
            >
              <option value="G-Shock">G-Shock</option>
              <option value="Edifice">Edifice</option>
              <option value="Baby-G">Baby-G</option>
            </select>
            <input
              type="text"
              placeholder="Link ảnh[](https://...)"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="p-4 border rounded-2xl"
              required
            />
            <textarea
              placeholder="Mô tả sản phẩm"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="p-4 border rounded-2xl md:col-span-2 h-32"
            />
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-black text-white py-4 rounded-2xl"
              >
                {editingProduct ? "Cập nhật" : "Thêm sản phẩm"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 border border-gray-300 py-4 rounded-2xl"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Danh sách sản phẩm */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-6">Sản phẩm</th>
              <th className="text-left p-6">Danh mục</th>
              <th className="text-right p-6">Giá</th>
              <th className="text-center p-6">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">{product.category}</td>
                <td className="p-6 text-right font-semibold">
                  {product.price.toLocaleString("vi-VN")} ₫
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
