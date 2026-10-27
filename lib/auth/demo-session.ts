import { supabaseConfig } from "@/lib/supabase/config";

export const DEMO_SESSION_COOKIE = "os_demo";
export const DEMO_USER_ID = "00000000-0000-4000-8000-0000000000d1";

const PAYLOAD = "operational-system-demo-v1";

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createDemoSessionToken(): Promise<string> {
  const encoded = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoded.encode(supabaseConfig.secretKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoded.encode(PAYLOAD));
  return toHex(signature);
}

export async function isValidDemoSessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const expected = await createDemoSessionToken();
  if (token.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i += 1) {
    diff |= token.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
