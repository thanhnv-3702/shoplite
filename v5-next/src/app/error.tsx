"use client";

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function HomeError({ error, reset }: RouteErrorProps) {
  return (
    <section
      role="alert"
      className="rounded-xl border border-line bg-surface px-4 py-10 text-center"
    >
      <h1 className="font-display text-xl font-bold text-ink">
        Không tải được trang
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        {error.message || "Không tải được."}
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
