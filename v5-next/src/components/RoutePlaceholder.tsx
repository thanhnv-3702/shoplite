import Link from "next/link";

interface RoutePlaceholderProps {
  title: string;
  description: string;
  hint?: string;
}

export function RoutePlaceholder({
  title,
  description,
  hint = "Nội dung sẽ được bổ sung ở các ngày sau.",
}: RoutePlaceholderProps) {
  return (
    <section className="rounded-2xl border border-dashed border-line bg-surface px-5 py-12 text-center md:px-8">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-lg text-sm text-ink-soft">{description}</p>
      <p className="mt-2 text-xs text-muted">{hint}</p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-semibold text-ink underline"
      >
        Về trang chủ
      </Link>
    </section>
  );
}
