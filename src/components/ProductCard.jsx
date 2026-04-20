import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group site-card overflow-hidden h-full flex flex-col transition-transform duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="relative aspect-square overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f3f4f6)]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
          />

          <div className="absolute top-4 left-4 site-chip bg-white/92 text-[var(--color-text-primary)] shadow-sm">
            {product.category}
          </div>

          <button
            type="button"
            onClick={handleLike}
            aria-pressed={isLiked}
            aria-label={
              isLiked ? "Bỏ yêu thích sản phẩm" : "Yêu thích sản phẩm"
            }
            className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white/95 text-[var(--color-text-primary)] shadow-sm transition-all hover:bg-[rgba(221,51,51,0.08)] active:scale-95"
          >
            <Heart
              size={20}
              className={`transition-colors ${isLiked ? "fill-[var(--color-surface-raised)] text-[var(--color-surface-raised)]" : "text-[var(--color-text-secondary)]"}`}
            />
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="site-title text-lg sm:text-xl mb-2 line-clamp-2 group-hover:text-[var(--color-surface-raised)] transition-colors">
            {product.name}
          </h3>

          <p className="site-copy text-sm mb-5 line-clamp-2">
            {product.description}
          </p>
        </Link>

        <div className="mt-auto pt-4 border-t border-[var(--color-border-strong)]">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-[var(--color-surface-base)]">
              {product.price.toLocaleString("vi-VN")}
            </span>
            <span className="text-2xl font-medium text-[var(--color-surface-raised)]">
              ₫
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
