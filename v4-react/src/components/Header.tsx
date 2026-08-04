import { SearchBar } from "./SearchBar";

interface HeaderProps {
  cartCount?: number;
  query: string;
  onQueryChange: (value: string) => void;
  onGoHome?: () => void;
}

export function Header({
  cartCount = 0,
  query,
  onQueryChange,
  onGoHome,
}: HeaderProps) {
  const cartLabel =
    cartCount > 0 ? `Giỏ hàng, ${cartCount} sản phẩm` : "Giỏ hàng, trống";

  function handleHomeClick(
    event: React.MouseEvent<HTMLAnchorElement>,
  ) {
    if (!onGoHome) return;
    event.preventDefault();
    onGoHome();
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-6xl flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:px-6">
        <a
          href="/"
          onClick={handleHomeClick}
          className="font-display text-xl font-bold tracking-tight text-ink no-underline md:text-2xl"
          aria-label="ShopLite trang chủ"
        >
          ShopLite
          <span className="text-accent" aria-hidden="true">
            .
          </span>
        </a>

        <nav className="order-3 hidden w-full md:order-none md:block md:w-auto" aria-label="Menu chính">
          <ul className="flex list-none gap-5 p-0 text-sm font-semibold text-ink-soft">
            <li>
              <a className="text-ink no-underline" href="/" onClick={handleHomeClick}>
                Sản phẩm
              </a>
            </li>
            <li>
              <a className="no-underline hover:text-ink" href="#promo">
                Khuyến mãi
              </a>
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
          <a
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft no-underline hover:bg-surface-muted hover:text-ink sm:inline-block"
            href="#login"
          >
            Đăng nhập
          </a>
          <a
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg text-lg no-underline"
            href="#cart"
            aria-label={cartLabel}
          >
            <span aria-hidden="true">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
}
