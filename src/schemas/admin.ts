import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(3, 'Tên sản phẩm tối thiểu 3 ký tự'),
  price: z.number().min(0, 'Giá không được âm'),
  category: z.string().min(1, 'Chọn danh mục'),
  description: z.string().min(10, 'Mô tả tối thiểu 10 ký tự'),
  image: z.string().url('URL ảnh không hợp lệ'),
})

export type ProductFormData = z.infer<typeof productSchema>

export const userSchema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  role: z.enum(['admin', 'user']),
  status: z.enum(['active', 'inactive']),
})

export type UserFormData = z.infer<typeof userSchema>
