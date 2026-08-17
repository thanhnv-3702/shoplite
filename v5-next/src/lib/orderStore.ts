import type { CreateOrderPayload, OrderItem } from "@/schemas/checkoutSchema";
import { createOrderId } from "@/lib/orders";

export interface StoredOrder {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed";
  createdAt: string;
}

// mất khi restart server
const orders: StoredOrder[] = [
  {
    id: "SL-DEMO001",
    email: "thanhg@shoplite.com",
    name: "Thanh",
    phone: "0900000000",
    address: "12 Nguyễn Huệ, Quận 1, TP.HCM",
    items: [
      {
        id: 1,
        title: "Áo thun cotton basic",
        price: 290000,
        quantity: 1,
      },
    ],
    total: 290000,
    status: "confirmed",
    createdAt: "2026-08-01T09:00:00.000Z",
  },
];

export function saveOrder(payload: CreateOrderPayload, email: string): StoredOrder {
  const total = payload.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const order: StoredOrder = {
    id: createOrderId(),
    email,
    name: payload.name,
    phone: payload.phone,
    address: payload.address,
    items: payload.items,
    total,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  orders.unshift(order);
  return order;
}

export function getOrdersByEmail(email: string): StoredOrder[] {
  return orders.filter((order) => order.email === email);
}

export function getOrderById(id: string): StoredOrder | undefined {
  return orders.find((order) => order.id === id);
}
