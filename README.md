# Casio VN Store

Web app thương mại điện tử bán đồng hồ Casio, được nâng cấp theo yêu cầu đề gốc: **Next.js App Router**, React, TypeScript, API Routes, JWT auth cookies, SSR/SSG/ISR, testing và CI.

## Thông tin báo cáo

- Môn học: Phát triển giao diện ứng dụng
- Đề tài: Xây dựng web app thương mại điện tử bán đồng hồ Casio
- Sinh viên/Nhóm: Nguyễn Gia Vĩ
- Deploy: Vercel
- Ngày cập nhật: 14/05/2026

## Tính năng chính

- Auth: đăng ký, đăng nhập, đăng xuất, JWT access token + refresh token cookies.
- Phân quyền: `admin` / `user`, middleware bảo vệ `/admin/*`.
- CRUD lõi: Products, Orders, Users qua giao diện admin và API Routes.
- Shop: search, filter nhiều tiêu chí, sort và pagination.
- Dashboard: thống kê doanh thu, đơn hàng, khách hàng, tồn kho và biểu đồ.
- Upload: upload ảnh sản phẩm có preview, kiểm tra JPG/PNG/WebP tối đa 2MB.
- AI hỗ trợ: tư vấn sản phẩm, tạo nội dung sản phẩm, insight dashboard qua `/api/ai/*`.
- SEO: metadata per page, canonical, Open Graph, sitemap.
- Performance: lazy route chunks, `next/image` ở ProductCard, memo cho filter/search.

## Tech stack

| Nhóm          | Công nghệ                                                     |
| ------------- | ------------------------------------------------------------- |
| Framework     | Next.js 15 App Router                                         |
| UI            | React 19, Tailwind CSS 4, Lucide React                        |
| Language      | TypeScript                                                    |
| State         | Zustand + persist localStorage                                |
| Server state  | TanStack React Query provider                                 |
| Form/Validate | React Hook Form, Zod                                          |
| Auth          | Custom JWT bằng `jose`, HTTP-only cookies, refresh token flow |
| API           | Next.js Route Handlers                                        |
| Chart         | Recharts                                                      |
| Testing       | Jest, React Testing Library                                   |
| Quality       | ESLint, Prettier, Husky, lint-staged                          |
| CI/CD         | GitHub Actions + Vercel                                       |

## Setup local

```bash
npm install
cp .env.example .env.local
npm run dev
```

App chạy mặc định tại:

```txt
http://localhost:3000
```

## Scripts

| Lệnh                    | Mục đích                    |
| ----------------------- | --------------------------- |
| `npm run dev`           | Chạy Next dev server        |
| `npm run build`         | Build production            |
| `npm run preview`       | Chạy `next start` sau build |
| `npm run lint`          | ESLint                      |
| `npm run type-check`    | TypeScript check            |
| `npm run test`          | Jest tests                  |
| `npm run test:coverage` | Test coverage               |
| `npm run format`        | Prettier                    |

## Tài khoản demo

| Vai trò | Email            | Mật khẩu   |
| ------- | ---------------- | ---------- |
| Admin   | `admin@casio.vn` | `admin123` |
| User    | `user@casio.vn`  | `user123`  |

## Cấu trúc thư mục

```txt
src/
  app/                  Next.js App Router pages + API routes
  components/           Layout/common components
  data/                 Seed products/users/orders
  features/             Feature components: admin, products, search
  hooks/                Custom hooks
  lib/                  Client/server utilities
  store/                Zustand store
  styles/               Global CSS
  types/                TypeScript types
  views/                Client UI views reused by app routes
  __tests__/            Unit + integration tests
docs/                   Báo cáo, API, architecture, schema, sprint reports
```

## Render strategy

- SSR/dynamic: `/admin`, `/admin/products`, `/admin/orders`, `/admin/users`, `/profile`, `/checkout`.
- SSG/ISR: `/product/[id]` dùng `generateStaticParams()` và `revalidate = 3600`.
- Static: `/`, `/shop`, policy pages, login/register, cart/wishlist.

## API Routes

- Auth: `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout`, `POST /api/auth/refresh`, `GET /api/auth/me`.
- Products: `GET/POST /api/products`, `GET/PATCH/DELETE /api/products/:id`.
- Orders: `GET/POST /api/orders`, `GET /api/orders/me`, `PATCH /api/orders/:id/status`.
- Users: `GET/POST /api/users`, `PATCH/DELETE /api/users/:id`.
- AI: `POST /api/ai/recommend`, `POST /api/ai/product-copy`, `POST /api/ai/insights`.

## Đối chiếu yêu cầu đề gốc

| Yêu cầu                         | Trạng thái                                                      |
| ------------------------------- | --------------------------------------------------------------- |
| Next.js App Router              | Đạt                                                             |
| Metadata/SEO per page           | Đạt                                                             |
| Ít nhất 1 SSR                   | Đạt: admin/profile/checkout dynamic SSR                         |
| Ít nhất 1 SSG/ISR               | Đạt: product detail ISR                                         |
| API Routes/Server Actions       | Đạt: Route Handlers cho auth/products/orders/users/AI           |
| Auth + phân quyền               | Đạt: JWT cookies + middleware admin                             |
| Refresh token/re-login flow     | Đạt: `/api/auth/refresh`, refresh cookie 7 ngày                 |
| 3 CRUD modules                  | Đạt: Products, Orders, Users                                    |
| Search/filter/pagination        | Đạt                                                             |
| Dashboard/báo cáo               | Đạt                                                             |
| Upload ảnh + preview + validate | Đạt                                                             |
| Testing                         | Đạt cơ bản: 16 tests, gồm unit/component và 3 integration flows |
| CI/CD                           | Đạt CI; Vercel redeploy khi push Git                            |

## Tài liệu

- [Báo cáo dự án](docs/bao-cao-du-an.md)
- [Architecture](docs/architecture.md)
- [API spec](docs/api.md)
- [Schema](docs/schema.md)
- [AI integration](docs/ai.md)
- Sprint reports: [1](docs/sprints/sprint-1.md), [2](docs/sprints/sprint-2.md), [3](docs/sprints/sprint-3.md), [4](docs/sprints/sprint-4.md), [5](docs/sprints/sprint-5.md), [6](docs/sprints/sprint-6.md)
