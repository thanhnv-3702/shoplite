import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="rounded-xl border border-line bg-surface px-4 py-16 text-center">
      <p className="font-display text-5xl font-bold text-ink">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold text-ink">
        Không tìm thấy trang
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Đường dẫn không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white no-underline"
      >
        Về trang chủ
      </Link>
    </section>
  );
}
