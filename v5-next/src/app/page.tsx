import { ProductList } from "@/components/ProductList";
import { filterProductsByKeyword } from "@/lib/format";
import { getProducts } from "@/lib/products";

/** ISR: làm mới dữ liệu trang chủ mỗi 60s (mô phỏng cache/revalidate). */
export const revalidate = 60;

interface HomePageProps {
  searchParams: Promise<{ q?: string }>;
}

/**
 * Server Component — fetch + lọc trên server.
 * View Source sẽ thấy HTML tên/giá sản phẩm có sẵn (không chờ JS).
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  const { q = "" } = await searchParams;
  const products = await getProducts();
  const filtered = filterProductsByKeyword(products, q);

  return (
    <section aria-labelledby="products-title">
      <h1
        id="products-title"
        className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
      >
        Sản phẩm
      </h1>
      <p className="mt-2 text-sm text-ink-soft" aria-live="polite">
        {filtered.length} / {products.length} sản phẩm
        {q.trim() ? ` · “${q.trim()}”` : ""}
      </p>

      <div className="mt-6">
        <ProductList products={filtered} />
      </div>
    </section>
  );
}
