'use client'

import { useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { Upload, X } from 'lucide-react'

type Props = {
  onImageUpload: (image: string) => void
  currentImage?: string
}

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function UploadImage({ onImageUpload, currentImage }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const preview = currentImage || null

  const readFile = (file: File) => {
    setError('')

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP.')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Ảnh không được vượt quá 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      onImageUpload(result)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      readFile(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      readFile(file)
    }
  }

  const removeImage = () => {
    setError('')
    onImageUpload('')
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
        Upload ảnh sản phẩm
      </label>

      {preview ? (
        <div className="relative overflow-hidden rounded-[var(--radius-sm)] border border-dashed border-[var(--color-border-strong)] bg-white">
          <img
            src={preview}
            alt="Preview ảnh sản phẩm"
            className="h-64 w-full object-contain p-4"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-surface-raised)] shadow transition hover:bg-[rgba(221,51,51,0.08)]"
            aria-label="Xóa ảnh sản phẩm"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex h-64 flex-col items-center justify-center rounded-[var(--radius-sm)] border-2 border-dashed transition-all ${
            isDragging
              ? 'border-[var(--color-surface-base)] bg-[rgba(16,4,4,0.04)]'
              : 'border-[var(--color-border-strong)] bg-white hover:border-[var(--color-text-secondary)]'
          }`}
        >
          <Upload size={44} className="mb-4 text-[var(--color-text-secondary)]" />
          <p className="font-medium text-[var(--color-text-primary)]">Kéo thả ảnh vào đây</p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">hoặc</p>

          <label className="site-button site-button--secondary mt-4 cursor-pointer">
            Chọn ảnh từ máy
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}

      {error && <p className="text-sm text-[var(--color-surface-raised)]">{error}</p>}
      <p className="text-center text-xs text-[var(--color-text-secondary)]">
        Hỗ trợ JPG, PNG, WebP. Dung lượng tối đa 2MB.
      </p>
    </div>
  )
}
