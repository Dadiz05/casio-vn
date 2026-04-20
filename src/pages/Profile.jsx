import { useEffect } from "react";
import { useStore } from "../store/useStore.js";
import { LogOut, User, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Nếu chưa đăng nhập
  if (!user) {
    return (
      <div className="casio-container casio-section min-h-[80vh] flex items-center justify-center">
        <div className="site-card text-center p-8 sm:p-10 max-w-lg w-full">
          <User size={80} className="mx-auto text-[rgba(16,4,4,0.18)] mb-6" />
          <h2 className="site-title text-3xl sm:text-4xl mb-3">
            Bạn chưa đăng nhập
          </h2>
          <p className="site-copy mb-8">
            Vui lòng đăng nhập để xem thông tin tài khoản
          </p>
          <button
            onClick={() => navigate("/login")}
            className="site-button site-button--primary"
          >
            Đi đến trang đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="casio-container casio-section py-12 max-w-2xl">
      <div className="site-card overflow-hidden">
        <div className="bg-[linear-gradient(135deg,var(--color-surface-base),rgba(16,4,4,0.92),rgba(221,51,51,0.92))] text-white p-8 sm:p-10">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/10 rounded-[var(--radius-sm)] flex items-center justify-center border border-white/10">
              <User size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-white/75 mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <User className="text-[var(--color-surface-raised)]" size={24} />
              Thông tin cá nhân
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.03)] p-6">
                <div className="flex items-center gap-3 text-[var(--color-text-secondary)] mb-2">
                  <Mail size={20} />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="font-medium text-lg">{user.email}</p>
              </div>

              <div className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.03)] p-6">
                <div className="flex items-center gap-3 text-[var(--color-text-secondary)] mb-2">
                  <Shield size={20} />
                  <span className="text-sm font-medium">Vai trò</span>
                </div>
                <p className="font-medium text-lg">
                  {user.role === "admin" ? "Quản trị viên" : "Khách hàng"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[var(--color-border-strong)]">
            <button
              onClick={handleLogout}
              className="site-button site-button--ghost w-full text-[var(--color-surface-raised)] justify-center"
            >
              <LogOut size={22} />
              Đăng xuất khỏi tài khoản
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-[var(--color-text-secondary)] text-sm mt-8">
        Đây là trang Profile đơn giản. Bạn có thể mở rộng thêm sau (đổi mật
        khẩu, lịch sử mua hàng, địa chỉ...)
      </p>
    </div>
  );
}
