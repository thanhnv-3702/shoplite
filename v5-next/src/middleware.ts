import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEMO_SESSION_VALUE, SESSION_COOKIE } from "@/lib/auth";

const PROTECTED_PREFIXES = ["/orders", "/checkout"];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Middleware chạy trước request — authorization ở server.
 * Client chỉ ẩn nút là chưa đủ; chặn thật phải ở đây.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthed = session === DEMO_SESSION_VALUE;

  if (isAuthed) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/orders/:path*", "/checkout/:path*"],
};
