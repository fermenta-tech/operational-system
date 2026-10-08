import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, isAuthenticated } from "@/lib/auth";

const PUBLIC_PREFIXES = [
  "/login",
  "/api/auth/login",
  "/_next",
  "/favicon.ico",
  "/ejemplos/",
  "/manual/",
  "/robot.png",
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    if (pathname === "/login" && isAuthenticated(request.cookies.get(AUTH_COOKIE)?.value)) {
      return NextResponse.redirect(new URL("/manuals", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated(request.cookies.get(AUTH_COOKIE)?.value)) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
