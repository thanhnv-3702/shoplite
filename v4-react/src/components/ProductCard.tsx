import { memo } from "react";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types";
import { formatMoney } from "../utils/format";

export interface ProductCardProps {
  product: Product;
  onOpenProduct: (id: number) => void;
}

export const ProductCard = memo(function ProductCard({
  product,
  onOpenProduct,
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const outOfStock = product.stock === 0;
  const rating =
    typeof product.rating === "number"
      ? product.rating.toFixed(1)
      : String(product.rating);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-sm">
      <button
        type="button"
        onClick={() => onOpenProduct(product.id)}
        className="relative aspect-[4/5] overflow-hidden bg-surface-muted text-left"
        aria-label={`Xem ${product.title}`}
      >
        <img
          src={product.thumbnail}
          alt=""
          width={400}
          height={500}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {outOfStock && (
          <span className="absolute left-2 top-2 rounded-md bg-ink px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Hết hàng
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {product.category}
        </p>
        <h2 className="font-display text-base font-semibold leading-snug text-ink md:text-lg">
          <button
            type="button"
            onClick={() => onOpenProduct(product.id)}
            className="text-left hover:underline"
          >
            {product.title}
          </button>
        </h2>
        <p className="text-sm font-bold text-ink">{formatMoney(product.price)}</p>
        <p className="text-sm text-ink-soft">★ {rating}</p>

        <div className="mt-auto pt-2">
          <button
            type="button"
            disabled={outOfStock}
            onClick={() => addToCart(product)}
            className={
              outOfStock
                ? "w-full cursor-not-allowed rounded-lg bg-surface-muted px-3 py-2.5 text-sm font-semibold text-muted"
                : "w-full rounded-lg bg-accent px-3 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 active:scale-[0.99]"
            }
          >
            {outOfStock ? "Hết hàng" : "Thêm vào giỏ"}
          </button>
        </div>
      </div>
    </article>
  );
});
