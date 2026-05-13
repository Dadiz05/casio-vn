'use client'

import { type ReactNode } from 'react'
import { Link } from '@/lib/navigation'
import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react'

interface PolicySection {
  title: string
  body?: string
  items?: string[]
}

interface PolicyHighlight {
  label: string
  value: string
}

interface PolicyPageProps {
  icon: ReactNode
  kicker: string
  title: string
  description: string
  highlights: PolicyHighlight[]
  sections: PolicySection[]
  noteTitle: string
  note: string
}

export default function PolicyPage({
  icon,
  kicker,
  title,
  description,
  highlights,
  sections,
  noteTitle,
  note,
}: PolicyPageProps) {
  return (
    <div className="policy-page page-fade">
      <div className="casio-container casio-section py-10">
        <Link to="/" className="policy-back-link">
          <ArrowLeft size={18} />
          Quay lại trang chủ
        </Link>

        <section className="policy-hero">
          <div className="policy-hero__icon">{icon}</div>
          <div>
            <span className="site-kicker">{kicker}</span>
            <h1 className="site-title mt-3 text-3xl sm:text-5xl">{title}</h1>
            <p className="site-copy mt-4 max-w-2xl text-base sm:text-lg">{description}</p>
          </div>
        </section>

        <div className="policy-highlight-grid">
          {highlights.map((item) => (
            <div key={item.label} className="policy-highlight-card">
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="policy-content-grid">
          <div className="space-y-4">
            {sections.map((section, index) => (
              <section key={section.title} className="policy-section-card">
                <div className="policy-section-card__number">{index + 1}</div>
                <div>
                  <h2>{section.title}</h2>
                  {section.body && <p className="site-copy mt-2">{section.body}</p>}
                  {section.items && (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={17} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <aside className="policy-side-card">
            <span className="site-kicker">Cần hỗ trợ?</span>
            <h2 className="site-title mt-2 text-2xl">{noteTitle}</h2>
            <p className="site-copy mt-3">{note}</p>
            <div className="mt-5 space-y-3">
              <a href="tel:0943723388" className="site-button site-button--primary w-full">
                <Phone size={18} />
                0943.72.3388
              </a>
              <Link to="/shop" className="site-button site-button--secondary w-full">
                Tiếp tục mua sắm
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
