interface QueryErrorProps {
  message?: string;
  onRetry: () => void;
}

export function QueryError({
  message = "Đã có lỗi khi tải dữ liệu.",
  onRetry,
}: QueryErrorProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-line bg-surface px-4 py-8 text-center"
    >
      <p className="text-sm text-ink-soft">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Thử lại
      </button>
    </div>
  );
}
