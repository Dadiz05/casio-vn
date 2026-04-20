import { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx"; // ← Đã thêm
import { useStore } from "./store/useStore.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const AdminProducts = lazy(() => import("./pages/admin/Products.jsx"));
const AdminOrders = lazy(() => import("./pages/admin/Orders.jsx"));
const AdminUsers = lazy(() => import("./pages/admin/Users.jsx"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy.jsx"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy.jsx"));
const WarrantyPolicy = lazy(() => import("./pages/WarrantyPolicy.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));

const PageFallback = () => (
  <div className="casio-container py-16 text-center">
    <div className="site-card max-w-md mx-auto p-8">
      <p className="site-copy">Đang tải nội dung...</p>
    </div>
  </div>
);

function AdminRouteGuard() {
  const { user } = useStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <div className="casio-shell min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/warranty-policy" element={<WarrantyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Admin Routes */}
            <Route element={<AdminRouteGuard />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </Suspense>
      </main>

      {/* Footer - Luôn hiển thị ở dưới cùng */}
      <Footer />
    </div>
  );
}

export default App;
