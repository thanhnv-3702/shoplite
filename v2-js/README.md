# ShopLite — v2-js

**Module 2 — JavaScript** · ứng dụng động hoàn chỉnh (tag `v2-js`).

- Load sản phẩm từ **DummyJSON API**
- Tìm kiếm real-time
- Chi tiết sản phẩm theo `?id=`
- Giỏ hàng **localStorage** (thêm / tăng giảm / xóa, badge, tổng tiền)

## Chạy local

> ES modules + fetch cần HTTP server.

```bash
npx serve .
```

## Cấu trúc

```
v2-js/
├── index.html / product.html / cart.html
├── style.css / theme.js
├── api.js           # getJSON, fetchProducts, fetchProductById
├── cart.js          # localStorage cart helpers
├── main.js          # trang danh sách
├── product.js       # trang chi tiết
├── cart-page.js     # trang giỏ hàng
├── data.js          # mock Day 1 (không còn dùng runtime)
└── utils/
    ├── productHelpers.js
    └── format.js
```

## Tiến độ Module 2

| Ngày | Nội dung | Trạng thái |
|------|----------|------------|
| Day 1 (Day 04/18) | ES6+, data.js, pure functions | ✅ |
| Day 2 (Day 05/18) | DOM render + event | ✅ |
| Day 3 (Day 06/18) | Fetch API + localStorage cart | ✅ |
