# Sprint 2 - Auth, protected routes, profile

## Mục tiêu

- Hoàn thiện đăng ký, đăng nhập, đăng xuất.
- Phân quyền admin/user.
- Tạo trang hồ sơ người dùng.

## Công việc đã thực hiện

- Tạo form Login/Register bằng React Hook Form và Zod.
- Tạo API Routes cho login/register/logout/refresh.
- Lưu user trong Zustand persist và JWT trong HTTP-only cookies.
- Tạo middleware bảo vệ `/admin/*`.
- Tạo trang Profile hiển thị thông tin cá nhân, đơn hàng và wishlist.

## Kết quả

- Admin truy cập được trang quản trị khi JWT có role admin.
- User thường bị chuyển hướng khỏi route admin.
- Có tài khoản demo cho admin và user.
