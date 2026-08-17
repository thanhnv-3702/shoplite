import Link from "next/link";
import { auth } from "@/auth";

export default async function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

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
          {session?.user?.name
            ? `Xin chào ${session.user.name}.`
            : "Đơn của tài khoản đang đăng nhập."}{" "}
          Layout này chỉ bọc `/orders/*`.
        </p>
        <nav className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/orders" className="text-ink underline">
            Danh sách
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
