import { Suspense, lazy, useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import { useStore } from './store/useStore.ts'

const Home = lazy(() => import('./pages/Home.tsx'))
const Shop = lazy(() => import('./pages/Shop.tsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.tsx'))
const Cart = lazy(() => import('./pages/Cart.tsx'))
const Checkout = lazy(() => import('./pages/Checkout.tsx'))
const Login = lazy(() => import('./pages/Login.tsx'))
const Register = lazy(() => import('./pages/Register.tsx'))
const Profile = lazy(() => import('./pages/Profile.tsx'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard.tsx'))
const AdminProducts = lazy(() => import('./pages/admin/Products.tsx'))
const AdminOrders = lazy(() => import('./pages/admin/Orders.tsx'))
const AdminUsers = lazy(() => import('./pages/admin/Users.tsx'))
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy.tsx'))
const ReturnPolicy = lazy(() => import('./pages/ReturnPolicy.tsx'))
const WarrantyPolicy = lazy(() => import('./pages/WarrantyPolicy.tsx'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.tsx'))

const PageFallback = () => (
  <div className="casio-container py-16 text-center">
    <div className="site-card max-w-md mx-auto p-8">
      <p className="site-copy">Đang tải nội dung...</p>
    </div>
  </div>
)

function AdminRouteGuard() {
  const { user } = useStore()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

function ScrollToTopOnRouteChange() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  return null
}

function App() {
  return (
    <div className="casio-shell min-h-screen flex flex-col">
      <ScrollToTopOnRouteChange />
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

      <Footer />
    </div>
  )
}

export default App
