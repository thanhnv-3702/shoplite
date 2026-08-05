# ShopLite — v4-react

SPA React + TypeScript + Tailwind (Vite). Tag milestone: `v4-react`.

## Chạy local

```bash
cd v4-react
npm install
npm run dev
```

## Routes

| Path | Page |
|------|------|
| `/` | Danh sách sản phẩm |
| `/product/:id` | Chi tiết |
| `/cart` | Giỏ hàng |
| `*` | 404 |

Pages được `React.lazy` + `Suspense` (code-split theo route).

## State

| State | Công cụ |
|-------|---------|
| Sản phẩm | TanStack Query |
| Giỏ | Zustand + persist |
| Theme | Context |
| Search | `useState` ở layout (+ `useMemo` lọc) |
