# API Specification

API được triển khai bằng Next.js Route Handlers trong `src/app/api`.

## Response format

Thành công:

```json
{
  "success": true,
  "data": {}
}
```

Lỗi:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Email không hợp lệ" }]
}
```

## Auth

- `POST /api/auth/login`: đăng nhập, set access/refresh token cookies.
- `POST /api/auth/register`: tạo user mới, set cookies.
- `POST /api/auth/logout`: xóa cookies.
- `POST /api/auth/refresh`: cấp lại access/refresh token từ refresh token.
- `GET /api/auth/me`: trả về user hiện tại từ access token.

## Products

- `GET /api/products`: danh sách sản phẩm, hỗ trợ `search`, `category`, `movement`, `gender`.
- `POST /api/products`: tạo sản phẩm.
- `GET /api/products/:id`: chi tiết sản phẩm.
- `PATCH /api/products/:id`: cập nhật sản phẩm.
- `DELETE /api/products/:id`: xóa sản phẩm.

## Orders

- `GET /api/orders`: danh sách đơn hàng, hỗ trợ `status`, `customerId`.
- `POST /api/orders`: tạo đơn hàng.
- `GET /api/orders/me`: đơn hàng của user hiện tại.
- `PATCH /api/orders/:id/status`: cập nhật trạng thái đơn hàng.

## Users

- `GET /api/users`: danh sách user, hỗ trợ `search`, `role`.
- `POST /api/users`: tạo user.
- `PATCH /api/users/:id`: cập nhật user.
- `DELETE /api/users/:id`: xóa user.

## AI

- `POST /api/ai/recommend`: tư vấn sản phẩm từ nhu cầu tự nhiên.
- `POST /api/ai/product-copy`: tạo mô tả, feature, tag, badge cho sản phẩm.
- `POST /api/ai/insights`: phân tích dashboard.

Nếu không có `OPENAI_API_KEY`, AI routes trả fallback nội bộ để demo vẫn chạy.
