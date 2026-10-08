"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { saveDraft } from "@/lib/manual/client-storage";
import { createEmptyManual, newManualId } from "@/lib/manual/template";

export default function NewManualPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const id = newManualId();
    const content = createEmptyManual({
      id,
      title: title.trim() || "Nuevo manual",
      subtitle: subtitle.trim(),
    });
    saveDraft(id, content);
    router.push(`/manuals/new/${id}`);
  }

  return (
    <main className="app-shell">
      <AppHeader
        title="Nuevo manual"
        subtitle="Paso 1 · carátula e índice inicial"
      />
      <div className="glass-panel">
        <form className="form-stack" onSubmit={onSubmit}>
          <label>
            Título (carátula)
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Procedimiento de arranque"
              required
            />
          </label>
          <label>
            Subtítulo / eyebrow
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ej. Planta HYL · Operación"
            />
          </label>
          <button className="btn" type="submit">
            Crear borrador
          </button>
        </form>
      </div>
    </main>
  );
}
