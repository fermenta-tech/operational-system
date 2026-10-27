"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { BlockEditor } from "@/components/manual/BlockEditor";
import { FormatGuidePanel } from "@/components/manual/FormatGuidePanel";
import { QuizEditor } from "@/components/manual/QuizEditor";
import {
  BLOCK_TYPE_LABELS,
  EDITOR_BLOCK_TYPES,
  emptyBlock,
} from "@/lib/manual/blocks";
import { saveDraft } from "@/lib/manual/client-storage";
import { normalizeQuiz } from "@/lib/manual/quiz";
import {
  inferSlideKind,
  isReviewPage,
  slideKindLabel,
} from "@/lib/manual/slides";
import type {
  ManualBlock,
  ManualContent,
  ManualCoverMeta,
  ManualEquipmentLine,
  ManualPage,
  ManualSectionLevel,
  ManualSlideKind,
} from "@/lib/manual/types";
import {
  MANUAL_COVER_ID,
  MANUAL_TOC_ID,
  listChapters,
  newReviewPage,
  newSectionPage,
  normalizeManualContent,
  refreshTocPage,
  syncCoverPage,
} from "@/lib/manual/template";

type Props = {
  manualId: string;
  initial: ManualContent;
};

type RightPanel = "guide" | "preview";

type NewSlideKind = "chapter" | "subchapter" | "content" | "review";

function isStructuralPageId(id: string): boolean {
  return id === MANUAL_COVER_ID || id === "cover" || id === MANUAL_TOC_ID;
}

function sectionLevelForKind(kind: NewSlideKind): ManualSectionLevel | null {
  if (kind === "chapter") return "chapter";
  if (kind === "subchapter") return "subchapter";
  if (kind === "content") return "content";
  return null;
}

export function ManualEditor({ manualId, initial }: Props) {
  const [content, setContent] = useState(() => normalizeManualContent(initial));
  const [selectedPageId, setSelectedPageId] = useState<string>(MANUAL_COVER_ID);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSlideKind, setNewSlideKind] = useState<NewSlideKind>("chapter");
  const [savedHint, setSavedHint] = useState("");
  const [rightPanel, setRightPanel] = useState<RightPanel>("guide");
  const [previewRev, setPreviewRev] = useState(0);

  const bodyPages = useMemo(
    () =>
      content.pages.filter(
        (p) => !isStructuralPageId(p.id) && !isReviewPage(p),
      ),
    [content.pages],
  );

  const reviewPages = useMemo(
    () => content.pages.filter((p) => isReviewPage(p)),
    [content.pages],
  );

  const chapters = useMemo(() => listChapters(content.pages), [content.pages]);

  const selectedPage =
    content.pages.find((p) => p.id === selectedPageId) ?? content.pages[0];

  const selectedKind = inferSlideKind(selectedPage);

  const parentChapter =
    chapters.at(-1) ??
    bodyPages.find((s) => s.sectionLevel !== "subchapter" && s.sectionLevel !== "content")
      ?.chapter ??
    "Manual";

  const persist = useCallback(
    (next: ManualContent) => {
      const normalized = syncCoverPage(refreshTocPage(next));
      setContent(normalized);
      void saveDraft(manualId, normalized).then((saved) => {
        setPreviewRev((v) => v + 1);
        setSavedHint(saved.ok ? "Guardado en Supabase" : "Error al guardar");
        window.setTimeout(() => setSavedHint(""), 2000);
      });
    },
    [manualId],
  );

  function updateMeta(patch: Partial<NonNullable<ManualContent["meta"]>>) {
    persist({
      ...content,
      meta: {
        title: content.meta?.title ?? "Untitled",
        subtitle: content.meta?.subtitle,
        cover: content.meta?.cover,
        createdAt: content.meta?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...patch,
      },
    });
  }

  function updateCoverMeta(patch: Partial<ManualCoverMeta>) {
    updateMeta({
      cover: { ...content.meta?.cover, ...patch },
    });
  }

  function updateEquipment(index: number, patch: Partial<ManualEquipmentLine>) {
    const equipment = [...(content.meta?.cover?.equipment ?? [])];
    while (equipment.length <= index) {
      equipment.push({ code: "", label: "" });
    }
    equipment[index] = { ...equipment[index], ...patch };
    updateCoverMeta({ equipment });
  }

  function addSlide() {
    const title = newSectionTitle.trim();
    if (!title) return;

    if (newSlideKind === "review") {
      if (!chapters.length) {
        setSavedHint("Crea un capítulo antes del resumen");
        return;
      }
      const chapterTitle = parentChapter;
      const anchor =
        bodyPages.find((p) => p.chapter === chapterTitle && p.anchor)?.anchor ??
        title.toLowerCase().replace(/\s+/g, "-");
      const page = newReviewPage({
        chapterTitle,
        anchor,
        index: content.pages.length,
      });
      page.title = title;
      persist({ ...content, pages: [...content.pages, page] });
      setNewSectionTitle("");
      setSelectedPageId(page.id);
      return;
    }

    const level = sectionLevelForKind(newSlideKind);
    if (!level) return;
    if (
      (level === "subchapter" || level === "content") &&
      !chapters.length
    ) {
      setSavedHint("Crea un capítulo antes de este slide");
      return;
    }
    const page = newSectionPage({
      title,
      level,
      parentChapter:
        level === "chapter" ? title : parentChapter,
      index: bodyPages.length,
    });
    persist({ ...content, pages: [...content.pages, page] });
    setNewSectionTitle("");
    setSelectedPageId(page.id);
  }

  function removeSelectedSection() {
    if (isStructuralPageId(selectedPage.id)) return;
    if (!window.confirm(`¿Eliminar la slide «${selectedPage.title}»?`)) return;
    const pages = content.pages.filter((p) => p.id !== selectedPage.id);
    persist({ ...content, pages });
    setSelectedPageId(MANUAL_TOC_ID);
  }

  function reorderBodyPages(reordered: ManualPage[]) {
    const cover = content.pages.find(
      (p) => p.id === MANUAL_COVER_ID || p.id === "cover",
    );
    const toc = content.pages.find((p) => p.id === MANUAL_TOC_ID);
    const reviews = content.pages.filter((p) => isReviewPage(p));
    persist({
      ...content,
      pages: [
        ...(cover ? [cover] : []),
        ...(toc ? [toc] : []),
        ...reordered,
        ...reviews,
      ],
    });
  }

  function moveSection(delta: -1 | 1) {
    if (isStructuralPageId(selectedPage.id) || isReviewPage(selectedPage)) return;
    const ids = bodyPages.map((s) => s.id);
    const idx = ids.indexOf(selectedPage.id);
    const target = idx + delta;
    if (idx < 0 || target < 0 || target >= ids.length) return;
    const reordered = [...bodyPages];
    const [item] = reordered.splice(idx, 1);
    reordered.splice(target, 0, item);
    reorderBodyPages(reordered);
  }

  function updatePage(patch: Partial<ManualPage>) {
    persist({
      ...content,
      pages: content.pages.map((p) =>
        p.id === selectedPage.id ? { ...p, ...patch } : p,
      ),
    });
  }

  function updateBlock(index: number, block: ManualBlock) {
    const blocks = [...(selectedPage.blocks || [])];
    blocks[index] = block;
    updatePage({ blocks });
  }

  function addBlock(type: ManualBlock["type"], seed?: Partial<ManualBlock>) {
    const block = { ...emptyBlock(type), ...seed } as ManualBlock;
    updatePage({ blocks: [...(selectedPage.blocks || []), block] });
  }

  function insertSnippet(code: string) {
    if (
      isStructuralPageId(selectedPage.id) &&
      selectedPage.id !== MANUAL_COVER_ID
    ) {
      setSavedHint("Abre una slide de contenido para insertar HTML");
      return;
    }
    if (isReviewPage(selectedPage)) {
      setSavedHint("El resumen usa summary/quiz, no bloques HTML");
      return;
    }
    addBlock("manual-html", { html: code });
    setSavedHint("Bloque manual-html añadido");
  }

  function removeBlock(index: number) {
    const blocks = [...(selectedPage.blocks || [])];
    blocks.splice(index, 1);
    updatePage({ blocks });
  }

  function updateQuiz(questions: ManualPage["quiz"]) {
    updatePage({ quiz: normalizeQuiz(questions) });
  }

  async function exportToServer() {
    const saved = await saveDraft(manualId, content);
    setSavedHint(saved.ok ? "JSON sincronizado con Supabase" : "Error al exportar");
    window.setTimeout(() => setSavedHint(""), 2000);
  }

  const previewSrc = `/ejemplos/manual-interactivo/index.html?draft=${encodeURIComponent(manualId)}&v=${previewRev}`;

  const coverMeta = content.meta?.cover;

  return (
    <div className="editor-shell">
      <aside className="editor-nav">
        <div className="editor-nav-head">
          <h2>{content.meta?.title ?? "Borrador"}</h2>
          <p className="sub">Índice · mismo flujo que el visor</p>
        </div>
        <nav className="editor-nav-list">
          <button
            type="button"
            className={selectedPageId === MANUAL_COVER_ID ? "active" : ""}
            onClick={() => setSelectedPageId(MANUAL_COVER_ID)}
          >
            <span>Start</span>
            <strong>Carátula</strong>
          </button>
          <button
            type="button"
            className={selectedPageId === MANUAL_TOC_ID ? "active" : ""}
            onClick={() => setSelectedPageId(MANUAL_TOC_ID)}
          >
            <span>Index</span>
            <strong>Índice (auto)</strong>
          </button>
          {bodyPages.map((p) => (
            <button
              key={p.id}
              type="button"
              className={selectedPageId === p.id ? "active" : ""}
              onClick={() => setSelectedPageId(p.id)}
            >
              <span>{slideKindLabel(inferSlideKind(p))}</span>
              <strong>{p.title}</strong>
            </button>
          ))}
          {reviewPages.length ? (
            <p className="field-label nav-divider">Resúmenes</p>
          ) : null}
          {reviewPages.map((p) => (
            <button
              key={p.id}
              type="button"
              className={selectedPageId === p.id ? "active" : ""}
              onClick={() => setSelectedPageId(p.id)}
            >
              <span>Review</span>
              <strong>{p.title}</strong>
            </button>
          ))}
        </nav>

        <div className="editor-nav-add">
          <label className="field-label">Nueva slide</label>
          <select
            value={newSlideKind}
            onChange={(e) => setNewSlideKind(e.target.value as NewSlideKind)}
          >
            <option value="chapter">Capítulo (H1)</option>
            <option value="subchapter">Subcapítulo (H2)</option>
            <option value="content">Contenido normal</option>
            <option value="review">Resumen y autoevaluación</option>
          </select>
          {newSlideKind === "subchapter" || newSlideKind === "content" ? (
            <p className="hint tiny">
              Dentro de: <strong>{parentChapter}</strong>
            </p>
          ) : null}
          {newSlideKind === "review" ? (
            <p className="hint tiny">
              Capítulo: <strong>{parentChapter}</strong> · layout-recap + quiz
            </p>
          ) : null}
          <input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder={
              newSlideKind === "review"
                ? "Título del slide de revisión"
                : "Título de la slide"
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") addSlide();
            }}
          />
          <button type="button" className="btn block" onClick={addSlide}>
            Añadir slide
          </button>
        </div>
      </aside>

      <section className="editor-main glass-panel">
        <div className="editor-toolbar">
          <div>
            <h2 className="editor-page-title">
              Editor · {slideKindLabel(selectedKind)}
            </h2>
            <p className="hint toolbar-hint">
              {savedHint || "Los cambios se guardan al editar (PUT /api/manuals/[id])."}
            </p>
          </div>
          <div className="toolbar-actions">
            <button
              type="button"
              className={`btn ghost small${rightPanel === "guide" ? " on" : ""}`}
              onClick={() => setRightPanel("guide")}
            >
              Guía
            </button>
            <button
              type="button"
              className={`btn ghost small${rightPanel === "preview" ? " on" : ""}`}
              onClick={() => setRightPanel("preview")}
            >
              Vista previa
            </button>
            <Link className="btn ghost small" href={`/manuals/view/${manualId}`}>
              Visor completo
            </Link>
            <button
              type="button"
              className="btn ghost small"
              onClick={() => void exportToServer()}
            >
              Exportar JSON
            </button>
          </div>
        </div>

        {selectedKind === "cover" ? (
          <div className="form-stack cover-form">
            <label>
              Título (slide)
              <input
                value={content.meta?.title ?? selectedPage.title}
                onChange={(e) => updateMeta({ title: e.target.value })}
              />
            </label>
            <label>
              Eyebrow (cover-eyebrow)
              <input
                value={coverMeta?.eyebrow ?? content.meta?.subtitle ?? ""}
                onChange={(e) => updateCoverMeta({ eyebrow: e.target.value })}
              />
            </label>
            <label>
              Línea de marca (cover-brand)
              <input
                value={coverMeta?.brandLine ?? ""}
                onChange={(e) => updateCoverMeta({ brandLine: e.target.value })}
              />
            </label>
            <label>
              Logo (URL opcional)
              <input
                value={coverMeta?.logoUrl ?? ""}
                onChange={(e) => updateCoverMeta({ logoUrl: e.target.value })}
                placeholder="/manual/images/image1.png"
              />
            </label>
            {[0, 1, 2].map((i) => (
              <div key={i} className="equipment-row">
                <input
                  placeholder="Código EQ"
                  value={coverMeta?.equipment?.[i]?.code ?? ""}
                  onChange={(e) => updateEquipment(i, { code: e.target.value })}
                />
                <input
                  placeholder="Descripción"
                  value={coverMeta?.equipment?.[i]?.label ?? ""}
                  onChange={(e) => updateEquipment(i, { label: e.target.value })}
                />
              </div>
            ))}
            <label>
              Aviso legal (opcional)
              <textarea
                rows={2}
                value={coverMeta?.notice ?? ""}
                onChange={(e) => updateCoverMeta({ notice: e.target.value })}
              />
            </label>
            <p className="hint">
              Carátula <code>cover-hero</code> · id <code>t01</code> · layout-cover.
            </p>
          </div>
        ) : selectedKind === "toc" ? (
          <div className="toc-readonly">
            <p className="hint">
              Índice auto (<code>toc-grid</code> / <code>toc-card</code>). Capítulos
              y subcapítulos; el contenido normal no aparece en el índice.
            </p>
            <pre className="toc-preview">
              {(selectedPage.blocks?.[0]?.type === "manual-html"
                ? selectedPage.blocks[0].html
                : "") || ""}
            </pre>
          </div>
        ) : selectedKind === "review" ? (
          <div className="form-stack wide review-form">
            <div className="section-toolbar">
              <button
                type="button"
                className="btn ghost small danger"
                onClick={removeSelectedSection}
              >
                Eliminar slide de revisión
              </button>
            </div>
            <label>
              Título
              <input
                value={selectedPage.title}
                onChange={(e) => updatePage({ title: e.target.value })}
              />
            </label>
            <label>
              Kicker
              <input
                value={selectedPage.kicker ?? ""}
                onChange={(e) => updatePage({ kicker: e.target.value })}
              />
            </label>
            <label>
              Lead
              <textarea
                rows={2}
                value={selectedPage.lead ?? ""}
                onChange={(e) => updatePage({ lead: e.target.value })}
              />
            </label>
            <label>
              Capítulo padre
              <input
                value={selectedPage.chapter}
                onChange={(e) =>
                  updatePage({
                    chapter: e.target.value,
                    group: `${e.target.value} · Summary`,
                  })
                }
              />
            </label>
            <label>
              Audio / narración (EN por defecto)
              <textarea
                rows={2}
                value={selectedPage.audio ?? ""}
                onChange={(e) => updatePage({ audio: e.target.value })}
              />
            </label>
            <label>
              Resumen · English (coach-dock)
              <textarea
                rows={4}
                value={selectedPage.summary?.en ?? ""}
                onChange={(e) =>
                  updatePage({
                    summary: {
                      en: e.target.value,
                      es: selectedPage.summary?.es ?? "",
                    },
                  })
                }
              />
            </label>
            <label>
              Resumen · Español
              <textarea
                rows={4}
                value={selectedPage.summary?.es ?? ""}
                onChange={(e) =>
                  updatePage({
                    summary: {
                      en: selectedPage.summary?.en ?? "",
                      es: e.target.value,
                    },
                  })
                }
              />
            </label>
            <h3 className="blocks-heading">Autoevaluación (quiz)</h3>
            <p className="hint">
              Misma estructura que <code>review-objectives</code> en content.js:
              bilingüe, 70% para aprobar, avatar Safety Coach en el visor.
            </p>
            <QuizEditor
              questions={selectedPage.quiz ?? []}
              onChange={updateQuiz}
            />
          </div>
        ) : (
          <>
            <div className="section-toolbar">
              <button
                type="button"
                className="btn ghost small"
                onClick={() => moveSection(-1)}
              >
                ↑ Subir
              </button>
              <button
                type="button"
                className="btn ghost small"
                onClick={() => moveSection(1)}
              >
                ↓ Bajar
              </button>
              <button
                type="button"
                className="btn ghost small danger"
                onClick={removeSelectedSection}
              >
                Eliminar slide
              </button>
            </div>
            <div className="form-stack wide">
              <label>
                Tipo de slide
                <select
                  value={selectedPage.sectionLevel ?? "chapter"}
                  onChange={(e) => {
                    const level = e.target.value as ManualSectionLevel;
                    const slideKind: ManualSlideKind =
                      level === "chapter"
                        ? "chapter"
                        : level === "subchapter"
                          ? "subchapter"
                          : "content";
                    updatePage({
                      sectionLevel: level,
                      slideKind,
                      kicker:
                        level === "chapter"
                          ? "Chapter"
                          : level === "subchapter"
                            ? `Subchapter · ${selectedPage.chapter}`
                            : `Content · ${selectedPage.chapter}`,
                    });
                  }}
                >
                  <option value="chapter">Capítulo</option>
                  <option value="subchapter">Subcapítulo</option>
                  <option value="content">Contenido normal</option>
                </select>
              </label>
              <label>
                Título (H1/H2 del visor)
                <input
                  value={selectedPage.title}
                  onChange={(e) => updatePage({ title: e.target.value })}
                />
              </label>
              <label>
                Kicker / etiqueta superior
                <input
                  value={selectedPage.kicker ?? ""}
                  onChange={(e) => updatePage({ kicker: e.target.value })}
                />
              </label>
              <label>
                Lead / entradilla
                <textarea
                  rows={2}
                  value={selectedPage.lead ?? ""}
                  onChange={(e) => updatePage({ lead: e.target.value })}
                />
              </label>
              <label>
                Anchor (href del índice)
                <input
                  value={selectedPage.anchor ?? ""}
                  onChange={(e) => updatePage({ anchor: e.target.value })}
                  placeholder="objectives"
                />
              </label>
            </div>

            <h3 className="blocks-heading">Bloques de contenido</h3>
            <div className="block-list">
              {(selectedPage.blocks || []).map((block, index) => (
                <BlockEditor
                  key={`${selectedPage.id}-${index}`}
                  block={block}
                  onChange={(b) => updateBlock(index, b)}
                  onRemove={() => removeBlock(index)}
                />
              ))}
            </div>
            <div className="block-add-row">
              {EDITOR_BLOCK_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className="btn ghost small"
                  title={BLOCK_TYPE_LABELS[type]}
                  onClick={() => addBlock(type)}
                >
                  + {BLOCK_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
          </>
        )}
      </section>

      <aside className="editor-side glass-panel">
        {rightPanel === "guide" ? (
          <FormatGuidePanel onInsertSnippet={insertSnippet} compact />
        ) : (
          <div className="editor-preview-wrap">
            <p className="hint preview-label">
              Vista previa en vivo (<code>?draft=</code>)
            </p>
            <iframe
              key={previewSrc}
              className="editor-preview-frame"
              title="Vista previa del borrador"
              src={previewSrc}
            />
          </div>
        )}
      </aside>
    </div>
  );
}
