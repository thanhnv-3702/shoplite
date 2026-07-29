# ShopLite — v2-js

**Module 2 — JavaScript** · Day 1: ES6+ & ES modules.

Giao diện vẫn tĩnh (copy từ `v1-html`). JS layer chuẩn bị dữ liệu + pure functions cho Day 2 (DOM render).

## Chạy local

> ES modules cần HTTP server — không mở `file://` trực tiếp.

```bash
npx serve .
```

Mở `index.html` → DevTools Console sẽ thấy log `ShopLite v2-js — ES modules OK`.

## Cấu trúc

```
v2-js/
├── index.html / product.html / cart.html
├── style.css
├── theme.js
├── data.js                 # export mảng products
├── utils/productHelpers.js # filterByKeyword, sortByPrice, ...
└── main.js                 # import & demo array methods
```

## Tiến độ Module 2

| Ngày | Nội dung | Trạng thái |
|------|----------|------------|
| Day 1 (Day 04/18) | ES6+, data.js, pure functions | ✅ |
| Day 2 | DOM render động | ⏳ |
| Day 3 | fetch API + localStorage | ⏳ |
