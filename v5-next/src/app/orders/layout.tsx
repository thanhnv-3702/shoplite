import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Đơn hàng",
  description: "Đơn hàng của bạn trên ShopLite.",
  robots: { index: false, follow: false },
};

export default async function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Đơn hàng</h1>
        {session?.user?.name && (
          <p className="mt-1 text-sm text-ink-soft">
            Xin chào {session.user.name}
          </p>
        )}
        <nav className="mt-3">
          <Link href="/orders" className="text-sm font-semibold text-ink underline">
            Tất cả đơn
          </Link>
        </nav>
      </div>
      {children}
    </div>
  );
}
