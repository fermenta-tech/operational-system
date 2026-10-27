import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operational System — Manuales",
  description: "Login y módulo de manuales operativos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="light"
      style={{ "--accent": brand.primary } as CSSProperties}
    >
      <body>{children}</body>
    </html>
  );
}
