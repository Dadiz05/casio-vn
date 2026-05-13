import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { initialProducts } from '@/data/products'
import { initialOrders, initialUsers } from '@/data/seed'
import type { CartItem, Order, OrderStatus, Product, User } from '@/types'

interface StoreState {
  user: User | null
  setUser: (userData: User) => void
  logout: () => void

  products: Product[]
  setProducts: (newProducts: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void

  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  clearCart: () => void

  wishlistIds: string[]
  toggleWishlist: (id: string) => void
  clearWishlist: () => void

  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void

  users: User[]
  addUser: (user: User) => void
  updateUser: (id: string, user: Partial<User>) => void
  deleteUser: (id: string) => void
}

type PersistedStoreState = Partial<
  Pick<StoreState, 'user' | 'products' | 'cart' | 'wishlistIds' | 'orders' | 'users'>
>

const isPersistedStoreState = (value: unknown): value is PersistedStoreState =>
  typeof value === 'object' && value !== null

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),

      products: initialProducts,
      setProducts: (newProducts) => set({ products: newProducts }),
      addProduct: (product) => set({ products: [product, ...get().products] }),
      updateProduct: (id, product) =>
        set({
          products: get().products.map((item) => (item.id === id ? { ...item, ...product } : item)),
        }),
      deleteProduct: (id) =>
        set({
          products: get().products.filter((item) => item.id !== id),
          wishlistIds: get().wishlistIds.filter((itemId) => itemId !== id),
          cart: get().cart.filter((item) => item.id !== id),
        }),

      cart: [],
      addToCart: (product, quantity = 1) => {
        const nextQuantity = Math.max(1, quantity)
        const existing = get().cart.find((item) => item.id === product.id)

        if (existing) {
          set({
            cart: get().cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + nextQuantity, product.stock) }
                : item
            ),
          })
          return
        }

        set({
          cart: [{ ...product, quantity: Math.min(nextQuantity, product.stock) }, ...get().cart],
        })
      },
      removeFromCart: (id) =>
        set({
          cart: get().cart.filter((item) => item.id !== id),
        }),
      updateCartQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(id)
          return
        }

        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.min(quantity, item.stock) } : item
          ),
        })
      },
      clearCart: () => set({ cart: [] }),

      wishlistIds: [],
      toggleWishlist: (id) => {
        const wishlistIds = get().wishlistIds
        set({
          wishlistIds: wishlistIds.includes(id)
            ? wishlistIds.filter((itemId) => itemId !== id)
            : [id, ...wishlistIds],
        })
      },
      clearWishlist: () => set({ wishlistIds: [] }),

      orders: initialOrders,
      addOrder: (order) =>
        set({
          orders: [order, ...get().orders],
          products: get().products.map((product) => {
            const purchased = order.items.find((item) => item.productId === product.id)
            if (!purchased) return product

            return {
              ...product,
              stock: Math.max(0, product.stock - purchased.quantity),
              sold: product.sold + purchased.quantity,
            }
          }),
        }),
      updateOrderStatus: (id, status) =>
        set({
          orders: get().orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  status,
                  paymentStatus: status === 'completed' ? 'paid' : order.paymentStatus,
                  updatedAt: new Date().toISOString(),
                }
              : order
          ),
        }),

      users: initialUsers,
      addUser: (user) => set({ users: [user, ...get().users] }),
      updateUser: (id, user) =>
        set((state) => ({
          users: state.users.map((item) =>
            item.id === id ? { ...item, ...user, updatedAt: new Date().toISOString() } : item
          ),
          user:
            state.user?.id === id
              ? { ...state.user, ...user, updatedAt: new Date().toISOString() }
              : state.user,
        })),
      deleteUser: (id) => set({ users: get().users.filter((item) => item.id !== id) }),
    }),
    {
      name: 'casio-vn-store',
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState) => {
        if (!isPersistedStoreState(persistedState)) return persistedState

        return {
          ...persistedState,
          products: initialProducts,
          orders: initialOrders,
          cart: [],
          wishlistIds: [],
        }
      },
      partialize: (state) => ({
        user: state.user,
        products: state.products,
        cart: state.cart,
        wishlistIds: state.wishlistIds,
        orders: state.orders,
        users: state.users,
      }),
    }
  )
)
