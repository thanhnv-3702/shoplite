import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  /** Ảnh above-the-fold — ưu tiên LCP. */
  priority?: boolean;
}

/**
 * Server Component — không hook/event.
 * Chỉ nhúng AddToCartButton (client) cho phần tương tác.
 */
export function ProductCard({ product, priority = false }: ProductCardProps) {
  const outOfStock = product.stock === 0;
  const rating =
    typeof product.rating === "number"
      ? product.rating.toFixed(1)
      : String(product.rating);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-sm">
      <Link
        href={`/product/${product.id}`}
        className="relative aspect-[4/5] overflow-hidden bg-surface-muted"
        aria-label={
          outOfStock
            ? `Xem ${product.title}, hết hàng`
            : `Xem ${product.title}`
        }
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={priority}
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        {outOfStock && (
          <span className="absolute left-2 top-2 rounded-md bg-ink px-2 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Hết hàng
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {product.category}
        </p>
        <h2 className="font-display text-base font-semibold leading-snug text-ink md:text-lg">
          <Link href={`/product/${product.id}`} className="hover:underline">
            {product.title}
          </Link>
        </h2>
        <p className="text-sm font-bold text-ink">{formatMoney(product.price)}</p>
        <p className="text-sm text-ink-soft">★ {rating}</p>
        <div className="mt-auto pt-2">
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
