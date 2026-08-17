import { createOrderSchema } from "@/schemas/checkoutSchema";

export { createOrderSchema };
export type { CreateOrderPayload } from "@/schemas/checkoutSchema";

export function parseCreateOrderPayload(body: unknown) {
  return createOrderSchema.safeParse(body);
}

export function createOrderId(): string {
  const suffix = Date.now().toString(36).toUpperCase();
  return `SL-${suffix}`;
}
