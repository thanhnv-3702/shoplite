# ShopLite — v1-html

Giao diện **tĩnh hoàn chỉnh** (Module 1). Dark mode toggle dùng `theme.js` tối thiểu.

## Chạy local

```bash
npx serve .
```

Mở `index.html`, `product.html`, hoặc `cart.html` trên trình duyệt.

## Tiến độ Module 1

| Ngày | Nội dung | Trạng thái |
|------|----------|------------|
| Day 1 | Semantic HTML + CSS nền + khung `index.html` | ✅ |
| Day 2 | Flexbox & Grid — lưới SP + `product.html` | ✅ |
| Day 3 | Responsive, tokens, `cart.html`, dark mode | ✅ |

## Cấu trúc

```
v1-html/
├── index.html    # Danh sách sản phẩm
├── product.html  # Chi tiết sản phẩm
├── cart.html     # Giỏ hàng tĩnh
├── style.css     # Design tokens + layout chung
├── theme.js      # Toggle dark mode (.dark trên <html>)
└── README.md
```

## Design tokens

Màu, spacing, radius định nghĩa ở `:root` trong `style.css`. Dark mode ghi đè biến qua `html.dark`.

## Tag

Cột mốc Module 1: git tag `v1-html`
