"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { AuthStatus } from "./AuthStatus";
import { CartBadge } from "./CartBadge";
import { SearchBar } from "./SearchBar";

function SearchBarFallback() {
  return (
    <div className="h-9 w-full animate-pulse rounded-lg border border-line bg-bg" />
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-6xl flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:px-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-ink no-underline md:text-2xl"
          aria-label="ShopLite trang chủ"
        >
          ShopLite
          <span className="text-accent" aria-hidden="true">
            .
          </span>
        </Link>

        <nav
          className="order-3 hidden w-full md:order-none md:block md:w-auto"
          aria-label="Menu chính"
        >
          <ul className="flex list-none gap-5 p-0 text-sm font-semibold text-ink-soft">
            <li>
              <Link
                href="/"
                className={
                  pathname === "/"
                    ? "text-ink no-underline"
                    : "no-underline hover:text-ink"
                }
              >
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className={
                  pathname === "/cart"
                    ? "text-ink no-underline"
                    : "no-underline hover:text-ink"
                }
              >
                Giỏ hàng
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className={
                  pathname.startsWith("/orders")
                    ? "text-ink no-underline"
                    : "no-underline hover:text-ink"
                }
              >
                Đơn hàng
              </Link>
            </li>
          </ul>
        </nav>

        <div className="order-4 w-full flex-1 md:order-none md:max-w-xs lg:max-w-sm">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <AuthStatus />
          <CartBadge />
        </div>
      </div>
    </header>
  );
}
