import Link from "next/link";

const upcomingRoutes = [
  { href: "/product/1", label: "Chi tiết sản phẩm" },
  { href: "/cart", label: "Giỏ hàng" },
  { href: "/checkout", label: "Thanh toán" },
  { href: "/login", label: "Đăng nhập" },
  { href: "/orders", label: "Đơn hàng" },
  { href: "/orders/demo-001", label: "Đơn hàng chi tiết (nested)" },
];

export default function HomePage() {
  // Server Component (mặc định) — log này hiện ở terminal khi chạy `next dev`
  console.log("[server] HomePage render");

  return (
    <section aria-labelledby="products-title">
      <h1
        id="products-title"
        className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
      >
        Sản phẩm
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Khung danh sách — dữ liệu thật sẽ fetch ở Day 15.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-xl border border-line bg-surface"
          >
            <div className="aspect-[4/5] bg-surface-muted" />
            <div className="space-y-2 p-3 md:p-4">
              <div className="h-3 w-1/3 rounded bg-surface-muted" />
              <div className="h-4 w-4/5 rounded bg-surface-muted" />
              <div className="h-4 w-1/2 rounded bg-surface-muted" />
            </div>
          </article>
        ))}
      </div>

      <nav
        aria-label="Route khung ShopLite"
        className="mt-12 rounded-2xl border border-line bg-surface p-5 md:p-6"
      >
        <h2 className="font-display text-lg font-bold text-ink">
          Điều hướng khung route
        </h2>
        <ul className="mt-4 grid list-none gap-2 p-0 sm:grid-cols-2">
          {upcomingRoutes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="block rounded-lg border border-line px-3 py-2.5 text-sm font-semibold text-ink no-underline hover:bg-surface-muted"
              >
                {route.label}
                <span className="mt-0.5 block text-xs font-normal text-muted">
                  {route.href}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
