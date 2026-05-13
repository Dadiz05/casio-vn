'use client'

import { Link } from '@/lib/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Shield, Clock, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import ProductCard from '@/features/products/components/ProductCard'

export default function Home() {
  const { products } = useStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const featuredProducts = products.slice(0, 8)
  const heroSlides = [
    {
      kicker: 'CASIO VINTAGE',
      title: 'CASIO VINTAGE',
      model: 'A158',
      description: 'Thiết kế điện tử cổ điển, mặt số dễ đọc và dây kim loại gọn nhẹ.',
      image:
        products.find((product) => product.category === 'Classic')?.image || '/MTP-B190L-7BV.jpg',
      to: '/shop?category=Classic',
      tone: 'silver',
    },
    {
      kicker: 'G-SHOCK',
      title: 'G-SHOCK',
      model: '2100 Series',
      description: 'Bền bỉ, chống sốc và sẵn sàng cho lịch trình nhiều chuyển động.',
      image:
        products.find((product) => product.category === 'G-Shock')?.image ||
        featuredProducts[0]?.image,
      to: '/shop?category=G-Shock',
      tone: 'dark',
    },
    {
      kicker: 'EDIFICE',
      title: 'EDIFICE',
      model: 'Chronograph',
      description: 'Dáng thể thao lịch lãm, phù hợp công việc, sự kiện và di chuyển mỗi ngày.',
      image:
        products.find((product) => product.category === 'Edifice')?.image ||
        featuredProducts[1]?.image,
      to: '/shop?category=Edifice',
      tone: 'steel',
    },
    {
      kicker: 'BABY-G',
      title: 'BABY-G',
      model: 'Pastel Style',
      description: 'Màu sắc trẻ trung, chống va đập tốt và gọn nhẹ trên cổ tay.',
      image:
        products.find((product) => product.category === 'Baby-G')?.image ||
        featuredProducts[2]?.image,
      to: '/shop?category=Baby-G',
      tone: 'soft',
    },
  ].filter((slide) => Boolean(slide.image))
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 4800)

    return () => window.clearInterval(timer)
  }, [heroSlides.length])

  const previousSlide = () => {
    setActiveSlide((current) => (current === 0 ? heroSlides.length - 1 : current - 1))
  }

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length)
  }

  return (
    <div>
      <section className="home-hero-section page-fade" aria-label="Bộ sưu tập Casio nổi bật">
        <div className="home-hero-carousel">
          {heroSlides.map((slide, index) => (
            <article
              key={`${slide.title}-${slide.model}`}
              className={`home-hero-slide home-hero-slide--${slide.tone} ${
                index === activeSlide ? 'is-active' : ''
              }`}
              aria-hidden={index !== activeSlide}
            >
              <div className="home-hero-still-life" />
              <div className="home-hero-copy">
                <p className="home-hero-kicker">{slide.kicker}</p>
                <h1 className="home-hero-title">{slide.title}</h1>
                <p className="home-hero-model">{slide.model}</p>
                <p className="home-hero-description">{slide.description}</p>
                <Link to={slide.to} className="home-hero-link">
                  Khám phá ngay
                  <ArrowRight size={18} />
                </Link>
              </div>
              <img src={slide.image} alt="" className="home-hero-watch" />
            </article>
          ))}

          <button
            type="button"
            onClick={previousSlide}
            className="home-hero-arrow home-hero-arrow--prev"
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="home-hero-arrow home-hero-arrow--next"
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight size={24} />
          </button>

          <div className="home-hero-dots" aria-label="Chọn ảnh banner">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={`${slide.title}-dot`}
                onClick={() => setActiveSlide(index)}
                className={`home-hero-dot ${index === activeSlide ? 'is-active' : ''}`}
                aria-label={`Chuyển đến ${slide.title} ${slide.model}`}
                aria-current={index === activeSlide}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="casio-section pt-0">
        <div className="casio-container">
          <div className="home-trust-grid">
            {[
              [
                <Shield size={22} />,
                'Bảo hành chính hãng',
                'Kích hoạt bảo hành điện tử 24 tháng, hỗ trợ kiểm tra minh bạch sau mua.',
              ],
              [
                <Clock size={22} />,
                'Chọn đúng nhu cầu',
                'Tư vấn theo ngân sách, phong cách, bộ máy và mức chống nước bạn cần.',
              ],
              [
                <Award size={22} />,
                'Giao nhanh toàn quốc',
                'Đóng gói chắc chắn, theo dõi đơn rõ ràng và nhận hàng đúng hẹn.',
              ],
            ].map(([iconNode, title, description]) => (
              <div key={title as string} className="home-trust-card">
                <div className="home-trust-card__icon">
                  {iconNode}
                  CASIO
                </div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="casio-section pt-0">
        <div className="casio-container">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="site-kicker">Sản phẩm nổi bật</span>
              <h2 className="site-title text-3xl sm:text-4xl mt-2">Danh sách mua nhanh</h2>
              <p className="site-copy mt-2 max-w-xl">
                Hiển thị theo bố cục thẳng, rõ nhịp, dễ quét trên desktop lẫn mobile.
              </p>
            </div>
            <Link to="/shop" className="site-button site-button--ghost hidden sm:inline-flex">
              Xem toàn bộ
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="casio-section pt-0 pb-20">
        <div className="casio-container">
          <div className="site-card p-7 sm:p-10 bg-[linear-gradient(180deg,#ffffff,#f8f7f6)]">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-center">
              <div>
                <span className="site-kicker">Brand story</span>
                <h2 className="site-title text-3xl sm:text-4xl mt-2">
                  Casio là người bạn đồng hành đáng tin cậy.
                </h2>
              </div>
              <p className="site-copy text-base sm:text-lg leading-7">
                Từ năm 1974, Casio được xây dựng như một hệ thống sản phẩm bền bỉ, rõ tính năng và
                dễ sử dụng. Giao diện storefront này giữ đúng tinh thần đó: gọn, dễ truy cập và tối
                ưu cho quyết định mua hàng nhanh.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
