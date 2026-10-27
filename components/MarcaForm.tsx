"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { notify, tellError } from "@/components/dialogs";
import { brand, onPrimary } from "@/lib/brand";
import type { PublicBrand } from "@/lib/workspace/types";

export function MarcaForm({ initial }: { initial: PublicBrand }) {
  const router = useRouter();
  const [companyName, setCompanyName] = useState(initial.companyName);
  const [logoUrl, setLogoUrl] = useState(initial.logoUrl);
  const [file, setFile] = useState<File | null>(null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [preview, setPreview] = useState(initial.logoUrl);
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const body = new FormData();
      body.set("companyName", companyName);
      if (removeLogo) body.set("removeLogo", "1");
      if (file) body.set("logo", file);
      const res = await fetch("/api/brand", { method: "PUT", body });
      const data = (await res.json().catch(() => ({}))) as { error?: string; companyName?: string; logoUrl?: string };
      if (!res.ok) {
        await tellError("No se guardó la marca", data.error || "Inténtalo de nuevo.");
        return;
      }
      setCompanyName(data.companyName || companyName);
      setLogoUrl(data.logoUrl || "");
      setPreview(data.logoUrl || "");
      setFile(null);
      setRemoveLogo(false);
      router.refresh();
      await notify("Marca guardada");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="desk-form" onSubmit={(event) => void onSubmit(event)}>
      <label>
        Nombre de la empresa
        <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} required />
      </label>
      <label>
        Logotipo
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(event) => {
            const next = event.target.files?.[0] ?? null;
            setFile(next);
            setRemoveLogo(false);
            if (next) setPreview(URL.createObjectURL(next));
          }}
        />
      </label>
      {preview ? <img className="desk-logo" src={preview} alt="" /> : null}
      {logoUrl && !file ? (
        <label className="desk-check">
          <input
            type="checkbox"
            checked={removeLogo}
            onChange={(event) => {
              setRemoveLogo(event.target.checked);
              setPreview(event.target.checked ? "" : logoUrl);
            }}
          />
          Quitar logotipo
        </label>
      ) : null}
      <button
        className="desk-btn"
        type="submit"
        disabled={saving}
        style={{ background: brand.primary, color: onPrimary(brand.primary) }}
      >
        {saving ? "Guardando…" : "Guardar"}
      </button>
    </form>
  );
}
