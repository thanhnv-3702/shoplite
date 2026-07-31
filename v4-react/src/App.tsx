import { useState } from "react";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { ProductList } from "./components/ProductList";
import { products } from "./data";
import type { CartItem, Product } from "./types";
import { filterProductsByKeyword } from "./utils/productHelpers";

export default function App() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = filterProductsByKeyword(products, query);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function handleAddToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  return (
    <div className="flex min-h-full flex-col">
      <Header
        cartCount={cartCount}
        query={query}
        onQueryChange={setQuery}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <section aria-labelledby="products-title">
          <h1
            id="products-title"
            className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
          >
            Sản phẩm
          </h1>
          <p className="mt-2 text-sm text-ink-soft" aria-live="polite">
            {filteredProducts.length} / {products.length} sản phẩm
          </p>

          <div className="mt-6">
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <LoginForm />
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
