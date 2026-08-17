import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  thumbnail: z.string().optional(),
});

export const checkoutSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên"),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{9,11}$/, "Số điện thoại gồm 9–11 chữ số"),
  address: z.string().trim().min(10, "Địa chỉ tối thiểu 10 ký tự"),
});

export const createOrderSchema = checkoutSchema.extend({
  items: z.array(orderItemSchema).min(1, "Giỏ hàng trống"),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
export type CreateOrderPayload = z.infer<typeof createOrderSchema>;
export type OrderItem = z.infer<typeof orderItemSchema>;
