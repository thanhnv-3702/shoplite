import { auth } from "@/auth";
import { parseCreateOrderPayload } from "@/lib/orders";
import { getOrdersByEmail, saveOrder } from "@/lib/orderStore";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ ok: false, error: "Chưa đăng nhập" }, { status: 401 });
  }

  const orders = getOrdersByEmail(session.user.email);
  return Response.json({ ok: true, orders });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return Response.json({ ok: false, error: "Chưa đăng nhập" }, { status: 401 });
  }

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

  const order = saveOrder(parsed.data, session.user.email);
  return Response.json({ ok: true, order }, { status: 201 });
}
