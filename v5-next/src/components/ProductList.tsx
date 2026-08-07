import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
}

/** Server Component — chỉ map data đã fetch ở server. */
export function ProductList({ products }: ProductListProps) {
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
