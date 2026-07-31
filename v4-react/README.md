# ShopLite — v4-react

Phiên bản React + TypeScript + Tailwind (Vite). Module 4 Day 1: component hóa UI bằng JSX/props.

## Chạy local

```bash
cd v4-react
npm install
npm run dev
```

## Cấu trúc chính

- `src/types.ts` — `Product`, `CartItem`
- `src/data.ts` — danh sách sản phẩm hardcode (VNĐ)
- `src/components/Header.tsx` — logo, search UI, badge giỏ
- `src/components/ProductCard.tsx` — card sản phẩm + conditional “Hết hàng”
- `src/components/ProductList.tsx` — lưới Tailwind responsive
- `src/App.tsx` — ghép layout trang chủ
