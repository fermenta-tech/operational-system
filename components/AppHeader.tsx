"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  subtitle?: string;
};

export function AppHeader({ title, subtitle }: Props) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="app-header">
      <div className="app-header-copy">
        <Link className="brand-mark" href="/manuals" aria-label="Ir al inicio de Manuales">
          OS
        </Link>
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="app-header-actions">
        <Link className="btn ghost" href="/manuals">
          Manuales
        </Link>
        <button type="button" className="btn ghost" onClick={() => void logout()}>
          Salir
        </button>
      </div>
    </header>
  );
}
