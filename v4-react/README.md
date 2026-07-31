# ShopLite — v4-react

Phiên bản React + TypeScript + Tailwind (Vite).

## Ngày học

- Day 1: component / JSX / props
- Day 2: `useState`, events, search + giỏ tạm, form RHF + Zod

## Chạy local

```bash
cd v4-react
npm install
npm run dev
```

## Cấu trúc chính

- `src/App.tsx` — state tìm kiếm + giỏ tạm (lift state up)
- `src/components/SearchBar.tsx` — controlled search
- `src/components/ProductCard.tsx` — callback `onAddToCart`
- `src/components/LoginForm.tsx` / `ContactForm.tsx` — RHF + Zod
- `src/schemas/loginSchema.ts` — schema tái dùng
