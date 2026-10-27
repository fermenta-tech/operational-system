import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSession } from "@/lib/auth/session";
import { supabaseConfig } from "@/lib/supabase/config";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseConfig.url, supabaseConfig.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: Parameters<typeof cookieStore.set>[2] }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          /* setAll desde Server Component read-only */
        }
      },
    },
  });
}

export async function getSessionUserId(): Promise<string | null> {
  return (await getSession())?.id ?? null;
}
