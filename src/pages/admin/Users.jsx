import { useState } from "react";
import { UserPlus, Trash2, Shield, User } from "lucide-react";
import { useStore } from "../../store/useStore.js";

export default function AdminUsers() {
  const { user: currentUser } = useStore();

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

  const handleAddUser = (event) => {
    event.preventDefault();
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
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user,
      ),
    );
  };

  const getRoleBadge = (role) => {
    return role === "admin" ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(221,51,51,0.12)] text-[var(--color-surface-raised)] rounded-full text-sm font-medium">
        <Shield size={14} />
        Admin
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-[rgba(16,4,4,0.08)] text-[var(--color-text-secondary)] rounded-full text-sm font-medium">
        <User size={14} />
        User
      </span>
    );
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-[rgba(34,197,94,0.15)] text-green-700"
      : "bg-[rgba(16,4,4,0.08)] text-[var(--color-text-secondary)]";
  };

  return (
    <div className="casio-container casio-section py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <span className="site-kicker">Admin users</span>
          <h1 className="site-title text-3xl sm:text-4xl mt-2">
            Quản lý Người dùng
          </h1>
          <p className="site-copy mt-2">
            Quản lý tài khoản khách hàng và admin
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="site-button site-button--primary"
        >
          <UserPlus size={18} />
          Thêm người dùng mới
        </button>
      </div>

      {showAddForm && (
        <div className="site-card p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">
            Thêm người dùng mới
          </h2>
          <form
            onSubmit={handleAddUser}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Họ và tên
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(event) =>
                  setNewUser({ ...newUser, name: event.target.value })
                }
                className="site-field"
                placeholder="Nhập họ tên"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Email
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(event) =>
                  setNewUser({ ...newUser, email: event.target.value })
                }
                className="site-field"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Vai trò
              </label>
              <select
                value={newUser.role}
                onChange={(event) =>
                  setNewUser({ ...newUser, role: event.target.value })
                }
                className="site-select"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="md:col-span-3 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="site-button site-button--primary flex-1"
              >
                Thêm người dùng
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
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
          <table className="w-full min-w-[980px]">
            <thead className="bg-[rgba(16,4,4,0.04)] border-b border-[var(--color-border-strong)]">
              <tr>
                <th className="text-left p-5 font-semibold">Người dùng</th>
                <th className="text-left p-5 font-semibold">Email</th>
                <th className="text-center p-5 font-semibold">Vai trò</th>
                <th className="text-center p-5 font-semibold">Ngày tham gia</th>
                <th className="text-center p-5 font-semibold">Trạng thái</th>
                <th className="text-center p-5 font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[var(--color-border-strong)] hover:bg-[rgba(16,4,4,0.02)]"
                >
                  <td className="p-5 font-medium text-[var(--color-text-primary)]">
                    {user.name}
                  </td>
                  <td className="p-5 text-[var(--color-text-secondary)]">
                    {user.email}
                  </td>
                  <td className="p-5 text-center">{getRoleBadge(user.role)}</td>
                  <td className="p-5 text-center text-[var(--color-text-secondary)]">
                    {user.joinDate}
                  </td>
                  <td className="p-5 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}
                    >
                      {user.status === "active"
                        ? "Hoạt động"
                        : "Không hoạt động"}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className="site-button site-button--ghost min-h-10 px-3 py-2"
                      >
                        {user.status === "active" ? "Khóa" : "Mở"}
                      </button>

                      {user.id !== currentUser?.id && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="site-button site-button--ghost min-h-10 px-3 py-2 text-[var(--color-surface-raised)]"
                          title="Xóa người dùng"
                          aria-label={`Xóa người dùng ${user.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="site-copy text-center text-sm mt-6">
        Đây là dữ liệu demo. Trong dự án thật sẽ kết nối với database.
      </p>
    </div>
  );
}
