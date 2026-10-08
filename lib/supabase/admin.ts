import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/lib/supabase/config";

let adminClient: SupabaseClient | null = null;

/** Cliente service role — solo en rutas API, scripts y server actions. */
export function createSupabaseAdminClient(): SupabaseClient {
  if (!adminClient) {
    adminClient = createClient(supabaseConfig.url, supabaseConfig.secretKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return adminClient;
}
