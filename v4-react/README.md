# ShopLite — v4-react

Phiên bản React + TypeScript + Tailwind (Vite).

## Ngày học

- Day 1: component / JSX / props
- Day 2: `useState`, events, search + giỏ tạm, form RHF + Zod
- Day 3: TanStack Query — server state (sản phẩm) vs client state (giỏ)

## Chạy local

```bash
cd v4-react
npm install
npm run dev
```

## Cấu trúc chính

- `public/products.json` — catalog VNĐ (fetch qua TanStack Query)
- `src/hooks/useProducts.ts` / `useProduct.ts` — custom hooks bọc `useQuery`
- `src/components/ProductDetail.tsx` — trang chi tiết (`?id=`)
- Giỏ hàng vẫn là client state trong `App` (Day 12 sẽ chuyển store)
