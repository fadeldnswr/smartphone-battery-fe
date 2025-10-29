import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hasAccess = request.cookies.get("sb-access-token")?.value;
  const isLogin = request.nextUrl.pathname.startsWith("/login");

  // Check if user is trying to access protected routes
  if (!isLogin && !hasAccess) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login"],
};