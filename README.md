# ShopLite

Shop e-commerce học Frontend: cùng một sản phẩm, năm stack nâng dần.

**Bản live (Next.js):** xem mục [Demo](#demo) bên dưới sau khi deploy Vercel.

| Version | Stack | Ghi chú |
|---------|-------|--------|
| `v1-html/` | HTML, CSS | UI tĩnh |
| `v2-js/` | JavaScript | API, search, cart (VNĐ) |
| `v3-ts/` | TypeScript + Vite | Type-safe shop |
| `v4-react/` | React + Vite + Tailwind | SPA: router, TQ, Zustand |
| `v5-next/` | Next.js App Router | SSR/SSG, Auth.js, SEO, deploy |

## Tính năng (`v5-next`)

- Catalog server-render, tìm kiếm / lọc trên URL (`?q=` + `category`)
- Giỏ Zustand persist (`localStorage`)
- Đăng nhập Auth.js Credentials, middleware bảo vệ `/checkout` và `/orders`
- Checkout RHF + Zod (cùng schema phía server)
- SEO: Metadata API, `generateMetadata` theo sản phẩm, sitemap, `next/image` + `next/font`

## Demo

Sau khi import repo lên Vercel, đặt **Root Directory** = `v5-next`, thêm env:

- `AUTH_SECRET` — chuỗi ngẫu nhiên (`openssl rand -base64 32`)
- `AUTH_URL` — URL production (vd `https://shoplite.vercel.app`)

Tài khoản mẫu: `thanhg@shoplite.com` / `shoplite123`

> URL public sẽ gắn vào đây sau khi deploy.

## Chạy local

### v5-next

```bash
cd v5-next
cp .env.example .env.local
npm install
npm run dev
```

### v4-react

```bash
cd v4-react
npm install
npm run dev
```

### v3-ts

```bash
cd v3-ts
npm install
npm run dev
```

### v2-js

```bash
cd v2-js
npx serve .
```

### v1-html

```bash
cd v1-html
npx serve .
```
