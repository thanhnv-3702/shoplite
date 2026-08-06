import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-6">
        <section aria-labelledby="about-title">
          <h2 id="about-title" className="font-display text-lg font-bold text-ink">
            ShopLite
          </h2>
          <p className="mt-2 text-sm text-ink-soft">Cửa hàng tiện ích cho mọi nhà.</p>
        </section>

        <nav aria-labelledby="footer-nav-title">
          <h2 id="footer-nav-title" className="font-display text-lg font-bold text-ink">
            Liên kết
          </h2>
          <ul className="mt-2 list-none space-y-1 p-0 text-sm text-ink-soft">
            <li>
              <Link className="no-underline hover:text-ink" to="/">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link className="no-underline hover:text-ink" to="/cart">
                Giỏ hàng
              </Link>
            </li>
            <li>
              <a className="no-underline hover:text-ink" href="#contact">
                Liên hệ
              </a>
            </li>
          </ul>
        </nav>

        <section aria-labelledby="contact-title">
          <h2 id="contact-title" className="font-display text-lg font-bold text-ink">
            Liên hệ
          </h2>
          <p className="mt-2 text-sm text-ink-soft">Email: thanhg@shoplite.com</p>
          <p className="text-sm text-ink-soft">Hotline: 1900 0000</p>
        </section>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">
        © 2026 ShopLite
      </p>
    </footer>
  );
}
