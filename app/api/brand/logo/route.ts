import { NextResponse } from "next/server";
import { readLogo } from "@/lib/workspace/store";

export async function GET() {
  const logo = await readLogo();
  if (!logo) return new NextResponse(null, { status: 404 });
  return new NextResponse(new Uint8Array(logo.bytes), {
    headers: {
      "Content-Type": logo.mime,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
