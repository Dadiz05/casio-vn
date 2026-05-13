'use client'

import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { Edit2, Loader2, PackagePlus, Search, Sparkles, Trash2 } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { requestAiProductCopy } from '@/lib/ai'
import UploadImage from '@/features/products/components/UploadImage'
import type {
  Product,
  ProductCategory,
  ProductFormInput,
  ProductGender,
  ProductMovement,
} from '@/types'

const emptyForm: ProductFormInput = {
  name: '',
  price: '',
  originalPrice: '',
  category: 'G-Shock',
  image: '',
  description: '',
  fullDescription: '',
  features: '',
  tags: '',
  stock: '10',
  movement: 'Quartz',
  gender: 'Unisex',
  warrantyMonths: '24',
  badge: '',
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const parseListInput = (value: string) =>
  value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ProductFormInput>(emptyForm)
  const [searchQuery, setSearchQuery] = useState('')
  const [aiCopyLoading, setAiCopyLoading] = useState(false)
  const [aiCopyError, setAiCopyError] = useState('')
  const [aiCopySource, setAiCopySource] = useState('')
  const [formError, setFormError] = useState('')

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return products

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    )
  }, [products, searchQuery])

  const handleFieldChange =
    (field: keyof ProductFormInput) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }))
    }

  const resetForm = () => {
    setFormData(emptyForm)
    setEditingProductId(null)
    setShowForm(false)
    setAiCopyError('')
    setAiCopySource('')
    setFormError('')
  }

  const handleGenerateProductCopy = async () => {
    if (!formData.name.trim() || !formData.price.trim()) {
      setAiCopyError('Nhập tên và giá bán trước khi tạo nội dung.')
      return
    }

    setAiCopyLoading(true)
    setAiCopyError('')

    try {
      const result = await requestAiProductCopy({
        product: {
          name: formData.name,
          category: formData.category,
          price: formData.price,
          originalPrice: formData.originalPrice || undefined,
          movement: formData.movement,
          gender: formData.gender,
          stock: formData.stock,
          warrantyMonths: formData.warrantyMonths,
          image: formData.image,
          badge: formData.badge,
          existingDescription: formData.description,
        },
      })

      setFormData((current) => ({
        ...current,
        description: result.description,
        fullDescription: result.fullDescription,
        features: result.features.join('\n'),
        tags: result.tags.join(', '),
        badge: current.badge || result.badge,
      }))
      setAiCopySource(result.source === 'openai' ? 'OpenAI' : 'Fallback nội bộ')
    } catch (error) {
      setAiCopyError(error instanceof Error ? error.message : 'Không tạo được nội dung AI.')
    } finally {
      setAiCopyLoading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError('')

    const price = Number(formData.price)
    const originalPrice = Number(formData.originalPrice)
    const stock = Number(formData.stock)
    const warrantyMonths = Number(formData.warrantyMonths)
    const now = new Date().toISOString()
    const features = parseListInput(formData.features)
    const tags = parseListInput(formData.tags)

    if (!formData.image.trim()) {
      setFormError('Vui lòng nhập link ảnh hoặc upload ảnh sản phẩm.')
      return
    }

    if (Number.isNaN(price) || Number.isNaN(stock) || Number.isNaN(warrantyMonths)) {
      setFormError('Giá, tồn kho và thời gian bảo hành phải là số hợp lệ.')
      return
    }

    const existingProduct = products.find((product) => product.id === editingProductId)
    const productPayload: Product = {
      id: existingProduct?.id || slugify(`${formData.category}-${formData.name}-${Date.now()}`),
      sku: existingProduct?.sku || formData.name.toUpperCase().replace(/\s+/g, '-'),
      name: formData.name,
      price,
      originalPrice: originalPrice > price ? originalPrice : undefined,
      category: formData.category,
      image: formData.image,
      images: existingProduct?.images || [formData.image],
      description: formData.description,
      fullDescription:
        formData.fullDescription ||
        existingProduct?.fullDescription ||
        `${formData.name} là sản phẩm Casio chính hãng, có đầy đủ hộp, thẻ bảo hành và thông tin hậu mãi tại Casio VN.`,
      specs: existingProduct?.specs,
      features:
        features.length > 0
          ? features
          : existingProduct?.features || [
              'Hàng chính hãng',
              'Bảo hành điện tử',
              'Đóng gói fullbox',
            ],
      rating: existingProduct?.rating || 4.7,
      reviews: existingProduct?.reviews || 0,
      stock,
      sold: existingProduct?.sold || 0,
      badge: formData.badge || undefined,
      isNew: existingProduct?.isNew ?? true,
      isLimited: existingProduct?.isLimited ?? false,
      gender: formData.gender,
      movement: formData.movement,
      warrantyMonths,
      tags: tags.length > 0 ? tags : [formData.category, formData.movement, formData.gender],
      colorVariants: existingProduct?.colorVariants || [
        { name: 'Đen', value: 'black', hex: '#111827' },
        { name: 'Bạc', value: 'silver', hex: '#c7c9cc' },
      ],
    }

    if (editingProductId) {
      updateProduct(editingProductId, {
        ...productPayload,
        sku: existingProduct?.sku || productPayload.sku,
      })
    } else {
      addProduct({
        ...productPayload,
        fullDescription: `${productPayload.fullDescription} Ngày tạo: ${now}`,
      })
    }

    resetForm()
  }

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id)
    setFormData({
      name: product.name,
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : '',
      category: product.category,
      image: product.image,
      description: product.description,
      fullDescription: product.fullDescription || '',
      features: product.features?.join('\n') || '',
      tags: product.tags?.join(', ') || '',
      stock: String(product.stock),
      movement: product.movement,
      gender: product.gender,
      warrantyMonths: String(product.warrantyMonths),
      badge: product.badge || '',
    })
    setAiCopyError('')
    setAiCopySource('')
    setFormError('')
    setShowForm(true)
  }

  return (
    <div className="casio-container casio-section py-10 page-fade">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="site-kicker">Admin catalog</span>
          <h1 className="site-title mt-2 text-3xl sm:text-4xl">Quản lý sản phẩm</h1>
          <p className="site-copy mt-2">Theo dõi tồn kho, giá bán và thông tin trưng bày.</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true)
            setEditingProductId(null)
            setFormData(emptyForm)
            setAiCopyError('')
            setAiCopySource('')
            setFormError('')
          }}
          className="site-button site-button--primary"
        >
          <PackagePlus size={18} />
          Thêm sản phẩm
        </button>
      </div>

      <div className="site-card mb-8 p-4 sm:p-5">
        <label className="flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white px-4">
          <Search size={18} className="text-[var(--color-text-secondary)]" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Tìm theo tên, SKU hoặc dòng sản phẩm"
            className="min-h-12 flex-1 bg-transparent outline-none"
          />
        </label>
      </div>

      {showForm && (
        <div className="site-card mb-8 p-6 sm:p-8">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {editingProductId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h2>
              {aiCopySource && (
                <p className="site-copy mt-1 text-sm">Nguồn nội dung: {aiCopySource}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleGenerateProductCopy}
              disabled={aiCopyLoading}
              className="site-button site-button--secondary w-full lg:w-auto"
            >
              {aiCopyLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              AI tạo nội dung
            </button>
          </div>

          {aiCopyError && (
            <p className="mb-4 rounded-[var(--radius-sm)] border border-[rgba(221,51,51,0.24)] bg-[rgba(221,51,51,0.08)] px-4 py-3 text-sm text-[var(--color-surface-raised)]">
              {aiCopyError}
            </p>
          )}

          {formError && (
            <p className="mb-4 rounded-[var(--radius-sm)] border border-[rgba(221,51,51,0.24)] bg-[rgba(221,51,51,0.08)] px-4 py-3 text-sm text-[var(--color-surface-raised)]">
              {formError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <input
              type="text"
              value={formData.name}
              onChange={handleFieldChange('name')}
              className="site-field md:col-span-2"
              placeholder="Tên sản phẩm"
              required
            />
            <select
              value={formData.category}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  category: event.target.value as ProductCategory,
                }))
              }
              className="site-select"
            >
              <option value="G-Shock">G-Shock</option>
              <option value="Edifice">Edifice</option>
              <option value="Baby-G">Baby-G</option>
              <option value="Classic">Classic</option>
            </select>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={handleFieldChange('price')}
              className="site-field"
              placeholder="Giá bán"
              required
            />
            <input
              type="number"
              min="0"
              value={formData.originalPrice}
              onChange={handleFieldChange('originalPrice')}
              className="site-field"
              placeholder="Giá gốc"
            />
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleFieldChange('stock')}
              className="site-field"
              placeholder="Tồn kho"
              required
            />
            <select
              value={formData.movement}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  movement: event.target.value as ProductMovement,
                }))
              }
              className="site-select"
            >
              <option value="Quartz">Quartz</option>
              <option value="Solar">Solar</option>
              <option value="Bluetooth">Bluetooth</option>
              <option value="Automatic">Automatic</option>
            </select>
            <select
              value={formData.gender}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  gender: event.target.value as ProductGender,
                }))
              }
              className="site-select"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Unisex">Unisex</option>
            </select>
            <input
              type="number"
              min="1"
              value={formData.warrantyMonths}
              onChange={handleFieldChange('warrantyMonths')}
              className="site-field"
              placeholder="Bảo hành tháng"
            />
            <div className="grid gap-5 md:col-span-3 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
              <div>
                <label
                  htmlFor="product-image-url"
                  className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  Link ảnh sản phẩm
                </label>
                <input
                  id="product-image-url"
                  type="text"
                  value={formData.image.startsWith('data:') ? '' : formData.image}
                  onChange={handleFieldChange('image')}
                  className="site-field"
                  placeholder="Dán URL ảnh hoặc upload file bên cạnh"
                />
                <p className="site-copy mt-2 text-sm">
                  Có thể dùng URL ảnh trực tuyến hoặc upload file JPG, PNG, WebP tối đa 2MB.
                </p>
              </div>
              <UploadImage
                currentImage={formData.image}
                onImageUpload={(image) =>
                  setFormData((current) => ({
                    ...current,
                    image,
                  }))
                }
              />
            </div>
            <input
              type="text"
              value={formData.badge}
              onChange={handleFieldChange('badge')}
              className="site-field"
              placeholder="Badge: New, Limited..."
            />
            <textarea
              value={formData.description}
              onChange={handleFieldChange('description')}
              className="site-textarea min-h-[120px] md:col-span-3"
              placeholder="Mô tả ngắn"
              required
            />
            <textarea
              value={formData.fullDescription}
              onChange={handleFieldChange('fullDescription')}
              className="site-textarea min-h-[150px] md:col-span-3"
              placeholder="Mô tả chi tiết"
            />
            <textarea
              value={formData.features}
              onChange={handleFieldChange('features')}
              className="site-textarea min-h-[130px] md:col-span-2"
              placeholder="Tính năng, mỗi dòng một ý"
            />
            <textarea
              value={formData.tags}
              onChange={handleFieldChange('tags')}
              className="site-textarea min-h-[130px]"
              placeholder="Tag, phân tách bằng dấu phẩy"
            />

            <div className="flex flex-col gap-3 md:col-span-3 sm:flex-row">
              <button type="submit" className="site-button site-button--primary flex-1">
                {editingProductId ? 'Cập nhật' : 'Thêm sản phẩm'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="site-button site-button--secondary flex-1"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="site-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="border-b border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.04)]">
              <tr>
                <th className="p-5 text-left font-semibold">Sản phẩm</th>
                <th className="p-5 text-left font-semibold">Dòng</th>
                <th className="p-5 text-center font-semibold">Tồn kho</th>
                <th className="p-5 text-center font-semibold">Bộ máy</th>
                <th className="p-5 text-right font-semibold">Giá</th>
                <th className="p-5 text-center font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-[var(--color-border-strong)] transition hover:bg-[rgba(16,4,4,0.02)]"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-14 w-14 rounded-xl border border-[var(--color-border-strong)] bg-white object-contain p-1"
                      />
                      <div>
                        <p className="line-clamp-2 font-medium text-[var(--color-text-primary)]">
                          {product.name}
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)]">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-[var(--color-text-secondary)]">{product.category}</td>
                  <td className="p-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                        product.stock <= 5
                          ? 'bg-[rgba(221,51,51,0.12)] text-[var(--color-surface-raised)]'
                          : 'bg-[rgba(34,197,94,0.13)] text-green-700'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-5 text-center text-[var(--color-text-secondary)]">
                    {product.movement}
                  </td>
                  <td className="p-5 text-right font-semibold text-[var(--color-text-primary)]">
                    {product.price.toLocaleString('vi-VN')} ₫
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="site-button site-button--ghost min-h-10 px-3 py-2"
                        aria-label={`Sửa sản phẩm ${product.name}`}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
                            deleteProduct(product.id)
                          }
                        }}
                        className="site-button site-button--ghost min-h-10 px-3 py-2 text-[var(--color-surface-raised)]"
                        aria-label={`Xóa sản phẩm ${product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
