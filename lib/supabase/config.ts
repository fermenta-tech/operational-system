/** Credenciales Supabase (servidor). Vercel puede pisarlas con env; si no, vale el JWT del proyecto. */
function envOr(name: string, fallback: string): string {
  const value = process.env[name];
  if (typeof value === "string" && value.trim()) return value.trim();
  return fallback;
}

const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5dWhlbWJxb3Zqd2l2dHp4YXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NjkzODAsImV4cCI6MjEwNzA0NTM4MH0.Xvz_ZaIo6MSDloOCvgIL5kZ-SPgYxS4U4ZDk7UtwQl0";
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5dWhlbWJxb3Zqd2l2dHp4YXFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTQ2OTM4MCwiZXhwIjoyMTA3MDQ1MzgwfQ.VqrmDyK-inQaa441e4Knslut4hFX_y1TQEL_REOJoUY";

export const supabaseConfig = {
  url: envOr("SUPABASE_URL", "https://xyuhembqovjwivtzxaqm.supabase.co"),
  publishableKey: envOr("SUPABASE_ANON_KEY", anonKey),
  secretKey: envOr("SUPABASE_SERVICE_ROLE_KEY", serviceRoleKey),
  projectRef: "xyuhembqovjwivtzxaqm",
};

export const demoAuth = {
  email: "demo@demo.com",
  password: "demo123",
} as const;
