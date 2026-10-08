import { promises as fs } from "node:fs";
import path from "node:path";

const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

export async function serveRepositoryFile(
  rootDirectory: string,
  segments: string[],
): Promise<Response> {
  const root = path.resolve(process.cwd(), rootDirectory);
  const requestedPath = path.resolve(root, ...segments);

  if (requestedPath !== root && !requestedPath.startsWith(`${root}${path.sep}`)) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const file = await fs.readFile(requestedPath);
    const extension = path.extname(requestedPath).toLowerCase();

    return new Response(file, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": CONTENT_TYPES[extension] ?? "application/octet-stream",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return new Response("Not Found", { status: 404 });
    }
    throw error;
  }
}
