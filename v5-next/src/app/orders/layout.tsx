import Link from "next/link";

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line bg-surface p-4 md:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Layout lồng — orders
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-ink">
          Đơn hàng
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Layout này chỉ bọc nhánh `/orders/*`, không render lại khi đổi đơn
          con.
        </p>
        <nav className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/orders" className="text-ink underline">
            Danh sách
          </Link>
          <Link href="/orders/demo-001" className="text-ink-soft hover:text-ink">
            demo-001
          </Link>
          <Link href="/orders/demo-002" className="text-ink-soft hover:text-ink">
            demo-002
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
