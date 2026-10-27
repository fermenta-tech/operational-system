"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { brand, onPrimary } from "@/lib/brand";
import type { PublicBrand, SessionUser } from "@/lib/workspace/types";

type Props = {
  session: SessionUser;
  brandInfo: PublicBrand;
  title: string;
  lede?: string;
  children: ReactNode;
};

export function Desk({ session, brandInfo, title, lede, children }: Props) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="desk">
      <header className="desk-bar">
        <Link className="desk-lockup" href={session.role === "admin" ? "/" : "/manuals"}>
          {brandInfo.logoUrl ? <img src={brandInfo.logoUrl} alt="" /> : null}
          <span>{brandInfo.companyName}</span>
        </Link>
        <div className="desk-bar-actions">
          <span>{session.email}</span>
          <button
            type="button"
            className="desk-btn"
            style={{ background: brand.primary, color: onPrimary(brand.primary) }}
            onClick={() => void logout()}
          >
            Salir
          </button>
        </div>
      </header>
      <main className="desk-main">
        <h1>{title}</h1>
        {lede ? <p className="desk-lede">{lede}</p> : null}
        {children}
      </main>
    </div>
  );
}
