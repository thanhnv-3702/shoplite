export function PageSkeleton() {
  return (
    <section aria-busy="true" aria-label="Đang tải trang">
      <div className="h-9 w-48 animate-pulse rounded-lg bg-surface-muted" />
      <div className="mt-2 h-4 w-32 animate-pulse rounded bg-surface-muted" />
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-xl border border-line bg-surface"
          >
            <div className="aspect-[4/5] animate-pulse bg-surface-muted" />
            <div className="space-y-2 p-3 md:p-4">
              <div className="h-3 w-1/3 animate-pulse rounded bg-surface-muted" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-surface-muted" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-surface-muted" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DetailSkeleton() {
  return (
    <section aria-busy="true" aria-label="Đang tải sản phẩm">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-surface-muted" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-[4/5] animate-pulse rounded-2xl bg-surface-muted" />
        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse rounded bg-surface-muted" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-surface-muted" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-surface-muted" />
          <div className="h-24 w-full animate-pulse rounded bg-surface-muted" />
          <div className="h-11 w-40 animate-pulse rounded bg-surface-muted" />
        </div>
      </div>
    </section>
  );
}
