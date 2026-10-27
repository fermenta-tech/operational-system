"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useId, useRef, useState } from "react";
import { brand, onPrimary } from "@/lib/brand";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const errorId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<"email" | "password">("email");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<string>(brand.productName);
  const [logo, setLogo] = useState<string>(brand.logoUrl);

  useEffect(() => {
    let gone = false;
    fetch("/api/brand")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { companyName?: string; logoUrl?: string } | null) => {
        if (!data || gone) return;
        if (data.companyName) setCompany(data.companyName);
        setLogo(data.logoUrl || "");
      })
      .catch(() => undefined);
    return () => {
      gone = true;
    };
  }, []);

  useEffect(() => {
    if (step === "email") emailRef.current?.focus();
    else passwordRef.current?.focus();
  }, [step]);

  function backToEmail() {
    setError("");
    setStep("email");
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (step === "email") {
      const email = user.trim();
      if (!EMAIL_RE.test(email)) {
        setError("Introduce un correo válido.");
        emailRef.current?.focus();
        return;
      }
      setUser(email);
      setStep("password");
      return;
    }

    if (!password) {
      setError("Introduce tu contraseña.");
      passwordRef.current?.focus();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { role?: string };
      if (!res.ok) {
        setError("Contraseña incorrecta. Vuelve a intentarlo.");
        passwordRef.current?.focus();
        return;
      }
      const dest =
        data.role === "operator"
          ? next.startsWith("/manuals/view/")
            ? next
            : "/manuals"
          : next;
      router.push(dest);
      router.refresh();
    } catch {
      setError("No se pudo iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const initial = (user.trim()[0] ?? "?").toUpperCase();

  return (
    <section className="gsign-card" suppressHydrationWarning>
      {logo ? (
        <img className="gsign-logo" src={logo} alt="" suppressHydrationWarning />
      ) : null}

      <h1 suppressHydrationWarning>
        {step === "email" ? "Iniciar sesión" : "Te damos la bienvenida"}
      </h1>
      {step === "email" ? (
        <p className="gsign-sub" suppressHydrationWarning>
          para continuar en {company}
        </p>
      ) : (
        <button
          type="button"
          className="gsign-chip"
          onClick={backToEmail}
          suppressHydrationWarning
        >
          <span className="gsign-avatar" aria-hidden suppressHydrationWarning>
            {initial}
          </span>
          <span className="gsign-chip-email" suppressHydrationWarning>
            {user}
          </span>
          <svg viewBox="0 0 24 24" aria-hidden className="gsign-chevron" suppressHydrationWarning>
            <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
          </svg>
          <span className="gsign-sr">Cambiar cuenta</span>
        </button>
      )}

      <form onSubmit={onSubmit} noValidate suppressHydrationWarning>
        {step === "email" ? (
          <div className={`gsign-field${error ? " has-error" : ""}`} suppressHydrationWarning>
            <input
              ref={emailRef}
              id="login-email"
              type="email"
              name="email"
              autoComplete="username"
              inputMode="email"
              placeholder=" "
              value={user}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              suppressHydrationWarning
              onChange={(e) => {
                setUser(e.target.value);
                if (error) setError("");
              }}
            />
            <label htmlFor="login-email" suppressHydrationWarning>
              Correo electrónico
            </label>
          </div>
        ) : (
          <>
            <div className={`gsign-field${error ? " has-error" : ""}`} suppressHydrationWarning>
              <input
                ref={passwordRef}
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder=" "
                value={password}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                suppressHydrationWarning
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
              />
              <label htmlFor="login-password" suppressHydrationWarning>
                Contraseña
              </label>
            </div>
            <label className="gsign-show" suppressHydrationWarning>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                suppressHydrationWarning
              />
              Mostrar contraseña
            </label>
          </>
        )}

        {error ? (
          <p className="gsign-error" id={errorId} role="alert" suppressHydrationWarning>
            {error}
          </p>
        ) : null}

        <div className="gsign-actions" suppressHydrationWarning>
          <button
            className="gsign-next"
            type="submit"
            disabled={loading}
            suppressHydrationWarning
            style={{
              background: brand.primary,
              color: onPrimary(brand.primary),
            }}
          >
            Siguiente
          </button>
        </div>
      </form>
    </section>
  );
}

function LoginFallback() {
  return (
    <section className="gsign-card" aria-hidden suppressHydrationWarning>
      <h1 suppressHydrationWarning>Iniciar sesión</h1>
      <p className="gsign-sub" suppressHydrationWarning>
        para continuar en {brand.productName}
      </p>
    </section>
  );
}

export default function LoginPage() {
  return (
    <div className="gsign" suppressHydrationWarning>
      <main className="gsign-main" suppressHydrationWarning>
        <Suspense fallback={<LoginFallback />}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
