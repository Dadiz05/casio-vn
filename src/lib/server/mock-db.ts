import { initialProducts } from '@/data/products'
import { initialOrders, initialUsers } from '@/data/seed'
import type { Order, Product, User } from '@/types'

const globalForMockDb = globalThis as typeof globalThis & {
  __casioMockDb?:
    | {
        products: Product[]
        orders: Order[]
        users: User[]
      }
    | undefined
}

export const mockDb =
  globalForMockDb.__casioMockDb ??
  (globalForMockDb.__casioMockDb = {
    products: [...initialProducts],
    orders: [...initialOrders],
    users: [...initialUsers],
  })

export const findUserByEmail = (email: string) =>
  mockDb.users.find((user) => user.email.toLowerCase() === email.toLowerCase())

export const withoutSensitiveUserFields = (user: User) => user
