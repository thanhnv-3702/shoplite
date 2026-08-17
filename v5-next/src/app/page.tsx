import type { Metadata } from "next";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductList } from "@/components/ProductList";
import {
  filterByCategory,
  filterProductsByKeyword,
  uniqueCategories,
} from "@/lib/format";
import { getProducts } from "@/lib/products";

/** ISR: làm mới dữ liệu trang chủ mỗi 60s (mô phỏng cache/revalidate). */
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sản phẩm",
  description:
    "Danh sách sản phẩm ShopLite — tìm kiếm, lọc danh mục, thêm vào giỏ.",
  openGraph: {
    title: "Sản phẩm ShopLite",
    description: "Cửa hàng tiện ích cho mọi nhà.",
  },
};

interface HomePageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

/**
 * Server Component — fetch + lọc trên server.
 * URL state: `?q=` + `category=` — share/back/forward giữ bộ lọc.
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  const { q = "", category = "" } = await searchParams;
  const products = await getProducts();
  const categories = uniqueCategories(products);
  const byQuery = filterProductsByKeyword(products, q);
  const filtered = filterByCategory(byQuery, category);

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
        {category.trim() ? ` · ${category.trim()}` : ""}
      </p>

      <CategoryFilter categories={categories} active={category} q={q} />

      <div className="mt-6">
        <ProductList products={filtered} />
      </div>
    </section>
  );
}
