# ShopLite — v5-next

Next.js App Router + TypeScript + Tailwind. Module 5 Day 1: khung layout & routes.

## Chạy local

```bash
cd v5-next
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Routes (khung)

| Path | Mô tả |
|------|--------|
| `/` | Danh sách sản phẩm (placeholder) |
| `/product/[id]` | Chi tiết |
| `/cart` | Giỏ hàng |
| `/checkout` | Thanh toán |
| `/login` | Đăng nhập |
| `/orders` | Đơn hàng + layout lồng |
| `/orders/[orderId]` | Chi tiết đơn (nested) |

## Server vs Client

- `page.tsx` mặc định = Server Component → `console.log` hiện ở **terminal**.
- `Header` (`'use client'`) → log hiện ở **console trình duyệt**.
