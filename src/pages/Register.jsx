import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore.js";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      setLoading(false);
      return;
    }

    // Demo đăng ký (fake)
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: "user",
      };

      setUser(newUser);
      alert("Đăng ký thành công! Chào mừng bạn đến với Casio VN.");
      navigate("/");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="casio-container casio-section min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-6">
      <div className="site-card w-full max-w-md p-7 sm:p-10">
        <div className="text-center mb-10">
          <span className="site-kicker justify-center">Tạo tài khoản</span>
          <h1 className="site-title text-3xl sm:text-4xl mt-2">
            Đăng ký tài khoản
          </h1>
          <p className="site-copy mt-2">Tạo tài khoản để mua sắm dễ dàng hơn</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              className="site-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
              className="site-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
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
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
