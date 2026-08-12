import { createOrderId, parseCreateOrderPayload } from "@/lib/orders";

/**
 * Route Handler — backend nhỏ trong Next.js.
 * Day 17 sẽ gắn checkout form + Auth thật.
 */
export async function GET() {
  return Response.json({
    ok: true,
    message: "ShopLite Orders API — dùng POST để tạo đơn.",
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Body phải là JSON hợp lệ" },
      { status: 400 },
    );
  }

  const parsed = parseCreateOrderPayload(body);
  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        error: "Dữ liệu đơn hàng không hợp lệ",
        details: parsed.error.flatten(),
      },
      { status: 422 },
    );
  }

  const { items, customerEmail } = parsed.data;
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const orderId = createOrderId();

  return Response.json(
    {
      ok: true,
      orderId,
      status: "pending",
      total,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      customerEmail: customerEmail ?? null,
    },
    { status: 201 },
  );
}
