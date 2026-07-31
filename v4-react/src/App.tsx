import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { products } from "./data";

export default function App() {
  return (
    <div className="flex min-h-full flex-col">
      <Header cartCount={0} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <section aria-labelledby="products-title">
          <h1
            id="products-title"
            className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            Sản phẩm
          </h1>
          <p className="mt-2 text-sm text-ink-soft" aria-live="polite">
            {products.length} sản phẩm
          </p>

          <div className="mt-6">
            <ProductList products={products} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
