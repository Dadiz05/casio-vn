# Sprint 5 - Dashboard, tối ưu UI/UX, AI hỗ trợ

## Mục tiêu

- Hoàn thiện dashboard báo cáo, SSR/ISR và SEO.
- Tối ưu trải nghiệm tìm kiếm và quản trị.
- Bổ sung AI dev middleware hỗ trợ demo.

## Công việc đã thực hiện

- Tạo dashboard thống kê doanh thu, đơn hàng, khách hàng và tồn kho.
- Tạo biểu đồ doanh thu bằng Recharts.
- Thêm SearchBar có debounce và suggestion.
- Tạo Next.js API Routes cho `/api/ai/recommend`, `/api/ai/product-copy`, `/api/ai/insights`.
- Thêm metadata per page, sitemap và ISR cho trang chi tiết sản phẩm.

## Kết quả

- Admin có màn hình tổng quan số liệu.
- Người dùng có tìm kiếm nhanh và gợi ý sản phẩm.
- AI có fallback nội bộ khi chưa cấu hình API key.
- Next build hiển thị product detail là SSG/ISR và admin là dynamic SSR.
