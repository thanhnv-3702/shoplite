export interface Product {
  readonly id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images?: string[];
  brand?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
