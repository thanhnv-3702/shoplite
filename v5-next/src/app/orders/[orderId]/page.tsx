interface OrderDetailPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { orderId } = await params;
  console.log("[server] OrderDetailPage render", orderId);

  return (
    <section className="rounded-2xl border border-line bg-surface p-5 md:p-6">
      <h2 className="font-display text-xl font-bold text-ink">
        Chi tiết đơn {orderId}
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        Route lồng `/orders/[orderId]` — nội dung thật sẽ bổ sung sau.
      </p>
    </section>
  );
}
