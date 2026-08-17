# ShopLite — v5-next

Next.js App Router + TypeScript + Tailwind.

## Day 18

- `generateMetadata` cho từng sản phẩm; metadata tĩnh layout/trang
- `sitemap.xml` / `robots.txt`
- `next/image` (kể cả giỏ) + `next/font` (`display: swap`)
- `next/dynamic` cho CartView / CheckoutForm
- Deploy: Root Directory Vercel = `v5-next`

## Chạy local

```bash
cd v5-next
cp .env.example .env.local
npm install
npm run dev
```

## Tài khoản mẫu

- Email: `thanhg@shoplite.com`
- Mật khẩu: `shoplite123`

## Deploy Vercel

1. Import repo `thanhnv-3702/shoplite`
2. Root Directory: `v5-next`
3. Env: `AUTH_SECRET`, `AUTH_URL` (URL production)
4. Deploy

## Luồng mua hàng

1. Đăng nhập tại `/login`
2. Tìm/lọc trên URL (`?q=` / `category=`)
3. Thêm giỏ → `/cart`
4. `/checkout` → đặt hàng → giỏ được xóa
5. `/orders`
