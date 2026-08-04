import { useProduct } from "../hooks/useProduct";
import type { Product } from "../types";
import { formatMoney } from "../utils/format";
import { DetailSkeleton } from "./ProductSkeleton";
import { QueryError } from "./QueryError";

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({
  productId,
  onBack,
  onAddToCart,
}: ProductDetailProps) {
  const { data: product, isLoading, isError, error, refetch } =
    useProduct(productId);

  if (isLoading) {
    return (
      <section aria-busy="true" aria-label="Đang tải sản phẩm">
        <DetailSkeleton />
      </section>
    );
  }

  if (isError || !product) {
    return (
      <section>
        <button
          type="button"
          onClick={onBack}
          className="mb-4 text-sm font-semibold text-ink-soft hover:text-ink"
        >
          ← Quay lại
        </button>
        <QueryError
          message={error instanceof Error ? error.message : undefined}
          onRetry={() => {
            void refetch();
          }}
        />
      </section>
    );
  }

  const outOfStock = product.stock === 0;
  const rating =
    typeof product.rating === "number"
      ? product.rating.toFixed(1)
      : String(product.rating);

  return (
    <section aria-labelledby="product-detail-title">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 text-sm font-semibold text-ink-soft transition hover:text-ink"
      >
        ← Quay lại danh sách
      </button>

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface-muted">
          <img
            src={product.thumbnail}
            alt={product.title}
            width={800}
            height={1000}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {product.category}
          </p>
          <h1
            id="product-detail-title"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            {product.title}
          </h1>
          {product.brand && (
            <p className="mt-2 text-sm text-ink-soft">{product.brand}</p>
          )}
          <p className="mt-4 text-2xl font-bold text-ink">
            {formatMoney(product.price)}
          </p>
          <p className="mt-2 text-sm text-ink-soft">★ {rating}</p>
          <p className="mt-6 text-sm leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={outOfStock}
              onClick={() => onAddToCart(product)}
              className={
                outOfStock
                  ? "cursor-not-allowed rounded-lg bg-surface-muted px-5 py-3 text-sm font-semibold text-muted"
                  : "rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              }
            >
              {outOfStock ? "Hết hàng" : "Thêm vào giỏ"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
