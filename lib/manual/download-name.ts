/** Nombre de archivo ASCII a partir del título, p. ej. operacion-del-molino-de-bolas-mb-240.html */
export function manualDownloadFilename(title: string): string {
  const slug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${slug || "manual"}.html`;
}
