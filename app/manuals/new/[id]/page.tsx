"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { ManualEditor } from "@/components/manual/ManualEditor";
import { loadDraft } from "@/lib/manual/client-storage";
import { normalizeManualContent } from "@/lib/manual/template";
import type { ManualContent } from "@/lib/manual/types";

export default function EditManualPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [content, setContent] = useState<ManualContent | null>(null);

  useEffect(() => {
    const draft = loadDraft(id);
    if (!draft) {
      router.replace("/manuals/new");
      return;
    }
    setContent(normalizeManualContent(draft));
  }, [id, router]);

  if (!content) {
    return (
      <main className="app-shell editor-page">
        <p className="hint">Cargando borrador…</p>
      </main>
    );
  }

  return (
    <main className="app-shell editor-page">
      <AppHeader
        title={content.meta?.title ?? "Borrador"}
        subtitle={`ID ${id} · slides · índice integrado · guía del formato`}
      />
      <ManualEditor manualId={id} initial={content} />
    </main>
  );
}
