import { useStore } from "../store/useStore.js";
import { LogOut, User, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Nếu chưa đăng nhập
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <User size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold mb-3">Bạn chưa đăng nhập</h2>
          <p className="text-gray-600 mb-8">
            Vui lòng đăng nhập để xem thông tin tài khoản
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-3.5 rounded-2xl font-medium hover:bg-gray-800 transition"
          >
            Đi đến trang đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-10">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
              <User size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-300 mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="p-10 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <User className="text-yellow-500" size={24} />
              Thông tin cá nhân
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Mail size={20} />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="font-medium text-lg">{user.email}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-center gap-3 text-gray-500 mb-2">
                  <Shield size={20} />
                  <span className="text-sm font-medium">Vai trò</span>
                </div>
                <p className="font-medium text-lg">
                  {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                </p>
              </div>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="pt-6 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 py-4 rounded-2xl font-medium transition-all active:scale-95"
            >
              <LogOut size={22} />
              Đăng xuất khỏi tài khoản
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        Đây là trang Profile đơn giản. Bạn có thể mở rộng thêm sau (đổi mật
        khẩu, lịch sử mua hàng, địa chỉ...)
      </p>
    </div>
  );
}
