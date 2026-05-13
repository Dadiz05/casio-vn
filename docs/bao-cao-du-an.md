# BÁO CÁO DỰ ÁN: CASIO VN STORE

## Web app thương mại điện tử bán đồng hồ Casio

---

## MỤC LỤC

1. [Giới thiệu tổng quan](#1-giới-thiệu-tổng-quan)
2. [Kiến trúc hệ thống](#2-kiến-trúc-hệ-thống)
3. [Công nghệ sử dụng](#3-công-nghệ-sử-dụng)
4. [Cơ sở dữ liệu và mô hình dữ liệu](#4-cơ-sở-dữ-liệu-và-mô-hình-dữ-liệu)
5. [Luồng dữ liệu](#5-luồng-dữ-liệu)
6. [Các chức năng chính](#6-các-chức-năng-chính)
7. [Cấu trúc thư mục dự án](#7-cấu-trúc-thư-mục-dự-án)
8. [Xử lý bảo mật và phân quyền](#8-xử-lý-bảo-mật-và-phân-quyền)
9. [Triển khai và vận hành](#9-triển-khai-và-vận-hành)
10. [Tổng kết](#10-tổng-kết)

---

## 1. Giới thiệu tổng quan

**Casio VN Store** là web app thương mại điện tử bán đồng hồ Casio chính hãng. Người dùng có thể xem sản phẩm, tìm kiếm, lọc, phân trang, thêm vào giỏ hàng, thanh toán, quản lý hồ sơ và wishlist. Admin có dashboard, quản lý sản phẩm, đơn hàng và người dùng.

### Tính năng nổi bật

- **Shop catalog**: G-Shock, Edifice, Baby-G, Classic.
- **Search/filter/pagination**: tìm theo keyword, lọc theo giá, bộ máy, giới tính, tồn kho.
- **Auth & role**: `admin` / `user`, JWT cookies, refresh token.
- **Admin CRUD**: Products, Orders, Users.
- **Dashboard**: doanh thu, đơn hàng, khách hàng, tồn kho, biểu đồ.
- **Upload ảnh**: preview, validate type/size.
- **SEO**: metadata per page, canonical, Open Graph, sitemap.
- **Render strategy**: SSR/dynamic cho admin, ISR cho chi tiết sản phẩm.

---

## 2. Kiến trúc hệ thống

### 2.1 Kiến trúc tổng thể

```txt
Browser
  |
  v
Next.js 15 App Router
  |-- Pages + layouts + metadata
  |-- Middleware JWT guard
  |-- API Routes
  |
  +--> React client views
  |      |-- Zustand store
  |      |-- React Hook Form + Zod
  |      |-- Recharts dashboard
  |
  +--> Server utilities
         |-- JWT auth with jose
         |-- mockDb seed data
         |-- AI fallback/OpenAI helper
```

### 2.2 Render strategy

- **SSR/Dynamic**: `/admin`, `/admin/products`, `/admin/orders`, `/admin/users`, `/profile`, `/checkout`.
- **SSG/ISR**: `/product/[id]` dùng `generateStaticParams()` và `revalidate = 3600`.
- **Static**: `/`, `/shop`, login/register, cart/wishlist, policy pages.

### 2.3 Giao tiếp

- Client gọi API Routes bằng `fetch`.
- Zustand giữ state local để demo UX mượt.
- API Routes dùng seed data in-memory để mô phỏng backend.
- Middleware đọc JWT cookie để bảo vệ admin routes.

---

## 3. Công nghệ sử dụng

| Nhóm         | Công nghệ                   | Mục đích                             |
| ------------ | --------------------------- | ------------------------------------ |
| Framework    | Next.js 15                  | App Router, SSR, SSG/ISR, API Routes |
| UI           | React 19                    | Xây dựng giao diện                   |
| Ngôn ngữ     | TypeScript                  | Type-safe                            |
| Styling      | Tailwind CSS 4              | Utility CSS                          |
| State        | Zustand                     | Global state + persist               |
| Server state | TanStack React Query        | Provider/caching cho fetch sau này   |
| Form         | React Hook Form             | Quản lý form                         |
| Validation   | Zod                         | Validate input                       |
| Auth         | jose                        | JWT access/refresh token             |
| Chart        | Recharts                    | Biểu đồ dashboard                    |
| Test         | Jest, React Testing Library | Unit/component/integration tests     |
| CI/CD        | GitHub Actions, Vercel      | Build/test/deploy                    |

---

## 4. Cơ sở dữ liệu và mô hình dữ liệu

Dự án dùng seed data để demo. Khi nối backend thật, các entity chính gồm:

```txt
User 1---N Order 1---N OrderItem N---1 Product
User 1---N Wishlist N---1 Product
```

### Product

- `id`, `sku`, `name`, `category`
- `price`, `originalPrice`
- `image`, `images`, `description`, `fullDescription`
- `stock`, `sold`, `rating`, `reviews`
- `movement`, `gender`, `warrantyMonths`
- `specs`, `features`, `tags`, `colorVariants`

### User

- `id`, `name`, `email`, `role`
- `status`, `phone`, `address`
- `createdAt`, `updatedAt`

### Order

- `id`, `customerId`, `customerName`, `customerEmail`
- `shippingInfo`, `items`
- `subtotal`, `discount`, `shippingFee`, `total`
- `status`, `paymentMethod`, `paymentStatus`, `voucherCode`

---

## 5. Luồng dữ liệu

### 5.1 Đăng nhập

```txt
User -> Login form -> POST /api/auth/login
API -> validate Zod -> verify demo account
API -> set access_token + refresh_token HTTP-only cookies
Client -> set Zustand user -> redirect admin/home
Middleware -> protect /admin/* by JWT role
```

### 5.2 Refresh token

```txt
Client/API caller -> POST /api/auth/refresh
Server -> read refresh cookie
Server -> verify JWT refresh token
Server -> issue new access + refresh cookies
```

### 5.3 Shop search/filter/pagination

```txt
SearchBar/Shop -> URL search params + local filters
Shop -> useMemo filter products
Shop -> sort + paginate
UI -> ProductCard grid
```

### 5.4 Checkout

```txt
Cart -> Checkout form -> calculate summary
Checkout -> addOrder in Zustand
Store -> update orders, stock, sold
API route /api/orders available for backend flow
```

### 5.5 Admin CRUD

```txt
Admin Products/Orders/Users
  -> Zustand actions for demo UI
  -> API Routes exist for CRUD contract
  -> middleware protects admin pages
```

---

## 6. Các chức năng chính

### 6.1 Auth và phân quyền

- Đăng ký, đăng nhập, đăng xuất.
- Access token 15 phút, refresh token 7 ngày.
- Middleware chặn `/admin/*` nếu không phải admin.
- `/api/auth/refresh` hỗ trợ refresh token/re-login flow rõ ràng.

### 6.2 Products CRUD

- Admin thêm, sửa, xóa, tìm kiếm sản phẩm.
- Upload ảnh có preview và validate JPG/PNG/WebP tối đa 2MB.
- API: `GET/POST /api/products`, `GET/PATCH/DELETE /api/products/:id`.

### 6.3 Orders CRUD

- Checkout tạo order demo.
- Admin lọc và cập nhật trạng thái đơn.
- API: `GET/POST /api/orders`, `GET /api/orders/me`, `PATCH /api/orders/:id/status`.

### 6.4 Users CRUD

- Admin tìm kiếm, cập nhật trạng thái và xóa user.
- API: `GET/POST /api/users`, `PATCH/DELETE /api/users/:id`.

### 6.5 Dashboard

- Tổng doanh thu.
- Tổng đơn hàng.
- Tổng user.
- Tồn kho thấp.
- Biểu đồ doanh thu bằng Recharts.

### 6.6 SEO và metadata

- Root metadata trong `app/layout.tsx`.
- Metadata riêng cho từng page.
- Dynamic metadata cho `product/[id]`.
- Sitemap tại `/sitemap.xml`.

---

## 7. Cấu trúc thư mục dự án

```txt
casio-vn-store/
  src/
    app/                  App Router pages + API routes
    components/           Layout/common components
    data/                 Seed data
    features/             Feature components
    hooks/                Custom hooks
    lib/                  Client/server utilities
    store/                Zustand store
    styles/               Global CSS
    types/                Type definitions
    views/                Client UI views
    __tests__/            Unit + integration tests
  docs/                   Tài liệu dự án
  next.config.ts
  postcss.config.mjs
  package.json
```

---

## 8. Xử lý bảo mật và phân quyền

- JWT ký bằng `AUTH_SECRET`.
- Access token và refresh token lưu bằng HTTP-only cookies.
- Middleware kiểm tra role admin trước khi vào `/admin/*`.
- API auth validate bằng Zod.
- Upload ảnh validate type và size ở client.

Giới hạn hiện tại: seed data/mock DB chỉ phục vụ demo. Production thật nên thay bằng database và kiểm tra role ở từng API mutation.

---

## 9. Triển khai và vận hành

### Chạy local

```bash
npm install
cp .env.example .env.local
npm run dev
```

### Build/test

```bash
npm run lint
npm run type-check
npm run test
npm run build
```

### Biến môi trường

| Biến                   | Mô tả                         |
| ---------------------- | ----------------------------- |
| `NEXT_PUBLIC_SITE_URL` | URL site cho metadata/sitemap |
| `AUTH_SECRET`          | Secret ký JWT                 |
| `OPENAI_API_KEY`       | Tùy chọn, dùng cho AI         |
| `OPENAI_MODEL`         | Model AI                      |

### Deploy

Repo đã deploy trên Vercel. Khi push Git lên branch deploy, Vercel sẽ tự build lại bằng `next build`.

---

## 10. Tổng kết

### Đã đáp ứng yêu cầu đề gốc

1. Next.js App Router.
2. Route chính trong `src/app`.
3. Metadata per page, canonical, Open Graph, sitemap.
4. SSR/dynamic và SSG/ISR.
5. API Routes cho auth, products, orders, users, AI.
6. JWT auth + refresh token flow.
7. 3 module CRUD.
8. Search/filter/pagination.
9. Dashboard và upload.
10. 16 tests, gồm unit/component và 3 integration flows.

### Hướng phát triển tiếp

- Thay mock DB bằng Prisma/PostgreSQL.
- Bổ sung Playwright E2E.
- Đồng bộ UI CRUD trực tiếp với API thay vì chỉ dùng Zustand demo.
- Bổ sung phân quyền server-side cho từng mutation admin.

---

_Tài liệu được tạo cho mục đích báo cáo dự án môn Phát triển giao diện ứng dụng._
