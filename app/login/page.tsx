"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/manuals";
  const [user, setUser] = useState("demo");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Usuario o contraseña incorrectos.");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <main className="app-shell" style={{ maxWidth: 480 }}>
      <div className="glass-panel">
        <h1 style={{ marginTop: 0 }}>Acceso</h1>
        <p className="hint">
          Credenciales demo: usuario <code>demo</code>, contraseña{" "}
          <code>demo123</code> (configurable con{" "}
          <code>MANUAL_USER</code> / <code>MANUAL_PASSWORD</code>).
        </p>
        <form className="form-stack" onSubmit={onSubmit}>
          <label>
            Usuario
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
