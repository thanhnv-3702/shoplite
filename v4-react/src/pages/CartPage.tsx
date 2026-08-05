import { Link } from "react-router-dom";
import {
  selectCartTotal,
  useCartStore,
} from "../store/cartStore";
import { formatMoney } from "../utils/format";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore(selectCartTotal);

  function handleCheckout() {
    if (items.length === 0) {
      alert("Giỏ hàng đang trống.");
      return;
    }
    alert(`Cảm ơn bạn! Tổng thanh toán: ${formatMoney(total)}`);
    clearCart();
  }

  if (items.length === 0) {
    return (
      <section aria-labelledby="cart-title">
        <h1
          id="cart-title"
          className="font-display text-3xl font-bold tracking-tight text-ink"
        >
          Giỏ hàng
        </h1>
        <p className="mt-4 rounded-xl border border-dashed border-line bg-surface px-4 py-10 text-center text-ink-soft">
          Chưa có sản phẩm nào.{" "}
          <Link to="/" className="font-semibold text-ink underline">
            Tiếp tục mua sắm
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="cart-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1
          id="cart-title"
          className="font-display text-3xl font-bold tracking-tight text-ink"
        >
          Giỏ hàng
        </h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-semibold text-ink-soft hover:text-ink"
        >
          Xóa tất cả
        </button>
      </div>

      <ul className="mt-6 list-none space-y-4 p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center"
          >
            <Link
              to={`/product/${item.id}`}
              className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-muted"
            >
              <img
                src={item.thumbnail}
                alt=""
                className="h-full w-full object-cover"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Link
                to={`/product/${item.id}`}
                className="font-display text-base font-semibold text-ink no-underline hover:underline"
              >
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-ink-soft">
                {formatMoney(item.price)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-lg border border-line">
                <button
                  type="button"
                  aria-label="Giảm số lượng"
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                  className="px-3 py-2 text-sm font-bold text-ink"
                >
                  −
                </button>
                <span className="min-w-8 text-center text-sm font-semibold">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label="Tăng số lượng"
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                  className="px-3 py-2 text-sm font-bold text-ink"
                >
                  +
                </button>
              </div>
              <p className="min-w-24 text-sm font-bold text-ink">
                {formatMoney(item.price * item.quantity)}
              </p>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-sm font-semibold text-accent hover:underline"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-bold text-ink">
          Tổng: {formatMoney(total)}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-lg border border-line px-4 py-2.5 text-sm font-semibold text-ink no-underline hover:bg-surface-muted"
          >
            Tiếp tục mua
          </Link>
          <button
            type="button"
            onClick={handleCheckout}
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </section>
  );
}
