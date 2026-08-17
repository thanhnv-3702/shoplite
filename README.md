# ShopLite

Shop nhỏ, làm lại vài lần cho quen stack:

| Thư mục | Stack |
|---------|--------|
| `v1-html/` | HTML, CSS |
| `v2-js/` | JavaScript |
| `v3-ts/` | TypeScript + Vite |
| `v4-react/` | React + Vite + Tailwind |
| `v5-next/` | Next.js App Router |

Hiện dùng `v5-next`: xem sản phẩm, giỏ, đăng nhập, đặt hàng.

## Chạy local

```bash
cd v5-next
cp .env.example .env.local
npm install
npm run dev
```

Login demo: `thanhg@shoplite.com` / `shoplite123`

Các bản cũ chạy tương tự trong thư mục tương ứng (`npm install && npm run dev`, HTML thì `npx serve .`).

## Deploy (Vercel)

Root Directory: `v5-next`

Env:

- `AUTH_SECRET`
- `AUTH_URL` (URL production)
