# CASIO VN STORE

## Web App thương mại điện tử bán đồng hồ Casio

### Thành viên

| STT | Họ và tên     | MSSV        | Vai trò                                                  |
| --- | ------------- | ----------- | -------------------------------------------------------- |
| 1   | Nguyễn Gia Vĩ | [Điền MSSV] | Phát triển frontend, backend API, tài liệu và triển khai |

### Liên kết dự án

| Nội dung                      | Đường dẫn                                                           |
| ----------------------------- | ------------------------------------------------------------------- |
| Link tài liệu                 | https://github.com/Dadiz05/casio-vn/tree/main/docs                  |
| Link tài liệu tổng quan dự án | https://github.com/Dadiz05/casio-vn/blob/main/docs/bao-cao-du-an.md |
| Link dự án                    | https://github.com/Dadiz05/casio-vn                                 |
| Link production               | [Điền link Vercel production]                                       |

---

## 1. Tổng quan dự án

**Casio VN Store** là web app thương mại điện tử mô phỏng hệ thống bán đồng hồ Casio chính hãng tại Việt Nam. Ứng dụng hỗ trợ khách hàng xem danh sách sản phẩm, tìm kiếm, lọc theo nhu cầu, xem chi tiết sản phẩm, thêm vào giỏ hàng, lưu sản phẩm yêu thích và thực hiện quy trình đặt hàng demo.

Bên cạnh phần dành cho khách hàng, hệ thống còn có khu vực quản trị giúp admin theo dõi dashboard, quản lý sản phẩm, quản lý đơn hàng và quản lý người dùng. Dự án được xây dựng bằng **Next.js App Router**, kết hợp frontend React, API Routes, JWT authentication, middleware phân quyền, mock database và tài liệu kỹ thuật.

## 2. Mục tiêu dự án

- Xây dựng một website thương mại điện tử có giao diện rõ ràng, dễ sử dụng và phù hợp với lĩnh vực đồng hồ.
- Áp dụng Next.js App Router để tổ chức routing, metadata, SSR/SSG/ISR và API Routes.
- Triển khai các chức năng cốt lõi của một cửa hàng online: catalog, search, filter, cart, checkout, wishlist và admin dashboard.
- Tích hợp xác thực người dùng bằng JWT access token và refresh token.
- Tổ chức mã nguồn theo hướng dễ bảo trì, có tài liệu kiến trúc, API, schema và báo cáo sprint.
- Có thể build production và triển khai lên Vercel.

## 3. Kiến trúc hệ thống

Dự án phù hợp nhất với mô hình **Monolithic Web Application**. Toàn bộ frontend, backend API, middleware, mock database, logic xác thực và tài liệu đều nằm trong một repository Next.js duy nhất.

Tuy nhiên, ở runtime hệ thống vẫn thể hiện mô hình **Client-Server**:

- **Client:** trình duyệt chạy React components, Zustand store, UI views và các thao tác người dùng.
- **Server:** Next.js Route Handlers xử lý API như auth, products, orders, users và AI.

Mã nguồn cũng được tổ chức theo hướng **Layered/Module-based**:

| Layer         | Thư mục chính                            | Vai trò                                              |
| ------------- | ---------------------------------------- | ---------------------------------------------------- |
| Presentation  | `src/app`, `src/views`, `src/components` | Routing, page UI, layout và component dùng chung     |
| Feature       | `src/features`                           | Component theo nghiệp vụ như products, search, admin |
| State & Hooks | `src/store`, `src/hooks`                 | Quản lý trạng thái, cart, wishlist, auth và search   |
| Server/API    | `src/app/api`, `src/lib/server`          | API Routes, auth service, mock DB, response helper   |
| Data & Types  | `src/data`, `src/types`, `src/schemas`   | Seed data, TypeScript types và Zod validation        |

## 4. Công nghệ sử dụng

| Nhóm              | Công nghệ                                         |
| ----------------- | ------------------------------------------------- |
| Framework         | Next.js 15 App Router                             |
| UI                | React 19, Tailwind CSS, Lucide React              |
| Ngôn ngữ          | TypeScript                                        |
| State management  | Zustand + persist localStorage                    |
| Form & validation | React Hook Form, Zod                              |
| API backend       | Next.js Route Handlers                            |
| Authentication    | JWT bằng `jose`, HTTP-only cookies, refresh token |
| Chart             | Recharts                                          |
| Testing           | Jest, React Testing Library                       |
| Code quality      | ESLint, Prettier, Husky, lint-staged              |
| Deployment        | Vercel                                            |

## 5. Chức năng chính

### 5.1 Khách hàng

- Xem trang chủ và danh sách sản phẩm.
- Tìm kiếm sản phẩm theo tên, SKU, danh mục hoặc tag.
- Lọc sản phẩm theo danh mục, giới tính, bộ máy, giá và tồn kho.
- Xem chi tiết sản phẩm với mô tả, thông số, tính năng, giá và trạng thái tồn kho.
- Thêm sản phẩm vào giỏ hàng.
- Lưu sản phẩm yêu thích.
- Nhập thông tin giao hàng và tạo đơn hàng demo.
- Đăng ký, đăng nhập, đăng xuất và xem hồ sơ cá nhân.

### 5.2 Quản trị viên

- Truy cập dashboard quản trị.
- Xem thống kê doanh thu, đơn hàng, người dùng và tồn kho.
- Quản lý sản phẩm: thêm, sửa, xóa, tìm kiếm và upload ảnh preview.
- Quản lý đơn hàng: xem danh sách và cập nhật trạng thái.
- Quản lý người dùng: xem, tạo, chỉnh sửa và xóa tài khoản demo.

### 5.3 AI hỗ trợ

- Gợi ý sản phẩm theo nhu cầu tự nhiên của người dùng.
- Tạo nội dung mô tả, tính năng và tag cho sản phẩm.
- Phân tích số liệu dashboard.
- Khi chưa cấu hình `OPENAI_API_KEY`, hệ thống dùng fallback nội bộ để demo vẫn hoạt động.

## 6. API chính

| Nhóm API | Endpoint tiêu biểu                                                           | Mô tả                                                  |
| -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| Auth     | `/api/auth/login`, `/api/auth/register`, `/api/auth/me`, `/api/auth/refresh` | Đăng nhập, đăng ký, lấy user hiện tại và refresh token |
| Products | `/api/products`, `/api/products/[id]`                                        | Danh sách, chi tiết, tạo, cập nhật và xóa sản phẩm     |
| Orders   | `/api/orders`, `/api/orders/me`, `/api/orders/[id]/status`                   | Tạo đơn, xem đơn và cập nhật trạng thái                |
| Users    | `/api/users`, `/api/users/[id]`                                              | Quản lý người dùng                                     |
| AI       | `/api/ai/recommend`, `/api/ai/product-copy`, `/api/ai/insights`              | Gợi ý, tạo nội dung và phân tích dashboard             |

Response API được chuẩn hóa:

```json
{
  "success": true,
  "data": {}
}
```

```json
{
  "success": false,
  "message": "Validation failed"
}
```

## 7. Chiến lược render trong Next.js

| Loại render | Route tiêu biểu                                  | Mục đích                                                 |
| ----------- | ------------------------------------------------ | -------------------------------------------------------- |
| Static      | `/`, `/shop`, `/cart`, `/wishlist`, policy pages | Tối ưu tốc độ tải cho các trang công khai                |
| Dynamic SSR | `/admin/*`, `/profile`, `/checkout`              | Phù hợp với trang phụ thuộc trạng thái người dùng        |
| SSG/ISR     | `/product/[id]`                                  | Pre-render trang chi tiết sản phẩm và revalidate định kỳ |
| API Runtime | `/api/*`                                         | Xử lý backend trong cùng ứng dụng Next.js                |

## 8. Cấu trúc thư mục

```txt
casio-vn-store/
  docs/                 Tài liệu dự án, API, architecture, schema, sprint
  public/               Static assets
  src/
    app/                Next.js routes, layouts, metadata và API routes
    components/         Layout và common components
    data/               Seed products, users, orders
    features/           Module UI theo nghiệp vụ
    hooks/              Custom React hooks
    lib/                Client/server utilities
    schemas/            Zod validation schemas
    store/              Zustand global state
    styles/             Global CSS
    types/              TypeScript types
    views/              Page-level UI views
    __tests__/          Unit, component và integration tests
```

## 9. Bảo mật và phân quyền

- Hệ thống sử dụng JWT access token và refresh token.
- Token được lưu bằng HTTP-only cookies để giảm rủi ro bị đọc trực tiếp từ JavaScript.
- Middleware bảo vệ route `/admin/*` và chỉ cho phép user có role `admin` truy cập.
- Form đăng nhập/đăng ký được validate bằng React Hook Form và Zod.
- API trả response lỗi thống nhất để frontend xử lý rõ ràng.

## 10. Kiểm thử và triển khai

Các script chính:

```bash
npm install
npm run dev
npm run lint
npm run type-check
npm run test
npm run build
```

Dự án có test bằng Jest và React Testing Library cho hook, component, page và một số luồng tích hợp. Khi triển khai, Vercel chạy `npm run build` để tạo bản production.

## 11. Đánh giá kết quả

Dự án đã đáp ứng các yêu cầu chính của một web app thương mại điện tử xây dựng bằng Next.js:

- Có giao diện người dùng và giao diện quản trị.
- Có routing theo App Router.
- Có API Routes cho các module nghiệp vụ.
- Có auth, phân quyền và middleware bảo vệ admin.
- Có search, filter, pagination, cart, wishlist và checkout.
- Có dashboard và CRUD cho các module chính.
- Có tài liệu kỹ thuật và có thể triển khai production.

## 12. Hướng phát triển

- Thay mock database bằng PostgreSQL hoặc MySQL thông qua Prisma.
- Bổ sung password hashing production-grade.
- Đồng bộ CRUD admin trực tiếp với database thật.
- Thêm thanh toán online qua VNPay, MoMo hoặc Stripe.
- Bổ sung E2E test bằng Playwright.
- Quản lý ảnh sản phẩm bằng Cloudinary, S3 hoặc Vercel Blob.

## 13. Kết luận

Casio VN Store là một dự án full-stack nhẹ trên nền Next.js, phù hợp để minh họa quy trình xây dựng website thương mại điện tử hiện đại. Dự án kết hợp frontend React, backend API trong cùng codebase, xác thực JWT, phân quyền admin, quản lý trạng thái, tài liệu kỹ thuật và pipeline build/deploy. Kiến trúc hiện tại đủ rõ ràng để phục vụ báo cáo môn học và có thể mở rộng thành hệ thống production khi bổ sung database thật, lưu trữ ảnh và thanh toán trực tuyến.
