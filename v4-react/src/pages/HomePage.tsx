import { useCallback, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ContactForm } from "../components/ContactForm";
import { LoginForm } from "../components/LoginForm";
import { ProductList } from "../components/ProductList";
import { ProductSkeleton } from "../components/ProductSkeleton";
import { QueryError } from "../components/QueryError";
import { useProducts } from "../hooks/useProducts";
import type { LayoutOutletContext } from "../layouts/outletContext";
import { filterProductsByKeyword } from "../utils/productHelpers";

export default function HomePage() {
  const { query } = useOutletContext<LayoutOutletContext>();
  const navigate = useNavigate();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts();

  const filteredProducts = useMemo(
    () => filterProductsByKeyword(products, query),
    [products, query],
  );

  const handleOpenProduct = useCallback(
    (id: number) => {
      void navigate(`/product/${id}`);
    },
    [navigate],
  );

  return (
    <>
      <section aria-labelledby="products-title">
        <h1
          id="products-title"
          className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
        >
          Sản phẩm
        </h1>
        <p className="mt-2 text-sm text-ink-soft" aria-live="polite">
          {isLoading
            ? "Đang tải…"
            : `${filteredProducts.length} / ${products.length} sản phẩm`}
        </p>

        <div className="mt-6">
          {isLoading && <ProductSkeleton />}
          {isError && (
            <QueryError
              message={error instanceof Error ? error.message : undefined}
              onRetry={() => {
                void refetch();
              }}
            />
          )}
          {!isLoading && !isError && (
            <ProductList
              products={filteredProducts}
              onOpenProduct={handleOpenProduct}
            />
          )}
        </div>
      </section>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <LoginForm />
        <ContactForm />
      </div>
    </>
  );
}
