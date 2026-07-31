interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export function SearchBar({ value, onChange, id = "q" }: SearchBarProps) {
  return (
    <form
      className="w-full flex-1 md:max-w-xs lg:max-w-sm"
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="sr-only" htmlFor={id}>
        Tìm sản phẩm
      </label>
      <input
        id={id}
        type="search"
        name="q"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Tìm sản phẩm…"
        autoComplete="off"
        className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
      />
    </form>
  );
}
