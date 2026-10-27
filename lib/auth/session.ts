import { cookies } from "next/headers";
import { DEMO_SESSION_COOKIE, isValidDemoSessionToken } from "@/lib/auth/demo-session";
import { readSessionToken, SESSION_COOKIE } from "@/lib/auth/session-token";
import { demoAuth } from "@/lib/supabase/config";
import { findUserByEmail, findUserById } from "@/lib/workspace/store";
import type { SessionUser } from "@/lib/workspace/types";

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const tokenUser = await readSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
  if (tokenUser) {
    const fresh = await findUserById(tokenUser.id);
    if (!fresh) return null;
    return { id: fresh.id, email: fresh.email, name: fresh.name, role: fresh.role };
  }

  if (await isValidDemoSessionToken(cookieStore.get(DEMO_SESSION_COOKIE)?.value)) {
    const demo = await findUserByEmail(demoAuth.email);
    if (!demo) return null;
    return { id: demo.id, email: demo.email, name: demo.name, role: demo.role };
  }

  return null;
}
