'use client'

import { useState } from 'react'
import { ExternalLink, MessageCircle, MessageSquare, Phone, X } from 'lucide-react'

const contactItems = [
  {
    label: 'Messenger',
    href: 'https://m.me/casiovietnam',
    className: 'bg-[#0084ff] text-white',
    icon: <MessageSquare size={22} />,
  },
  {
    label: 'Zalo',
    href: 'https://zalo.me/0943723388',
    className: 'bg-[#0068ff] text-white',
    icon: <span className="text-sm font-black">Zalo</span>,
  },
  {
    label: 'Hotline',
    href: 'tel:0943723388',
    className: 'bg-[#1f9d55] text-white',
    icon: <Phone size={22} />,
  },
]

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [showZaloModal, setShowZaloModal] = useState(false)

  return (
    <>
      <div className="floating-contact" aria-label="Kênh liên hệ nhanh">
        <div className={`floating-contact__menu ${isOpen ? 'is-open' : ''}`}>
          {contactItems.map((item) =>
            item.label === 'Zalo' ? (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setShowZaloModal(true)
                  setIsOpen(false)
                }}
                className={`floating-contact__item ${item.className}`}
              >
                <span className="floating-contact__label">{item.label}</span>
                <span className="floating-contact__icon">{item.icon}</span>
              </button>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className={`floating-contact__item ${item.className}`}
              >
                <span className="floating-contact__label">{item.label}</span>
                <span className="floating-contact__icon">{item.icon}</span>
              </a>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={`floating-contact__main ${isOpen ? 'is-open' : ''}`}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Đóng liên hệ nhanh' : 'Mở liên hệ nhanh'}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={30} />}
        </button>
      </div>

      {showZaloModal && (
        <div className="floating-modal" role="dialog" aria-modal="true" aria-label="Kết nối Zalo">
          <div className="floating-modal__panel">
            <button
              type="button"
              onClick={() => setShowZaloModal(false)}
              className="floating-modal__close"
              aria-label="Đóng"
            >
              <X size={22} />
            </button>

            <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <div className="floating-modal__brand">CASIO</div>
                  <div>
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                      Casio Việt Nam
                    </h2>
                    <p className="site-copy mt-1">Tư vấn đồng hồ chính hãng</p>
                  </div>
                </div>

                <a
                  href="https://zalo.me/0943723388"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-button site-button--primary w-full"
                >
                  Nhắn tin qua Zalo
                  <ExternalLink size={18} />
                </a>

                <div className="mt-5 grid gap-3 text-sm text-[var(--color-text-secondary)]">
                  <p>Hotline: 0943.72.3388</p>
                  <p>Giờ hỗ trợ: 09:00 - 21:00, Thứ 2 - Chủ Nhật</p>
                  <p>Showroom: Hà Nội, Đà Nẵng, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className="floating-modal__qr">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://zalo.me/0943723388"
                  alt="Mã QR Zalo Casio Việt Nam"
                />
                <p>Quét mã để kết nối nhanh trên điện thoại</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
