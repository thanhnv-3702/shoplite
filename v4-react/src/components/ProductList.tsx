import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

export interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-line bg-surface px-4 py-10 text-center text-ink-soft">
        Không tìm thấy sản phẩm phù hợp.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
