import { NextResponse } from "next/server";
import { DEMO_SESSION_COOKIE } from "@/lib/auth/demo-session";
import { SESSION_COOKIE, SESSION_COOKIE_OPTIONS } from "@/lib/auth/session-token";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  } catch {
    /* Si el proyecto remoto no responde, igual se cierra la sesión local. */
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(DEMO_SESSION_COOKIE, "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
  res.cookies.set(SESSION_COOKIE, "", { ...SESSION_COOKIE_OPTIONS, maxAge: 0 });
  return res;
}
