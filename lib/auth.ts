export const AUTH_COOKIE = "os-manual-auth";

export function getDemoCredentials() {
  return {
    user: process.env.MANUAL_USER ?? "demo",
    password: process.env.MANUAL_PASSWORD ?? "demo123",
  };
}

export function credentialsMatch(user: string, password: string): boolean {
  const demo = getDemoCredentials();
  return user === demo.user && password === demo.password;
}

export function isAuthenticated(cookieValue: string | undefined): boolean {
  return cookieValue === "1";
}
