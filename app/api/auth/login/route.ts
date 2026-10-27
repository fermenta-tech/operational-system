import { NextResponse } from "next/server";
import { DEMO_SESSION_COOKIE } from "@/lib/auth/demo-session";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/auth/session-token";
import { demoAuth } from "@/lib/supabase/config";
import { authenticate } from "@/lib/workspace/store";

export async function POST(request: Request) {
  let body: { email?: string; user?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const rawUser = String(body.email ?? body.user ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const email = rawUser.includes("@")
    ? rawUser
    : rawUser === "demo"
      ? demoAuth.email
      : `${rawUser}@demo.com`;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const user = await authenticate(email, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken(user);
  const res = NextResponse.json({ ok: true, role: user.role });
  res.cookies.set(SESSION_COOKIE, token, SESSION_COOKIE_OPTIONS);
  res.cookies.set(DEMO_SESSION_COOKIE, "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
  return res;
}
