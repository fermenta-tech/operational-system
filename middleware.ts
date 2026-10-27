import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEMO_SESSION_COOKIE, isValidDemoSessionToken } from "@/lib/auth/demo-session";
import { readSessionToken, SESSION_COOKIE } from "@/lib/auth/session-token";

const PUBLIC_PREFIXES = [
  "/login",
  "/api/auth/login",
  "/api/manuals/public/",
  "/_next",
  "/favicon.ico",
  "/ejemplos/",
  "/manual/",
  "/robot.png",
];

const ADMIN_PREFIXES = ["/marca", "/usuarios", "/manuals/new", "/manuals/example", "/api/users"];

function isPublicPath(pathname: string): boolean {
  if (pathname === "/api/brand" || pathname === "/api/brand/logo") return true;
  return PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix),
  );
}

function isAdminPath(pathname: string): boolean {
  return ADMIN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const demo = session
    ? false
    : await isValidDemoSessionToken(request.cookies.get(DEMO_SESSION_COOKIE)?.value);
  const role = session?.role ?? (demo ? "admin" : null);

  if (role && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (role === "operator" && isAdminPath(pathname)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/manuals", request.url));
  }

  if (role || isPublicPath(pathname)) {
    return NextResponse.next({ request });
  }

  const login = new URL("/login", request.url);
  login.searchParams.set("next", pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
