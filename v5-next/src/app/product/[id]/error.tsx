"use client";

interface ProductErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: ProductErrorProps) {
  return (
    <section
      role="alert"
      className="rounded-xl border border-line bg-surface px-4 py-10 text-center"
    >
      <h1 className="font-display text-xl font-bold text-ink">
        Không tải được sản phẩm
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        {error.message || "Đã có lỗi khi tải chi tiết sản phẩm."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        Thử lại
      </button>
    </section>
  );
}
