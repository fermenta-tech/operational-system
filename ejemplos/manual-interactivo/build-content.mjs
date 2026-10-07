import { readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { CHAPTER_REVIEWS } from "./chapter-reviews.mjs";

const [, , htmlPath, outputPath = "content.js"] = process.argv;

if (!htmlPath) {
  throw new Error("Usage: node build-content.mjs <manual.html> [content.js]");
}

const html = readFileSync(resolve(htmlPath), "utf8")
  .replaceAll('src="images/', 'src="../../manual/images/')
  .replace(/<table>[\s\S]*?<\/table>/gi, (table) => {
    const visibleText = table
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;|&#160;/gi, "")
      .trim();
    return visibleText ? table : "";
  })
  .replace(/<p>\s*`\s*<\/p>/gi, "");

const headings = [...html.matchAll(/<h([12])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/gi)];
const cleanText = (value) => value
  .replace(/<[^>]+>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/\s+/g, " ")
  .trim();
const slug = (value, index) => {
  const normalized = cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || `section-${index + 1}`;
};
const leadFrom = (body) => {
  const paragraph = body.match(/<p>([\s\S]*?)<\/p>/i);
  if (!paragraph) return "";
  const text = cleanText(paragraph[1]);
  return text.length > 220 ? `${text.slice(0, 217).trim()}…` : text;
};
const anchorBefore = (heading) => {
  const precedingHtml = html.slice(Math.max(0, heading.index - 240), heading.index);
  const anchors = [...precedingHtml.matchAll(/<a\s+id="([^"]+)"[^>]*><\/a>/gi)];
  return anchors.at(-1)?.[1] || "";
};
const headingMeta = headings.map((heading, index) => ({
  heading,
  index,
  level: Number(heading[1]),
  title: cleanText(heading[2]),
  anchor: anchorBefore(heading)
}));
const subsectionMarkers = (body) => [
  ...body.matchAll(/<ol(?:\s+start="\d+")?>\s*<li>(?:<p>)?((?:(?!<(?:ol|ul|li)\b)[\s\S]){3,220}?)(?:<\/p>)?<\/li>\s*<\/ol>/gi)
];

const pages = [];

pages.push({
  id: "t01",
  chapter: "Start",
  group: "Start",
  title: "REDUCTION CIRCUIT",
  kicker: "Complete source manual",
  lead: "All chapters, subchapters, data sheets, procedures and original figures in one interactive manual.",
  audio: "",
  quiz: [],
  blocks: [{
    type: "manual-html",
    html: `
      <div class="cover-hero">
        <div class="cover-brand">
          <img src="../../manual/images/image1.png" alt="Tenova HYL">
          <span>Plant operation · Training manual</span>
        </div>
        <div class="cover-eyebrow">BAOSTEEL ENERGIRON ZR DR PLANT</div>
        <div class="cover-equipment">
          <div><strong>RE-621-D</strong><span>Reduction reactor</span></div>
          <div><strong>PG-601-B</strong><span>Process gas heater</span></div>
          <div><strong>PG-671-J</strong><span>Recycle compressor</span></div>
        </div>
        <div class="cover-start">Use <strong>Next</strong> or select a chapter from the navigation.</div>
        <details class="cover-notice">
          <summary>Confidentiality notice</summary>
          <p>This document contains confidential and proprietary information of TENOVA S.p.A. Total or partial reproduction or disclosure without specific written authorization is prohibited.</p>
        </details>
      </div>`
  }]
});

let currentChapter = "Manual";
headingMeta.forEach(({ heading, index, level, title, anchor }) => {
  if (level === 1) currentChapter = title;

  const contentStart = heading.index + heading[0].length;
  const contentEnd = headings[index + 1]?.index ?? html.length;
  let body = html.slice(contentStart, contentEnd).trim();
  const pageId = `manual-${index + 1}-${slug(title, index)}`;
  const pageGroup = level === 1 ? currentChapter : title;

  if (title === "TABLE OF CONTENTS") {
    const links = headingMeta
      .filter(item => item.anchor && item.title !== title)
      .map(item => `
        <a class="toc-card" href="#${item.anchor}">
          <span>${item.level === 1 ? "Chapter" : "Subchapter"}</span>
          <strong>${item.title}</strong>
          <i>Open →</i>
        </a>`)
      .join("");
    body = `<div class="toc-grid">${links}</div>`;
  }

  const markers = body.length > 16000 ? subsectionMarkers(body) : [];
  if (markers.length >= 4) {
    const intro = body.slice(0, markers[0].index).trim();
    const children = markers.map((marker, markerIndex) => {
      const childTitle = cleanText(marker[1]);
      const childAnchor = `${anchor || slug(title, index)}-part-${markerIndex + 1}`;
      const childId = `${pageId}-part-${markerIndex + 1}`;
      const segmentStart = marker.index + marker[0].length;
      const segmentEnd = markers[markerIndex + 1]?.index ?? body.length;
      return {
        title: childTitle,
        anchor: childAnchor,
        id: childId,
        body: body.slice(segmentStart, segmentEnd).trim()
      };
    });
    const directory = children.map(child => `
      <a class="section-card" href="#${child.anchor}">
        <strong>${child.title}</strong>
        <span>Open subsection →</span>
      </a>`).join("");

    pages.push({
      id: pageId,
      chapter: currentChapter,
      group: pageGroup,
      title,
      anchor,
      kicker: level === 1 ? "Chapter" : `Subchapter · ${currentChapter}`,
      lead: `${children.length} focused subsections. Select a topic to continue.`,
      audio: "",
      quiz: [],
      blocks: [{
        type: "manual-html",
        html: `${intro}<div class="section-directory">${directory}</div>`
      }]
    });

    children.forEach(child => pages.push({
      id: child.id,
      chapter: currentChapter,
      group: pageGroup,
      title: child.title,
      anchor: child.anchor,
      kicker: title,
      lead: leadFrom(child.body),
      audio: "",
      quiz: [],
      blocks: [{ type: "manual-html", html: child.body }]
    }));
    return;
  }

  pages.push({
      id: pageId,
      chapter: currentChapter,
      group: pageGroup,
      title,
      anchor,
      kicker: level === 1 ? "Chapter" : `Subchapter · ${currentChapter}`,
      lead: leadFrom(body),
      audio: "",
      quiz: [],
      blocks: [{ type: "manual-html", html: body }]
    });
});

const pagesWithReviews = [];
pages.forEach((page, index) => {
  pagesWithReviews.push(page);
  const nextChapter = pages[index + 1]?.chapter;
  const review = CHAPTER_REVIEWS[page.chapter];
  if (!review || nextChapter === page.chapter) return;

  const reviewId = `review-${slug(page.chapter, index)}`;
  pagesWithReviews.push({
    id: reviewId,
    chapter: page.chapter,
    group: `${page.chapter} · Summary`,
    title: "Chapter summary & knowledge check",
    kicker: `${page.chapter} · Review`,
    lead: "Choose English or Español, listen to the robot, then complete the multiple-choice questions.",
    summary: review.summary,
    audio: review.summary.en,
    quiz: review.questions.map(([q, qEs, options, optionsEs, a]) => ({
      q,
      qEs,
      options,
      optionsEs,
      a,
      why: `The correct answer is “${options[a]}”.`,
      whyEs: `La respuesta correcta es “${optionsEs[a]}”.`
    })),
    blocks: []
  });
});

const source = [
  "// Generated from manual/index.md. Run the command documented in README.md to rebuild.",
  `const REDUCTION_SLIDES = ${JSON.stringify(pagesWithReviews, null, 2)};`,
  ""
].join("\n");

writeFileSync(resolve(outputPath), source);
console.log(`Generated ${pagesWithReviews.length} pages in ${basename(outputPath)} from ${basename(htmlPath)}.`);
