# Architecture

Casio VN Store hiện chạy bằng **Next.js 15 App Router + React 19 + TypeScript**. UI chính được giữ trong `src/views` dưới dạng client components, còn routing, metadata, SSR/SSG/ISR và API nằm trong `src/app`.

## Tổng quan

```txt
Browser
  |
  v
Next.js App Router
  |-- app pages: metadata, SSR/SSG/ISR
  |-- middleware: JWT admin guard
  |-- API routes: auth, products, orders, users, AI
  |
  v
Client views + Zustand
  |-- cart, wishlist, products, orders, users
  |-- persist localStorage for demo UX
```

## Frontend

- `src/app`: route chính theo App Router.
- `src/views`: UI màn hình khách hàng/admin, chạy client-side để tái sử dụng Zustand.
- `src/components/layout`: AppShell, Navbar, Footer, FloatingContact.
- `src/features/products`: ProductCard, UploadImage.
- `src/features/search`: SearchBar + CSS suggestion.
- `src/features/admin`: RevenueBarChart.
- `src/styles/index.css`: global CSS + Tailwind import.

## Backend nhẹ trong Next

- `src/app/api/auth/*`: login/register/logout/refresh/me.
- `src/app/api/products/*`: list/detail/create/update/delete products.
- `src/app/api/orders/*`: list/create/my orders/update status.
- `src/app/api/users/*`: list/create/update/delete users.
- `src/app/api/ai/*`: AI recommendation/product copy/insights.
- `src/lib/server/*`: JWT, mock DB, API responses, AI fallback/OpenAI helper.

## Render strategy

- Static pages: `/`, `/shop`, policy pages, login/register, cart/wishlist.
- Dynamic SSR: `/admin/*`, `/profile`, `/checkout`.
- SSG/ISR: `/product/[id]` dùng `generateStaticParams()` và `revalidate = 3600`.
- SEO: metadata per page, canonical và sitemap.

## Auth

- Login/register tạo JWT access token và refresh token bằng `jose`.
- Token được lưu trong HTTP-only cookies.
- Middleware đọc access token để bảo vệ `/admin/*`.
- `/api/auth/refresh` cấp lại token nếu refresh token còn hợp lệ.

## Dữ liệu

Dữ liệu demo dùng seed trong `src/data/products.ts` và `src/data/seed.ts`. API Routes dùng `mockDb` in-memory để mô phỏng backend. Zustand vẫn persist localStorage để trải nghiệm demo mượt khi reload.

Khi có backend thật, có thể thay `mockDb` bằng Prisma/PostgreSQL mà không cần đổi nhiều UI.
