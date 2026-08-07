# ShopLite — v5-next

Next.js App Router + TypeScript + Tailwind.

## Day 15

- Trang chủ `/` = Server Component: fetch catalog + lọc theo `?q=`
- `ProductCard` server; `SearchBar` + `AddToCartButton` = `'use client'`
- `export const revalidate = 60` (ISR); `generateStaticParams` cho vài `/product/[id]`

## Chạy local

```bash
cd v5-next
npm install
npm run dev
```

## Server vs Client

| Phần | Chạy ở | Vì sao |
|------|--------|--------|
| `page.tsx` / `ProductList` / `ProductCard` | Server | Không hook/event; HTML có sẵn cho SEO |
| `SearchBar` | Client | `useState`, `onChange`, URL |
| `AddToCartButton` | Client | `onClick`, `useState` |
