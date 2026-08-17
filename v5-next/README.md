# ShopLite — v5-next

Next.js App Router + TypeScript + Tailwind.

## Day 17

- Auth.js Credentials — session JWT, Header hiện tên + đăng xuất
- Middleware đọc session (không còn cookie demo) — bảo vệ `/orders`, `/checkout`
- Zustand cart persist `shoplite-cart-vnd`, `skipHydration` + rehydrate trong `Providers`
- Checkout RHF + Zod → `POST /api/orders` (cùng schema) → xóa giỏ
- URL state: `/?q=...&category=...`

## Chạy local

```bash
cd v5-next
cp .env.example .env.local   # tuỳ chọn — AUTH_SECRET có fallback khi dev
npm install
npm run dev
```

## Tài khoản mẫu

- Email: `thanhg@shoplite.com`
- Mật khẩu: `shoplite123`

## Luồng mua hàng

1. Đăng nhập tại `/login`
2. Tìm/lọc trên URL (`?q=` / `category=`)
3. Thêm giỏ → `/cart`
4. `/checkout` (middleware yêu cầu session) → đặt hàng
5. Trang thành công xóa giỏ; xem `/orders`

## API

Cần cookie session Auth.js. Ví dụ sau khi đã login trên browser, hoặc gọi kèm cookie:

```bash
curl http://localhost:3000/api/orders
```
