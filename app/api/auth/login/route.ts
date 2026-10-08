import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { demoAuth } from "@/lib/supabase/config";

export async function POST(request: Request) {
  let body: { email?: string; user?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const rawUser = String(body.email ?? body.user ?? "").trim();
  const password = String(body.password ?? "");

  const email = rawUser.includes("@")
    ? rawUser
    : rawUser === "demo"
      ? demoAuth.email
      : `${rawUser}@demo.com`;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
