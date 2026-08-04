# ShopLite — v4-react

Phiên bản React + TypeScript + Tailwind (Vite).

## Ngày học

- Day 1–2: component, state, form
- Day 3: TanStack Query (server state)
- Day 4: Theme Context + Zustand cart (`persist` → `localStorage`)

## Chạy local

```bash
cd v4-react
npm install
npm run dev
```

## Phân vai state

| State | Loại | Công cụ |
|-------|------|---------|
| Sản phẩm | Server | TanStack Query |
| Giỏ hàng | Client global | Zustand + persist |
| Theme | Client shared | Context |
| Search query | Local (sau → URL) | `useState` |
| Login/Contact | Form | RHF + Zod |
