import { auth } from "@/auth";
import { CheckoutForm } from "@/components/CheckoutForm";

export default async function CheckoutPage() {
  const session = await auth();

  return (
    <section aria-labelledby="checkout-title">
      <h1
        id="checkout-title"
        className="font-display text-3xl font-bold tracking-tight text-ink"
      >
        Thanh toán
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Form RHF + Zod. Server validate lại bằng cùng schema trước khi lưu đơn.
      </p>
      <CheckoutForm
        defaultEmail={session?.user?.email ?? ""}
        defaultName={session?.user?.name ?? ""}
      />
    </section>
  );
}
