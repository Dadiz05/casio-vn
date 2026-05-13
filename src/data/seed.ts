import { initialProducts } from './products'
import type { Order, OrderStatus, User } from '@/types'

export const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin Casio',
    email: 'admin@casio.vn',
    role: 'admin',
    status: 'active',
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    name: 'Nguyễn Văn A',
    email: 'user@casio.vn',
    role: 'user',
    status: 'active',
    phone: '0901234567',
    address: 'Quận 1, TP. Hồ Chí Minh',
    createdAt: '2026-02-20',
  },
  {
    id: '3',
    name: 'Trần Thị Bích',
    email: 'bich.tran@gmail.com',
    role: 'user',
    status: 'active',
    createdAt: '2026-03-10',
  },
]

const createSeedOrder = (
  id: string,
  productIds: string[],
  status: OrderStatus,
  createdAt: string
): Order => {
  const items = productIds
    .map((productId, index) => {
      const product =
        initialProducts.find((item) => item.id === productId) || initialProducts[index]

      return {
        productId: product.id,
        sku: product.sku,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: index + 1,
      }
    })
    .filter(Boolean)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = subtotal >= 2_000_000 ? 0 : 35_000

  return {
    id,
    customerId: '2',
    customerName: 'Nguyễn Văn A',
    customerEmail: 'user@casio.vn',
    shippingInfo: {
      fullName: 'Nguyễn Văn A',
      phone: '0901234567',
      email: 'user@casio.vn',
      address: '12 Nguyễn Văn Bảo',
      city: 'TP. Hồ Chí Minh',
      note: 'Giao giờ hành chính',
    },
    items,
    subtotal,
    discount: 0,
    shippingFee,
    total: subtotal + shippingFee,
    status,
    paymentMethod: 'cod',
    paymentStatus: status === 'completed' ? 'paid' : 'unpaid',
    createdAt,
    updatedAt: createdAt,
  }
}

export const initialOrders: Order[] = [
  createSeedOrder(
    'ORD-2026-0001',
    [initialProducts[0].id, initialProducts[1].id],
    'shipping',
    '2026-05-05'
  ),
  createSeedOrder('ORD-2026-0002', [initialProducts[2].id], 'completed', '2026-05-02'),
  createSeedOrder(
    'ORD-2026-0003',
    [initialProducts[3].id, initialProducts[6].id],
    'pending',
    '2026-05-10'
  ),
]
