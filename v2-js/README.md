# ShopLite — v2-js

**Module 2 — JavaScript** · Day 2: DOM render + event delegation.

Trang danh sách sản phẩm đã render động từ `data.js`, tìm kiếm real-time và bắt click bằng event delegation.

## Chạy local

> ES modules cần HTTP server — không mở `file://` trực tiếp.

```bash
npx serve .
```

Mở `index.html` → danh sách sản phẩm được dựng bằng JS và nút "Thêm vào giỏ" sẽ log đúng sản phẩm trong Console.

## Cấu trúc

```
v2-js/
├── index.html / product.html / cart.html
├── style.css
├── theme.js
├── data.js                 # export mảng products
├── utils/productHelpers.js # filterByKeyword, sortByPrice, ...
└── main.js                 # render DOM, search, event delegation
```

## Tiến độ Module 2

| Ngày | Nội dung | Trạng thái |
|------|----------|------------|
| Day 1 (Day 04/18) | ES6+, data.js, pure functions | ✅ |
| Day 2 (Day 05/18) | DOM render động | ✅ |
| Day 3 | fetch API + localStorage | ⏳ |
