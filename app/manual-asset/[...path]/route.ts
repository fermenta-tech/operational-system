import { serveRepositoryFile } from "@/lib/static-content";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { path } = await params;
  if (path.length !== 1 || path[0] !== "robot.png") {
    return new Response("Not Found", { status: 404 });
  }
  return serveRepositoryFile("robot.png", []);
}
