# ShopLite — v5-next

Next.js App Router + TypeScript + Tailwind.

## Day 16

- `loading.tsx` / `error.tsx` / `not-found.tsx` cho trang chủ & chi tiết
- `POST /api/orders` — Route Handler tạo đơn mẫu
- `middleware.ts` bảo vệ `/orders`, `/checkout` (cookie demo)
- Login demo set cookie → middleware cho qua

## Chạy local

```bash
cd v5-next
npm install
npm run dev
```

## Auth demo

1. Vào `/orders` → redirect `/login?from=/orders`
2. Đăng nhập demo → cookie `shoplite-session=demo`
3. Vào `/checkout` → form gọi `POST /api/orders`

## API

```bash
curl -X POST http://localhost:3000/api/orders \
  -H 'Content-Type: application/json' \
  -d '{"items":[{"id":1,"title":"Áo thun","price":290000,"quantity":1}]}'
```
