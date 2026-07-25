import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const userIdCookie = request.cookies.get("py_user_id")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup");

  // If already logged in, redirect auth pages to dashboard
  if (userIdCookie && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/signup"
  ]
};
