import { serveRepositoryFile } from "@/lib/static-content";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { path } = await params;
  return serveRepositoryFile("ejemplos/manual-interactivo", path);
}
