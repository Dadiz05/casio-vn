import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo login (fake authentication)
    setTimeout(() => {
      if (email === "admin@casio.vn" && password === "admin123") {
        const adminUser = {
          id: "1",
          name: "Admin Casio",
          email: "admin@casio.vn",
          role: "admin",
        };
        setUser(adminUser);
        navigate("/admin");
      } else if (email === "user@casio.vn" && password === "user123") {
        const normalUser = {
          id: "2",
          name: "Nguyễn Văn A",
          email: "user@casio.vn",
          role: "user",
        };
        setUser(normalUser);
        navigate("/");
      } else {
        setError("Email hoặc mật khẩu không đúng!");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="casio-container casio-section min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-6">
      <div className="site-card w-full max-w-md p-7 sm:p-10">
        <div className="text-center mb-10">
          <span className="site-kicker justify-center">Tài khoản</span>
          <h1 className="site-title text-3xl sm:text-4xl mt-2">Đăng nhập</h1>
          <p className="site-copy mt-2">Chào mừng bạn quay trở lại Casio VN</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@casio.vn hoặc user@casio.vn"
              className="site-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="site-field"
              required
            />
          </div>

          {error && (
            <p className="text-[var(--color-surface-raised)] text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="site-button site-button--primary w-full"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-medium text-[var(--color-surface-base)] hover:text-[var(--color-surface-raised)]"
          >
            Đăng ký ngay
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-[var(--color-text-secondary)]">
          Tài khoản demo:
          <br />
          Admin: <strong>admin@casio.vn</strong> / admin123
          <br />
          User: <strong>user@casio.vn</strong> / user123
        </div>
      </div>
    </div>
  );
}
