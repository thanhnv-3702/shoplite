import { Suspense } from "react";
import { CheckoutSuccess } from "@/components/CheckoutSuccess";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Đang tải…</p>}>
      <CheckoutSuccess />
    </Suspense>
  );
}
