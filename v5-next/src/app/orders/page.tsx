import Link from "next/link";

const demoOrders = ["demo-001", "demo-002"];

export default function OrdersPage() {
  console.log("[server] OrdersPage render");

  return (
    <section className="rounded-2xl border border-line bg-surface p-5 md:p-6">
      <h2 className="font-display text-xl font-bold text-ink">
        Danh sách đơn (khung)
      </h2>
      <ul className="mt-4 list-none space-y-2 p-0">
        {demoOrders.map((id) => (
          <li key={id}>
            <Link
              href={`/orders/${id}`}
              className="block rounded-lg border border-line px-3 py-2.5 text-sm font-semibold text-ink no-underline hover:bg-surface-muted"
            >
              Đơn {id}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
