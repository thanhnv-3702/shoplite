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

export type SortDir = "asc" | "desc";

export type FetchStatus = "idle" | "loading" | "error" | "success";

export type FetchState<T> = {
  status: FetchStatus;
  data?: T;
  error?: string;
};
