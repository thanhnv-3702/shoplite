import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  selectCartCount,
  selectCartTotal,
  useCartStore,
} from "../store/cartStore";
import { formatMoney } from "../utils/format";
import { SearchBar } from "./SearchBar";

interface HeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function Header({ query, onQueryChange }: HeaderProps) {
  const cartCount = useCartStore(selectCartCount);
  const cartTotal = useCartStore(selectCartTotal);
  const { theme, toggleTheme } = useTheme();

  const cartLabel =
    cartCount > 0
      ? `Giỏ hàng, ${cartCount} sản phẩm, ${formatMoney(cartTotal)}`
      : "Giỏ hàng, trống";

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-6xl flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:px-6">
        <Link
          to="/"
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
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-ink no-underline"
                    : "no-underline hover:text-ink"
                }
              >
                Sản phẩm
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-ink no-underline"
                    : "no-underline hover:text-ink"
                }
              >
                Giỏ hàng
              </NavLink>
            </li>
            <li>
              <a className="no-underline hover:text-ink" href="#about">
                Về shop
              </a>
            </li>
          </ul>
        </nav>

        <div className="order-4 w-full flex-1 md:order-none md:max-w-xs lg:max-w-sm">
          <SearchBar value={query} onChange={onQueryChange} />
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? "Bật chế độ sáng" : "Bật chế độ tối"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg text-base"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <a
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft no-underline hover:bg-surface-muted hover:text-ink sm:inline-block"
            href="#login"
          >
            Đăng nhập
          </a>
          <Link
            to="/cart"
            className="relative inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-lg border border-line bg-bg px-2 text-lg no-underline"
            aria-label={cartLabel}
          >
            <span aria-hidden="true">🛒</span>
            {cartCount > 0 && (
              <>
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
                <span className="hidden text-xs font-semibold text-ink md:inline">
                  {formatMoney(cartTotal)}
                </span>
              </>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
