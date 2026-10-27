import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { brand } from "@/lib/brand";
import type { ManualBlock, ManualContent, ManualPage, ManualQuizQuestion } from "@/lib/manual/types";
import { readLogo, readPublicBrand } from "@/lib/workspace/store";

const IMAGE_MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

const MAX_EMBED_BYTES = 4_000_000;

type Assets = {
  companyName: string;
  logoDataUri: string | null;
  robotDataUri: string | null;
  cache: Map<string, string>;
};

function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function dataUri(bytes: Buffer, mime: string): string {
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

function embedJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

function localPathname(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return null;
  try {
    const pathname = new URL(trimmed, "http://local").pathname;
    if (!pathname.startsWith("/") || pathname.includes("..")) return null;
    return pathname;
  } catch {
    return null;
  }
}

function isBrandLogoPath(pathname: string): boolean {
  return pathname === "/api/brand/logo" || pathname.startsWith("/api/brand/logo/");
}

function isRobotPath(pathname: string): boolean {
  return pathname === "/robot.png" || pathname === "/manual-asset/robot.png";
}

async function readPublicImage(pathname: string): Promise<{ bytes: Buffer; mime: string } | null> {
  const root = path.resolve(process.cwd(), "public");
  const filePath = path.resolve(root, pathname.replace(/^\//, ""));
  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) return null;
  const mime = IMAGE_MIME[path.extname(filePath).toLowerCase()];
  if (!mime) return null;
  try {
    const info = await stat(filePath);
    if (!info.isFile() || info.size <= 0 || info.size > MAX_EMBED_BYTES) return null;
    return { bytes: await readFile(filePath), mime };
  } catch {
    return null;
  }
}

async function loadAssets(): Promise<Assets> {
  let companyName: string = brand.productName;
  let logoDataUri: string | null = null;
  try {
    const pub = await readPublicBrand();
    companyName = pub.companyName?.trim() || companyName;
    if (pub.logoUrl) {
      const logo = await readLogo();
      if (
        logo &&
        logo.mime.startsWith("image/") &&
        logo.bytes.length > 0 &&
        logo.bytes.length <= MAX_EMBED_BYTES
      ) {
        logoDataUri = dataUri(logo.bytes, logo.mime);
      }
    }
  } catch {
    logoDataUri = null;
  }

  let robotDataUri: string | null = null;
  try {
    const robotPath = path.join(process.cwd(), "robot.png");
    const info = await stat(robotPath);
    if (info.isFile() && info.size > 0 && info.size <= MAX_EMBED_BYTES) {
      robotDataUri = dataUri(await readFile(robotPath), "image/png");
    }
  } catch {
    robotDataUri = null;
  }

  return { companyName, logoDataUri, robotDataUri, cache: new Map() };
}

async function resolveUrl(url: string, assets: Assets): Promise<string> {
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith("data:")) return trimmed;
  const cached = assets.cache.get(trimmed);
  if (cached) return cached;

  let resolved = trimmed;
  const pathname = localPathname(trimmed);
  if (pathname && isBrandLogoPath(pathname) && assets.logoDataUri) {
    resolved = assets.logoDataUri;
  } else if (pathname && isRobotPath(pathname) && assets.robotDataUri) {
    resolved = assets.robotDataUri;
  } else if (pathname) {
    const file = await readPublicImage(pathname);
    if (file) resolved = dataUri(file.bytes, file.mime);
  }

  assets.cache.set(trimmed, resolved);
  return resolved;
}

function sanitizeManualHtml(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\2/gi, "");
}

async function rewriteHtmlAssets(html: string, assets: Assets): Promise<string> {
  const found = new Map<string, string>();
  for (const match of html.matchAll(/\bsrc\s*=\s*("([^"]*)"|'([^']*)')/gi)) {
    const raw = match[2] ?? match[3] ?? "";
    if (!raw || raw.startsWith("data:") || found.has(raw)) continue;
    found.set(raw, await resolveUrl(raw, assets));
  }
  let out = html;
  const entries = [...found.entries()].sort((a, b) => b[0].length - a[0].length);
  for (const [raw, next] of entries) {
    if (next !== raw) out = out.split(raw).join(next);
  }
  return out;
}

function injectCoverLogo(html: string, logoDataUri: string | null): string {
  if (!logoDataUri || !html.includes("cover-brand")) return html;
  return html.replace(/<div class="cover-brand">([\s\S]*?)<\/div>/g, (full, inner: string) => {
    if (/<img\b/i.test(inner)) return full;
    return `<div class="cover-brand"><img class="install-cover-logo" alt="" src="${logoDataUri}">${inner}</div>`;
  });
}

function kindLabel(page: ManualPage): string {
  const kind = String(page.slideKind || "");
  if (page.id === "t01" || page.id === "cover" || kind === "cover") return "Carátula";
  if (page.id === "toc" || kind === "toc") return "Índice";
  if (kind === "summary") return "Resumen";
  if (kind === "quiz") return "Cuestionario";
  if (kind === "review") return "Resumen y evaluación";
  if (kind === "chapter" || page.sectionLevel === "chapter") return "Módulo";
  if (kind === "subchapter" || page.sectionLevel === "subchapter") return "Submódulo";
  if (kind === "content" || page.sectionLevel === "content") return "Contenido";
  return "Lámina";
}

function layoutClass(page: ManualPage): string {
  const kind = String(page.slideKind || "");
  if (page.id === "t01" || page.id === "cover" || kind === "cover") return "layout-cover";
  if (kind === "summary" || kind === "quiz" || kind === "review" || (page.quiz?.length ?? 0) > 0) {
    return "layout-recap";
  }
  return "layout-content";
}

function slideDomId(page: ManualPage, index: number): string {
  const raw = page.id?.trim();
  if (raw) return raw;
  return `lamina-${index + 1}`;
}

function bilingual(primary?: string, alternate?: string): { main: string; alt: string | null } {
  const first = (primary ?? "").trim();
  const second = (alternate ?? "").trim();
  const main = first || second;
  if (!main) return { main: "", alt: null };
  if (second && second !== main) return { main, alt: second };
  return { main, alt: null };
}

function textWithAlt(primary?: string, alternate?: string): string {
  const { main, alt } = bilingual(primary, alternate);
  if (!main) return "";
  if (!alt) return esc(main);
  return `${esc(main)}<span class="alt">${esc(alt)}</span>`;
}

function svgPreset(kind: string, caption: string): string {
  const label = esc(caption || kind);
  const presets: Record<string, string> = {
    pump: `<svg viewBox="0 0 260 140" width="100%" height="160" role="img" aria-label="${label}"><rect width="260" height="140" fill="#cfd8e6"/><rect x="30" y="78" width="200" height="14" fill="#8b96a8"/><rect x="58" y="50" width="70" height="46" rx="4" fill="#2c3d5c"/><circle cx="160" cy="72" r="28" fill="#3d5278"/><circle cx="160" cy="72" r="12" fill="#d9e4f2"/><rect x="186" y="64" width="40" height="16" fill="#c45c26"/><text x="20" y="24" fill="#1b2a4a" font-size="12" font-family="Segoe UI, sans-serif">${label}</text></svg>`,
    tower: `<svg viewBox="0 0 260 140" width="100%" height="160" role="img" aria-label="${label}"><rect width="260" height="140" fill="#c5d4c8"/><path d="M70 120 L90 30 H170 L190 120 Z" fill="#4d6a5a"/><rect x="100" y="18" width="60" height="12" fill="#2c3d5c"/><rect x="40" y="118" width="180" height="10" fill="#6b7c70"/><text x="20" y="24" fill="#1b2a4a" font-size="12" font-family="Segoe UI, sans-serif">${label}</text></svg>`,
    exchanger: `<svg viewBox="0 0 260 140" width="100%" height="160" role="img" aria-label="${label}"><rect width="260" height="140" fill="#d9d3c5"/><rect x="40" y="50" width="180" height="44" rx="22" fill="#5a6e86"/><rect x="55" y="58" width="150" height="28" rx="14" fill="#cfd8e6"/><rect x="20" y="64" width="22" height="16" fill="#c45c26"/><rect x="218" y="64" width="22" height="16" fill="#c45c26"/><text x="20" y="24" fill="#1b2a4a" font-size="12" font-family="Segoe UI, sans-serif">${label}</text></svg>`,
    hmi: `<svg viewBox="0 0 260 140" width="100%" height="160" role="img" aria-label="${label}"><rect width="260" height="140" fill="#1b2436"/><rect x="24" y="36" width="212" height="84" rx="6" fill="#243656"/><rect x="36" y="48" width="70" height="18" rx="3" fill="#1f7a4d"/><rect x="36" y="72" width="70" height="18" rx="3" fill="#1f7a4d"/><rect x="36" y="96" width="70" height="18" rx="3" fill="#9b2c2c"/><text x="116" y="61" fill="#d7e4f7" font-size="11" font-family="Segoe UI, sans-serif">LEVEL OK</text><text x="116" y="85" fill="#d7e4f7" font-size="11" font-family="Segoe UI, sans-serif">VALVES OPEN</text><text x="116" y="109" fill="#d7e4f7" font-size="11" font-family="Segoe UI, sans-serif">TRIP ACTIVE</text><text x="20" y="24" fill="#d7e4f7" font-size="12" font-family="Segoe UI, sans-serif">${label}</text></svg>`,
  };
  return presets[kind] || presets.pump;
}

function goHref(go: string): string {
  const value = go.trim();
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("#")) return value;
  return `#${value}`;
}

async function renderBlock(block: ManualBlock, assets: Assets): Promise<string> {
  switch (block.type) {
    case "manual-html": {
      const clean = sanitizeManualHtml(block.html || "");
      const withAssets = await rewriteHtmlAssets(clean, assets);
      const withLogo = injectCoverLogo(withAssets, assets.logoDataUri);
      return `<section class="manual-document">${withLogo}</section>`;
    }
    case "text":
      return `<p>${esc(block.text)}</p>`;
    case "heading": {
      const tag = block.level === 2 ? "h2" : block.level === 4 ? "h4" : "h3";
      return `<${tag} class="block-heading">${esc(block.text)}</${tag}>`;
    }
    case "callout":
      return `<div class="callout">${esc(block.text)}</div>`;
    case "warn":
      return `<div class="warn">${esc(block.text)}</div>`;
    case "ok":
      return `<div class="ok">${esc(block.text)}</div>`;
    case "columns": {
      const cols = (block.columns || [])
        .map(
          (column) => `<div class="column-card">${
            column.title ? `<strong>${esc(column.title)}</strong>` : ""
          }<p>${esc(column.body || "")}</p></div>`,
        )
        .join("");
      return `<div class="column-grid">${cols}</div>`;
    }
    case "list": {
      const items = (block.items || []).map((item) => `<li>${esc(item)}</li>`).join("");
      return `<div class="card">${block.title ? `<strong>${esc(block.title)}</strong>` : ""}<ul>${items}</ul></div>`;
    }
    case "steps": {
      const items = (block.items || []).map((item) => `<li>${esc(item)}</li>`).join("");
      return `${block.title ? `<h3>${esc(block.title)}</h3>` : ""}<ol class="steps">${items}</ol>`;
    }
    case "table": {
      const head = (block.headers || []).map((header) => `<th>${esc(header)}</th>`).join("");
      const rows = (block.rows || [])
        .map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`)
        .join("");
      return `<div class="card"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    case "chart": {
      const labels = block.labels || [];
      const values = block.values || [];
      const max = Math.max(1, ...values.map((value) => Number(value) || 0));
      const bars = labels
        .map((label, index) => {
          const value = Number(values[index]) || 0;
          const height = Math.round((value / max) * 100);
          return `<div class="chart-bar"><span>${esc(label)}</span><i style="height:${height}%"></i><em>${esc(value)}</em></div>`;
        })
        .join("");
      return `<div class="card chart-block"><strong>${esc(block.title || "Gráfico")}</strong><div class="chart-bars">${bars}</div></div>`;
    }
    case "photos": {
      const figures = await Promise.all(
        (block.items || []).map(async (item) => {
          const photo = item as { url?: string; src?: string; caption?: string; kind?: string };
          const caption = photo.caption || "Imagen";
          const src = photo.src || photo.url || "";
          if (src) {
            const resolved = await resolveUrl(src, assets);
            return `<figure class="photo"><img src="${esc(resolved)}" alt="${esc(caption)}" /><figcaption>${esc(caption)}</figcaption></figure>`;
          }
          return `<figure class="photo">${svgPreset(photo.kind || "pump", caption)}<figcaption>${esc(caption)}</figcaption></figure>`;
        }),
      );
      return `<div class="media-grid">${figures.join("")}</div>`;
    }
    case "videos": {
      const figures = (block.items || [])
        .map((item) => {
          const steps = (item.steps || []).map((step) => `<li>${esc(step)}</li>`).join("");
          const url = item.url?.trim() || "";
          const link = /^https?:\/\//i.test(url)
            ? `<a href="${esc(url)}">Ver video</a>`
            : "";
          return `<figure class="video"><figcaption>${esc(item.title || "Video")}</figcaption>${link}${
            steps ? `<ol>${steps}</ol>` : ""
          }</figure>`;
        })
        .join("");
      return `<div class="media-grid">${figures}</div>`;
    }
    case "nav-cards": {
      const cards = (block.items || [])
        .map(
          (card) => `<article class="toc-card"><span>${esc(card.tag)}</span><strong>${esc(card.title)}</strong><p>${esc(card.text)}</p><a href="${esc(goHref(card.go))}">Ver lámina</a></article>`,
        )
        .join("");
      return `<div class="toc-grid">${cards}</div>`;
    }
    case "flow": {
      const nodes = block.nodes || [];
      const row = nodes
        .map((node, index) => {
          const arrow = index ? `<span class="arrow" aria-hidden="true">→</span>` : "";
          return `${arrow}<div class="flow-node"><strong>${esc(node.label)}</strong><small>${esc(node.sub || "")}</small></div>`;
        })
        .join("");
      const details = nodes
        .map(
          (node) => `<li><strong>${esc(node.label)}</strong>${
            node.sub ? ` <small>${esc(node.sub)}</small>` : ""
          }<p>${esc(node.detail)}</p></li>`,
        )
        .join("");
      return `<div class="flow-board"><p class="flow-label">Flujo</p><div class="flow-row">${row}</div><ol class="flow-details">${details}</ol></div>`;
    }
    case "checklist": {
      const items = (block.items || [])
        .map((item) => `<li><span class="box" aria-hidden="true"></span><span>${esc(item)}</span></li>`)
        .join("");
      return `<div class="card"><strong>${esc(block.title || "Lista de verificación")}</strong><ul class="checks">${items}</ul></div>`;
    }
    case "reveal": {
      const items = (block.items || [])
        .map(
          (item) => `<div class="reveal-card"><strong>${esc(item.label)}</strong><p>${esc(item.detail)}</p></div>`,
        )
        .join("");
      return `<div class="card">${block.title ? `<strong>${esc(block.title)}</strong>` : ""}${items}</div>`;
    }
    case "simulator": {
      const items = (block.items || []).map((item) => `<li>${esc(item)}</li>`).join("");
      return `<div class="card"><strong>${esc(block.title || "Simulador")}</strong><p class="hint">Solo lectura.</p><ul>${items}</ul><p class="ok">${esc(block.success)}</p><p class="warn">${esc(block.fail)}</p></div>`;
    }
    default:
      return "";
  }
}

function summaryParts(page: ManualPage): { label: string; text: string }[] {
  const es = page.summary?.es?.trim() || "";
  const en = page.summary?.en?.trim() || "";
  const parts: { label: string; text: string }[] = [];
  if (es) parts.push({ label: "Español", text: es });
  if (en && en !== es) parts.push({ label: "English", text: en });
  if (!parts.length && page.audio?.trim()) parts.push({ label: "", text: page.audio.trim() });
  return parts;
}

function renderSummary(page: ManualPage, assets: Assets): string {
  const parts = summaryParts(page);
  if (!parts.length) return "";
  const avatar = assets.robotDataUri
    ? `<img class="robot-coach" src="${assets.robotDataUri}" alt="Avatar del resumen" />`
    : "";
  const copy = parts
    .map((part) => `<p>${part.label ? `<span class="lang">${esc(part.label)}</span>` : ""}${esc(part.text)}</p>`)
    .join("");
  return `<section class="coach" aria-label="Resumen">${
    avatar ? `<div class="coach-avatar">${avatar}</div>` : ""
  }<div><span class="tag">Resumen</span><h3>Resumen del capítulo</h3>${copy}</div></section>`;
}

function renderQuiz(page: ManualPage): string {
  const questions = page.quiz || [];
  if (!questions.length) return "";
  const items = questions.map((item, index) => renderQuestion(item, index)).join("");
  return `<section class="quiz" aria-label="Cuestionario"><h3>Cuestionario · ${questions.length} ${
    questions.length === 1 ? "pregunta" : "preguntas"
  }</h3><p class="hint">Solo lectura. La respuesta marcada es la correcta.</p>${items}</section>`;
}

function renderQuestion(item: ManualQuizQuestion, index: number): string {
  const ask = textWithAlt(item.q, item.qEs);
  const options = item.options || [];
  const optionsEs = item.optionsEs || [];
  const correct = Number.isInteger(item.a) ? item.a : -1;
  const choices = options
    .map((option, optionIndex) => {
      const mark = optionIndex === correct ? " correcta" : "";
      const badge = optionIndex === correct ? `<em>Correcta</em>` : "";
      return `<li class="opt${mark}"><span class="letter">${esc(String.fromCharCode(65 + optionIndex))}</span><span>${textWithAlt(option, optionsEs[optionIndex])}</span>${badge}</li>`;
    })
    .join("");
  const why = textWithAlt(item.why, item.whyEs);
  return `<article class="q"><p><strong>${index + 1}.</strong> ${ask}</p><ol class="opts">${choices}</ol>${
    why ? `<p class="why">${why}</p>` : ""
  }</article>`;
}

async function renderSlide(page: ManualPage, index: number, total: number, assets: Assets): Promise<string> {
  const id = slideDomId(page, index);
  const blocks = await Promise.all((page.blocks || []).map((block) => renderBlock(block, assets)));
  const chapter = page.chapter?.trim();
  const meta = [`Lámina ${index + 1} de ${total}`, kindLabel(page), chapter].filter(Boolean).join(" · ");
  return `<article class="slide ${layoutClass(page)}" id="${esc(id)}">
    <p class="slide-meta">${esc(meta)}</p>
    ${page.kicker ? `<p class="kicker">${esc(page.kicker)}</p>` : ""}
    <h2>${esc(page.title || "Sin título")}</h2>
    ${page.lead ? `<p class="lead">${esc(page.lead)}</p>` : ""}
    ${blocks.join("\n")}
    ${renderSummary(page, assets)}
    ${renderQuiz(page)}
  </article>`;
}

const EXPORT_CSS = `
:root {
  --accent: #c45c26;
  --ink: #1c2333;
  --muted: #5b6578;
  --line: #d7dde8;
  --card: #fff;
  --bg: #f4f7fb;
  --navy: #1b2a4a;
  --ok: #1f7a4d;
  --ok-bg: #e7f6ee;
  --warn: #8a5a00;
  --warn-bg: #fff4d6;
  --bad: #9b2c2c;
}
* { box-sizing: border-box; }
html { color-scheme: light; }
body {
  margin: 0;
  font-family: "Segoe UI", system-ui, sans-serif;
  color: var(--ink);
  background:
    radial-gradient(650px 420px at 8% -8%, rgba(255, 255, 255, 0.98), transparent 70%),
    radial-gradient(600px 380px at 95% 4%, rgba(196, 92, 38, 0.08), transparent 70%),
    var(--bg);
  line-height: 1.5;
}
a { color: #2b6cb0; }
.doc {
  max-width: 980px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}
.doc-head {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 28px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 42px;
}
.brand img {
  height: 42px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
}
.brand strong { font-size: 0.95rem; letter-spacing: 0.02em; }
.eyebrow {
  margin: 8px 0 0;
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.doc-head h1 {
  margin: 0;
  color: var(--navy);
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
}
.doc-head .sub, .doc-head .count { margin: 0; color: var(--muted); }
.jump {
  margin: 0 0 28px;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--card);
}
.jump p { margin: 0 0 8px; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
.jump ol { margin: 0; padding-left: 1.2rem; }
.jump li { margin: 4px 0; }
.jump a { color: inherit; text-decoration: none; }
.jump a:hover { color: var(--accent); }
.jump small { color: var(--muted); margin-right: 6px; }
.slide {
  margin: 0 0 22px;
  padding: 28px 28px 24px;
  border: 1px solid #e6e0d4;
  border-radius: 18px;
  background: var(--card);
  box-shadow: 0 10px 30px rgba(16, 25, 43, 0.06);
}
.slide-meta, .kicker {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.kicker {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 99px;
  background: #ece6da;
}
.slide h2 {
  margin: 0 0 12px;
  color: var(--navy);
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
}
.lead { margin: 0 0 18px; color: #3a4456; font-size: 1.05rem; }
.slide p, .slide li { font-size: 1rem; }
.card, .quiz, .coach, .flow-board {
  margin: 16px 0;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
}
.callout, .warn, .ok {
  margin: 16px 0;
  padding: 14px 16px;
  border-radius: 0 12px 12px 0;
}
.callout { border-left: 4px solid var(--accent); background: #fff4ec; }
.warn { border-left: 4px solid var(--warn); background: var(--warn-bg); color: var(--warn); }
.ok { border-left: 4px solid var(--ok); background: var(--ok-bg); color: var(--ok); }
.card > strong, .quiz h3, .coach h3 { display: block; margin: 0 0 8px; }
ol.steps { margin: 8px 0 0; padding: 0; list-style: none; counter-reset: step; }
ol.steps li {
  position: relative;
  margin: 8px 0;
  padding: 10px 12px 10px 48px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
}
ol.steps li::before {
  counter-increment: step;
  content: counter(step);
  position: absolute;
  left: 10px;
  top: 10px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--navy);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: grid;
  place-items: center;
}
table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
th, td { border-bottom: 1px solid #ece6da; text-align: left; padding: 9px 8px; vertical-align: top; }
th { font-size: 0.72rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--muted); }
.media-grid, .toc-grid, .column-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}
.photo, .video, .column-card, .toc-card, .reveal-card {
  margin: 0;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #f8fafc;
  overflow: hidden;
}
.photo img, .video img { width: 100%; display: block; max-height: 280px; object-fit: cover; background: #e8edf5; }
.photo figcaption, .video figcaption, .video { padding: 8px 10px 10px; color: var(--muted); font-size: 0.85rem; }
.column-card, .toc-card, .reveal-card { padding: 14px 16px; }
.toc-card { display: flex; min-height: 120px; flex-direction: column; gap: 8px; color: inherit; text-decoration: none; background: #fff; }
.toc-card span, .manual-document .toc-card span { color: #b95022; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
.toc-card strong { color: #17233a; }
.toc-card i, .toc-card a { color: #64748b; font-style: normal; font-weight: 700; font-size: 0.85rem; }
.flow-board { background: #f8fafc; }
.flow-label { margin: 0 0 8px; color: var(--muted); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
.flow-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.flow-node { min-width: 120px; padding: 10px 12px; border: 1px solid #d7dde8; border-radius: 10px; background: #fff; }
.flow-node small, .flow-details small { display: block; color: var(--muted); }
.arrow { color: var(--ok); font-weight: 700; }
.flow-details { margin: 12px 0 0; padding-left: 1.1rem; }
.flow-details p { margin: 4px 0 0; }
.checks { list-style: none; margin: 10px 0 0; padding: 0; }
.checks li { display: flex; gap: 10px; align-items: flex-start; margin: 8px 0; }
.box { width: 16px; height: 16px; margin-top: 3px; border: 1.5px solid #747775; border-radius: 4px; flex: none; }
.chart-bars { display: flex; align-items: flex-end; gap: 12px; min-height: 140px; margin-top: 12px; }
.chart-bar { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; gap: 6px; min-height: 140px; color: var(--muted); font-size: 0.75rem; }
.chart-bar i { display: block; width: 100%; max-width: 48px; background: var(--accent); border-radius: 4px 4px 0 0; }
.chart-bar em { font-style: normal; font-weight: 700; color: var(--ink); }
.coach { display: grid; grid-template-columns: 140px 1fr; gap: 16px; align-items: center; background: #f8fafc; }
.coach-avatar { width: 140px; height: 140px; overflow: hidden; border-radius: 28px; background: #fff; box-shadow: 0 12px 26px rgba(15, 23, 42, 0.12); }
.robot-coach { width: 100%; height: 100%; object-fit: cover; object-position: 50% 17%; }
.tag, .lang {
  display: inline-block;
  margin: 0 8px 8px 0;
  padding: 3px 8px;
  border-radius: 99px;
  background: #fff4ec;
  color: #9a431e;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.lang { letter-spacing: 0.08em; text-transform: uppercase; }
.alt { display: block; margin-top: 4px; color: var(--muted); }
.hint { color: var(--muted); font-size: 0.92rem; }
.q { padding: 12px 0; border-top: 1px solid #edf1f5; }
.opts { list-style: none; margin: 8px 0 0; padding: 0; }
.opt {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 6px 0;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #f8fafc;
}
.opt.correcta { border-color: #a6d8c1; background: var(--ok-bg); }
.letter { font-weight: 800; color: var(--navy); }
.opt em { margin-left: auto; font-style: normal; font-size: 0.75rem; font-weight: 800; color: var(--ok); }
.why { margin: 8px 0 0; color: #3a4456; }
.manual-document { min-width: 0; }
.cover-hero {
  padding: 28px;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  background:
    radial-gradient(circle at 92% 8%, rgba(196, 92, 38, 0.14), transparent 28%),
    linear-gradient(145deg, #ffffff 0%, #f8fafc 62%, #eef3f8 100%);
}
.cover-brand { display: flex; align-items: center; justify-content: space-between; gap: 16px; color: var(--muted); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.cover-brand img, .install-cover-logo { width: 132px; height: auto; object-fit: contain; }
.cover-eyebrow { margin-top: 28px; color: var(--accent); font-size: 0.75rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; }
.cover-equipment { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 18px; }
.cover-equipment div { padding: 14px; border: 1px solid #e2e8f0; border-radius: 14px; background: rgba(255, 255, 255, 0.8); }
.cover-equipment strong, .cover-equipment span { display: block; }
.cover-equipment span { margin-top: 4px; color: #64748b; font-size: 0.85rem; font-weight: 400; letter-spacing: 0; text-transform: none; }
.cover-start { margin-top: 16px; padding: 12px 14px; border-radius: 12px; background: var(--navy); color: #fff; font-size: 0.92rem; }
.manual-document img { display: block; max-width: 100%; height: auto; }
.doc-foot { margin-top: 12px; color: var(--muted); font-size: 0.85rem; }
@media (max-width: 700px) {
  .slide { padding: 20px 16px; }
  .coach { grid-template-columns: 1fr; }
  .cover-brand { align-items: flex-start; flex-direction: column; }
}
`;

export async function buildManualExportHtml(content: ManualContent, fallbackTitle: string): Promise<string> {
  const assets = await loadAssets();
  const pages = Array.isArray(content.pages) ? content.pages : [];
  const title = content.meta?.title?.trim() || fallbackTitle.trim() || "Manual";
  const subtitle = content.meta?.subtitle?.trim() || "";
  const slides = await Promise.all(pages.map((page, index) => renderSlide(page, index, pages.length, assets)));
  const jump = pages
    .map((page, index) => {
      const id = slideDomId(page, index);
      return `<li><a href="#${esc(id)}"><small>${esc(kindLabel(page))}</small> ${esc(page.title || "Sin título")}</a></li>`;
    })
    .join("");
  const brandMark = assets.logoDataUri
    ? `<img src="${assets.logoDataUri}" alt="" /><strong>${esc(assets.companyName)}</strong>`
    : `<strong>${esc(assets.companyName)}</strong>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <style>${EXPORT_CSS}</style>
</head>
<body>
  <div class="doc">
    <header class="doc-head">
      <div class="brand">${brandMark}</div>
      <p class="eyebrow">Manual publicado</p>
      <h1>${esc(title)}</h1>
      ${subtitle ? `<p class="sub">${esc(subtitle)}</p>` : ""}
      <p class="count">${pages.length} ${pages.length === 1 ? "lámina" : "láminas"} · solo lectura</p>
    </header>
    ${jump ? `<nav class="jump" aria-label="Láminas"><p>Láminas</p><ol>${jump}</ol></nav>` : ""}
    <main>${slides.join("\n")}</main>
    <p class="doc-foot">${esc(assets.companyName)} · documento de solo lectura</p>
  </div>
  <script type="application/json" id="manual-json">${embedJson(content)}</script>
</body>
</html>`;
}
