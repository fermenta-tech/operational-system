/** @deprecated Usar sesión Supabase; se mantiene el nombre por middleware legacy. */
export const AUTH_COOKIE = "os-manual-auth";

export function isAuthenticated(_cookieValue: string | undefined): boolean {
  return false;
}
