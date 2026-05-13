'use client'

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from '@/lib/navigation'
import { CheckCircle2, CreditCard, MapPin, PackageCheck, ShieldCheck } from 'lucide-react'
import { calculateCartSummary, formatCurrency, VOUCHERS } from '@/lib/cart'
import { useStore } from '@/store/useStore'
import type { PaymentMethod, ShippingInfo } from '@/types'

const initialShippingInfo: ShippingInfo = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: 'TP. Hồ Chí Minh',
  note: '',
}

export default function Checkout() {
  const { cart, clearCart, addOrder, user } = useStore()
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    ...initialShippingInfo,
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod')
  const [voucherCode, setVoucherCode] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const summary = useMemo(() => calculateCartSummary(cart, voucherCode), [cart, voucherCode])
  const normalizedVoucher = voucherCode.trim().toUpperCase()
  const voucher = VOUCHERS[normalizedVoucher]
  const voucherMessage =
    normalizedVoucher.length === 0
      ? ''
      : voucher && summary.discount > 0
        ? `${voucher.label} đã được áp dụng`
        : 'Mã chưa đủ điều kiện hoặc không hợp lệ'

  const handleFieldChange =
    (field: keyof ShippingInfo) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setShippingInfo((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')

    if (cart.length === 0) {
      setFormError('Giỏ hàng đang trống.')
      return
    }

    if (
      !shippingInfo.fullName ||
      !shippingInfo.phone ||
      !shippingInfo.email ||
      !shippingInfo.address
    ) {
      setFormError('Vui lòng nhập đủ họ tên, số điện thoại, email và địa chỉ nhận hàng.')
      return
    }

    const now = new Date()
    const nextOrderId = `ORD-${now.getFullYear()}-${String(now.getTime()).slice(-6)}`

    addOrder({
      id: nextOrderId,
      customerId: user?.id,
      customerName: shippingInfo.fullName,
      customerEmail: shippingInfo.email,
      shippingInfo,
      items: cart.map((item) => ({
        productId: item.id,
        sku: item.sku,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: summary.subtotal,
      discount: summary.discount,
      shippingFee: summary.shippingFee,
      total: summary.total,
      status: 'pending',
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'unpaid' : 'paid',
      voucherCode: summary.discount > 0 ? normalizedVoucher : undefined,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    })

    clearCart()
    setOrderId(nextOrderId)
  }

  if (orderId) {
    return (
      <div className="casio-container casio-section py-16 page-fade">
        <div className="site-card mx-auto max-w-2xl p-8 text-center sm:p-10">
          <CheckCircle2 size={72} className="mx-auto mb-6 text-green-600" />
          <span className="site-kicker justify-center">Đặt hàng thành công</span>
          <h1 className="site-title mt-3 text-3xl sm:text-4xl">Mã đơn {orderId}</h1>
          <p className="site-copy mx-auto mt-4 max-w-lg">
            Đơn hàng đã được ghi nhận. Bộ phận tư vấn sẽ xác nhận thông tin, kích hoạt bảo hành điện
            tử và cập nhật trạng thái trong trang quản trị.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/profile" className="site-button site-button--secondary flex-1">
              Xem tài khoản
            </Link>
            <Link to="/shop" className="site-button site-button--primary flex-1">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="casio-container casio-section py-12 page-fade">
      <div className="mb-8">
        <span className="site-kicker">Checkout</span>
        <h1 className="site-title mt-2 text-3xl sm:text-4xl">Hoàn tất đơn hàng</h1>
        <p className="site-copy mt-2">Xác nhận thông tin nhận hàng và phương thức thanh toán.</p>
      </div>

      {cart.length === 0 ? (
        <div className="site-card p-8 text-center">
          <PackageCheck size={64} className="mx-auto mb-5 text-[rgba(16,4,4,0.24)]" />
          <h2 className="text-2xl font-semibold">Giỏ hàng đang trống</h2>
          <p className="site-copy mt-2 mb-6">Thêm sản phẩm trước khi thanh toán.</p>
          <Link to="/shop" className="site-button site-button--primary">
            Quay lại cửa hàng
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="site-card p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <MapPin className="text-[var(--color-surface-raised)]" size={24} />
                <h2 className="text-2xl font-semibold">Thông tin nhận hàng</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="site-field"
                  placeholder="Họ và tên"
                  value={shippingInfo.fullName}
                  onChange={handleFieldChange('fullName')}
                />
                <input
                  className="site-field"
                  placeholder="Số điện thoại"
                  value={shippingInfo.phone}
                  onChange={handleFieldChange('phone')}
                />
                <input
                  className="site-field"
                  type="email"
                  placeholder="Email"
                  value={shippingInfo.email}
                  onChange={handleFieldChange('email')}
                />
                <select
                  className="site-select"
                  value={shippingInfo.city}
                  onChange={handleFieldChange('city')}
                >
                  <option>TP. Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                  <option>Cần Thơ</option>
                  <option>Tỉnh thành khác</option>
                </select>
                <input
                  className="site-field sm:col-span-2"
                  placeholder="Địa chỉ nhận hàng"
                  value={shippingInfo.address}
                  onChange={handleFieldChange('address')}
                />
                <textarea
                  className="site-textarea sm:col-span-2 min-h-[110px]"
                  placeholder="Ghi chú giao hàng"
                  value={shippingInfo.note}
                  onChange={handleFieldChange('note')}
                />
              </div>
            </section>

            <section className="site-card p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <CreditCard className="text-[var(--color-surface-raised)]" size={24} />
                <h2 className="text-2xl font-semibold">Thanh toán</h2>
              </div>
              <div className="grid gap-3">
                {[
                  ['cod', 'Thanh toán khi nhận hàng', 'Nhân viên xác nhận trước khi giao.'],
                  ['bank', 'Chuyển khoản ngân hàng', 'Giữ hàng ngay sau khi thanh toán.'],
                  ['card', 'Thẻ nội địa / quốc tế', 'Mô phỏng thanh toán online cho demo.'],
                ].map(([value, title, description]) => (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-[var(--radius-sm)] border p-4 transition ${
                      paymentMethod === value
                        ? 'border-[var(--color-surface-raised)] bg-[rgba(221,51,51,0.08)]'
                        : 'border-[var(--color-border-strong)] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="paymentMethod"
                      value={value}
                      checked={paymentMethod === value}
                      onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}
                    />
                    <span className="block font-semibold">{title}</span>
                    <span className="site-copy text-sm">{description}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          <aside className="site-card h-fit p-6 sm:p-8 lg:sticky lg:top-24">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="text-[var(--color-surface-raised)]" size={24} />
              <h2 className="text-2xl font-semibold">Tóm tắt đơn</h2>
            </div>

            <div className="mb-6 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 font-medium">{item.name}</p>
                    <p className="site-copy text-sm">
                      {item.quantity} x {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">
                Mã ưu đãi
              </label>
              <input
                className="site-field uppercase"
                placeholder="EXP001"
                value={voucherCode}
                onChange={(event) => setVoucherCode(event.target.value)}
              />
              {voucherMessage && (
                <p
                  className={`mt-2 text-sm ${
                    summary.discount > 0 ? 'text-green-700' : 'text-[var(--color-surface-raised)]'
                  }`}
                >
                  {voucherMessage}
                </p>
              )}
            </div>

            <div className="space-y-3 border-t border-[var(--color-border-strong)] pt-5">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatCurrency(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Giảm giá</span>
                <span>-{formatCurrency(summary.discount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Vận chuyển</span>
                <span>
                  {summary.shippingFee === 0 ? 'Miễn phí' : formatCurrency(summary.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[var(--color-border-strong)] pt-4 text-xl font-bold">
                <span>Tổng cộng</span>
                <span className="text-[var(--color-surface-raised)]">
                  {formatCurrency(summary.total)}
                </span>
              </div>
            </div>

            {formError && (
              <p className="mt-4 text-sm text-[var(--color-surface-raised)]">{formError}</p>
            )}

            <button type="submit" className="site-button site-button--primary mt-6 w-full">
              Đặt hàng
            </button>
          </aside>
        </form>
      )}
    </div>
  )
}
