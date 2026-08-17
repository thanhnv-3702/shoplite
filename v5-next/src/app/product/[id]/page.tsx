import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatMoney } from "@/lib/format";
import { getProductById, getProducts } from "@/lib/products";

export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    return { title: "Không tìm thấy sản phẩm" };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [{ url: product.thumbnail, alt: product.title }],
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.slice(0, 6).map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isFinite(productId) || productId <= 0) {
    notFound();
  }

  const product = await getProductById(productId);
  if (!product) {
    notFound();
  }

  const outOfStock = product.stock === 0;
  const rating =
    typeof product.rating === "number"
      ? product.rating.toFixed(1)
      : String(product.rating);

  return (
    <section aria-labelledby="product-detail-title">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-semibold text-ink-soft hover:text-ink"
      >
        ← Quay lại danh sách
      </Link>

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface-muted">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={800}
            height={1000}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/5] w-full object-cover"
            priority
          />
        </div>

        <div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                name: product.title,
                description: product.description,
                image: product.thumbnail,
                offers: {
                  "@type": "Offer",
                  priceCurrency: "VND",
                  price: product.price,
                  availability: product.stock > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                },
              }),
            }}
          />
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
          <p className="mt-3 text-sm text-muted">
            {outOfStock ? "Hết hàng" : `Còn ${product.stock} sản phẩm`}
          </p>

          <div className="mt-8 max-w-xs">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
