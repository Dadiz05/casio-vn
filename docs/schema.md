# Database Schema

## Product

- `id`, `sku`, `name`, `category`
- `price`, `originalPrice`
- `image`, `images`
- `description`, `fullDescription`
- `stock`, `sold`, `rating`, `reviews`
- `movement`, `gender`, `warrantyMonths`
- `specs`, `features`, `tags`, `colorVariants`

## User

- `id`, `name`, `email`, `role`
- `status`, `phone`, `address`
- `createdAt`, `updatedAt`

## Order

- `id`, `customerId`, `customerName`, `customerEmail`
- `shippingInfo`
- `items`
- `subtotal`, `discount`, `shippingFee`, `total`
- `status`, `paymentMethod`, `paymentStatus`, `voucherCode`
- `createdAt`, `updatedAt`

## Cart Item

- Kế thừa dữ liệu hiển thị sản phẩm tại thời điểm thêm giỏ.
- Có thêm `quantity` để tính tổng tiền và tồn kho.
