import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { readPublicBrand, saveBrand } from "@/lib/workspace/store";

export async function GET() {
  const brand = await readPublicBrand();
  return NextResponse.json(brand);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await request.formData();
  const companyName = String(form.get("companyName") ?? "");
  const removeLogo = form.get("removeLogo") === "1";
  const file = form.get("logo");

  let logo: { bytes: Buffer; mime: string } | null = null;
  if (file instanceof File && file.size > 0) {
    logo = { bytes: Buffer.from(await file.arrayBuffer()), mime: file.type || "application/octet-stream" };
  }

  const result = await saveBrand({ companyName, logo, removeLogo });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json(result.brand);
}
