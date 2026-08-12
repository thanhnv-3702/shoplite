import { z } from "zod";

const orderItemSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "Giỏ hàng trống"),
  customerEmail: z.string().email().optional(),
});

export type CreateOrderPayload = z.infer<typeof createOrderSchema>;

export function parseCreateOrderPayload(body: unknown) {
  return createOrderSchema.safeParse(body);
}

export function createOrderId(): string {
  const suffix = Date.now().toString(36).toUpperCase();
  return `SL-${suffix}`;
}
