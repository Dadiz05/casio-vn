import { useState } from "react";
import { useStore } from "../../store/useStore.js";
import { UserPlus, Trash2, Shield, User } from "lucide-react";

export default function AdminUsers() {
  const { user: currentUser } = useStore();

  // Dữ liệu người dùng demo (vì chưa có backend)
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Admin Casio",
      email: "admin@casio.vn",
      role: "admin",
      joinDate: "2025-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Nguyễn Văn A",
      email: "user@casio.vn",
      role: "user",
      joinDate: "2025-02-20",
      status: "active",
    },
    {
      id: "3",
      name: "Trần Thị Bích",
      email: "bich.tran@gmail.com",
      role: "user",
      joinDate: "2025-03-10",
      status: "active",
    },
    {
      id: "4",
      name: "Lê Minh Quân",
      email: "quan.le@gmail.com",
      role: "user",
      joinDate: "2025-03-25",
      status: "inactive",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const userToAdd = {
      id: Date.now().toString(),
      ...newUser,
      joinDate: new Date().toISOString().split("T")[0],
      status: "active",
    };

    setUsers([...users, userToAdd]);
    setNewUser({ name: "", email: "", role: "user" });
    setShowAddForm(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u,
      ),
    );
  };

  const getRoleBadge = (role) => {
    return role === "admin" ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
        <Shield size={16} />
        Admin
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
        <User size={16} />
        User
      </span>
    );
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-600";
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Quản lý Người dùng</h1>
          <p className="text-gray-600 mt-2">
            Quản lý tài khoản khách hàng và admin
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 transition"
        >
          <UserPlus size={20} />
          Thêm người dùng mới
        </button>
      </div>

      {/* Form thêm người dùng */}
      {showAddForm && (
        <div className="bg-white p-8 rounded-3xl shadow-sm mb-10">
          <h2 className="text-2xl font-semibold mb-6">Thêm người dùng mới</h2>
          <form
            onSubmit={handleAddUser}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <input
              type="text"
              placeholder="Họ và tên"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
              required
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="p-4 border border-gray-300 rounded-2xl focus:outline-none bg-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="md:col-span-3 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-black text-white py-4 rounded-2xl font-medium hover:bg-gray-800"
              >
                Thêm người dùng
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 border border-gray-300 py-4 rounded-2xl font-medium"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bảng danh sách người dùng */}
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-6 font-semibold">Người dùng</th>
              <th className="text-left p-6 font-semibold">Email</th>
              <th className="text-center p-6 font-semibold">Vai trò</th>
              <th className="text-center p-6 font-semibold">Ngày tham gia</th>
              <th className="text-center p-6 font-semibold">Trạng thái</th>
              <th className="text-center p-6 font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-6">
                  <div className="font-medium">{u.name}</div>
                </td>
                <td className="p-6 text-gray-600">{u.email}</td>
                <td className="p-6 text-center">{getRoleBadge(u.role)}</td>
                <td className="p-6 text-center text-gray-600">{u.joinDate}</td>
                <td className="p-6 text-center">
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                      u.status,
                    )}`}
                  >
                    {u.status === "active" ? "Hoạt động" : "Không hoạt động"}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`px-4 py-1.5 text-sm rounded-xl transition ${
                        u.status === "active"
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {u.status === "active" ? "Khóa" : "Mở khóa"}
                    </button>

                    {u.id !== currentUser?.id && (
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="text-red-600 hover:text-red-700 p-2 transition"
                        title="Xóa người dùng"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        Đây là dữ liệu demo. Trong dự án thật sẽ kết nối với database.
      </p>
    </div>
  );
}
