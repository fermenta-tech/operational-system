/** Credenciales Supabase (servidor). Sin .env — solo uso en server/scripts. */
export const supabaseConfig = {
  url: "https://xyuhembqovjwivtzxaqm.supabase.co",
  publishableKey: "sb_publishable_VlXEXCZxIT4ZuoNr8NvLOg_AybHWPoM",
  secretKey: "sb_secret_bnKbwBIbtuGX1HsrSTxRwg_mW_QOlS6",
  projectRef: "xyuhembqovjwivtzxaqm",
} as const;

export const demoAuth = {
  email: "demo@demo.com",
  password: "demo123",
} as const;
