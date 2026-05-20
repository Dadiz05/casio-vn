# AI Integration

AI chạy qua Next.js API Routes tại `/api/ai/*`.

## Cấu hình

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5-mini
```

Nếu không cấu hình `OPENAI_API_KEY`, server dùng fallback nội bộ để demo không bị lỗi.

## Endpoints

- `POST /api/ai/recommend`: tư vấn sản phẩm từ nhu cầu người dùng ở trang Shop.
- `POST /api/ai/product-copy`: tạo mô tả, feature, tag, badge cho Admin Products.
- `POST /api/ai/insights`: tạo nhận xét dashboard cho admin.

## Nguyên tắc

- Frontend không đọc `OPENAI_API_KEY`.
- API routes chỉ nhận dữ liệu cần thiết.
- Kết quả trả JSON để UI xử lý ổn định.
- Khi OpenAI lỗi hoặc thiếu key, fallback vẫn trả dữ liệu cùng shape.
