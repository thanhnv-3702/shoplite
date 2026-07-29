/**
 * Dữ liệu sản phẩm giả — cấu trúc giống DummyJSON.
 * Ngày 2 sẽ render từ đây; ngày 3 chuyển sang fetch API.
 */
export const products = [
  {
    id: 1,
    title: "Áo thun cotton basic",
    price: 290000,
    thumbnail: "https://picsum.photos/seed/sl1/400/500",
    category: "áo",
    rating: 4.6,
  },
  {
    id: 2,
    title: "Quần jeans ống suông cao cấp",
    price: 680000,
    thumbnail: "https://picsum.photos/seed/sl2/400/500",
    category: "quần",
    rating: 4.4,
  },
  {
    id: 3,
    title: "Đầm lụa midi cổ V",
    price: 890000,
    thumbnail: "https://picsum.photos/seed/sl3/400/500",
    category: "đầm",
    rating: 4.8,
  },
  {
    id: 4,
    title: "Giày sneaker da trắng",
    price: 980000,
    thumbnail: "https://picsum.photos/seed/sl4/400/500",
    category: "giày",
    rating: 4.5,
  },
  {
    id: 5,
    title: "Áo khoác bomber chống gió",
    price: 850000,
    thumbnail: "https://picsum.photos/seed/sl5/400/500",
    category: "khoác",
    rating: 4.3,
  },
  {
    id: 6,
    title: "Túi tote canvas",
    price: 280000,
    thumbnail: "https://picsum.photos/seed/sl6/400/500",
    category: "phụ kiện",
    rating: 4.2,
  },
  {
    id: 7,
    title: "Áo sơ mi linen dài tay",
    price: 520000,
    thumbnail: "https://picsum.photos/seed/sl7/400/500",
    category: "áo",
    rating: 4.7,
  },
  {
    id: 8,
    title: "Váy maxi hoa nhí",
    price: 750000,
    thumbnail: "https://picsum.photos/seed/sl8/400/500",
    category: "đầm",
    rating: 4.9,
  },
  {
    id: 9,
    title: "Dép sandal quai chéo",
    price: 190000,
    thumbnail: "https://picsum.photos/seed/sl9/400/500",
    category: "giày",
    rating: 4.1,
  },
  {
    id: 10,
    title: "Mũ bucket unisex",
    price: 150000,
    thumbnail: "https://picsum.photos/seed/sl10/400/500",
    category: "phụ kiện",
    rating: 4.0,
  },
];

export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}
