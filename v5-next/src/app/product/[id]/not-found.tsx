import Link from "next/link";

export default function ProductNotFound() {
  return (
    <section className="rounded-xl border border-line bg-surface px-4 py-10 text-center">
      <h1 className="font-display text-2xl font-bold text-ink">
        Không tìm thấy sản phẩm
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Không tìm thấy sản phẩm này.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-semibold text-ink underline"
      >
        Về trang chủ
      </Link>
    </section>
  );
}
