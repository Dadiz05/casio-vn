import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useStore();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black">Đăng nhập</h1>
          <p className="text-gray-600 mt-2">
            Chào mừng bạn quay trở lại Casio VN
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@casio.vn hoặc user@casio.vn"
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-black"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg hover:bg-gray-800 transition disabled:opacity-70"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-black font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
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
