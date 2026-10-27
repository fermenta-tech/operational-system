import { randomUUID } from "crypto";
import { readFile } from "fs/promises";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { DEMO_USER_ID } from "@/lib/auth/demo-session";
import { brand } from "@/lib/brand";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { demoAuth, supabaseConfig } from "@/lib/supabase/config";
import type { ManualPublication, PublicBrand, Role, SessionUser } from "@/lib/workspace/types";

const CARLOS_ID = "00000000-0000-4000-8000-0000000000c1";
const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "workspace.json");
const LOGO_FILE = path.join(DATA_DIR, "brand-logo");

type StoredUser = SessionUser & {
  passwordHash: string;
  createdAt: string;
};

type Workspace = {
  brand: {
    companyName: string;
    logoMime: string | null;
    logoUpdatedAt: string | null;
  };
  users: StoredUser[];
  publications: Record<string, ManualPublication>;
};

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: Role;
  password_hash: string;
};

const LOGO_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

let chain: Promise<unknown> = Promise.resolve();
let ready: Promise<void> | null = null;
let dbPromise: Promise<SupabaseClient> | null = null;

function keyRejected(error: { message?: string } | null): boolean {
  if (!error?.message) return false;
  const message = error.message.toLowerCase();
  return message.includes("api key") || message.includes("unregistered") || message.includes("invalid jwt");
}

/** La clave secreta de config a veces no está registrada. Si falla, la publishable (anon) escribe vía las políticas de estas tablas. */
function workspaceDb(): Promise<SupabaseClient> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const admin = createSupabaseAdminClient();
      const probe = await admin.from("workspace_users").select("id").limit(1);
      if (!keyRejected(probe.error)) return admin;
      return createClient(supabaseConfig.url, supabaseConfig.publishableKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
    })().catch((error) => {
      dbPromise = null;
      throw error;
    });
  }
  return dbPromise;
}

function locked<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(fn, fn);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function fail(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}

function toStored(row: UserRow): StoredUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    passwordHash: row.password_hash,
    createdAt: "",
  };
}

function toPublic(user: StoredUser): SessionUser {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

async function readLocalWorkspace(): Promise<Workspace | null> {
  try {
    const parsed = JSON.parse(await readFile(STORE_FILE, "utf8")) as Workspace;
    if (!parsed || typeof parsed !== "object") return null;
    if (!parsed.brand) {
      parsed.brand = { companyName: brand.productName, logoMime: null, logoUpdatedAt: null };
    }
    if (!Array.isArray(parsed.users)) parsed.users = [];
    if (!parsed.publications) parsed.publications = {};
    return parsed;
  } catch {
    return null;
  }
}

async function readLocalLogo(): Promise<Buffer | null> {
  try {
    return await readFile(LOGO_FILE);
  } catch {
    return null;
  }
}

function ensureReady(): Promise<void> {
  if (!ready) {
    ready = seedWorkspace().catch((error) => {
      ready = null;
      throw error;
    });
  }
  return ready;
}

async function seedWorkspace(): Promise<void> {
  const supabase = await workspaceDb();
  const local = await readLocalWorkspace();
  const localByEmail = new Map(
    (local?.users ?? []).map((user) => [user.email.trim().toLowerCase(), user]),
  );

  const { data: existing, error: listError } = await supabase.from("workspace_users").select("email");
  fail(listError);
  const have = new Set((existing ?? []).map((row: { email: string }) => row.email.trim().toLowerCase()));

  const planned: UserRow[] = [];
  const pushUser = (row: UserRow) => {
    const email = row.email.trim().toLowerCase();
    if (have.has(email) || planned.some((item) => item.email === email)) return;
    planned.push({ ...row, email });
  };

  const carlosFile = localByEmail.get("carlos@example.com");
  pushUser({
    id: carlosFile?.id || CARLOS_ID,
    email: "carlos@example.com",
    name: carlosFile?.name || "Carlos Dominguez",
    role: "admin",
    password_hash: carlosFile?.passwordHash || hashPassword("Carlos123"),
  });

  const demoFile = localByEmail.get(demoAuth.email);
  pushUser({
    id: demoFile?.id || DEMO_USER_ID,
    email: demoAuth.email,
    name: demoFile?.name || "Demo",
    role: "admin",
    password_hash: demoFile?.passwordHash || hashPassword(demoAuth.password),
  });

  for (const user of local?.users ?? []) {
    const email = user.email?.trim().toLowerCase();
    if (!email || !user.id || !user.name || !user.passwordHash) continue;
    if (user.role !== "admin" && user.role !== "operator") continue;
    pushUser({
      id: user.id,
      email,
      name: user.name,
      role: user.role,
      password_hash: user.passwordHash,
    });
  }

  if (planned.length) {
    const { error } = await supabase.from("workspace_users").insert(planned);
    fail(error);
  }

  if (local?.publications) {
    const { data: pubs, error: pubError } = await supabase
      .from("manual_publications")
      .select("manual_id");
    fail(pubError);
    const havePubs = new Set((pubs ?? []).map((row: { manual_id: string }) => row.manual_id));
    const rows = Object.entries(local.publications)
      .filter(([manualId, publication]) => {
        return (
          Boolean(manualId) &&
          !havePubs.has(manualId) &&
          (publication?.status === "draft" || publication?.status === "published")
        );
      })
      .map(([manualId, publication]) => ({
        manual_id: manualId,
        status: publication.status,
        invitee_ids: [...new Set(publication.inviteeIds ?? [])],
      }));
    if (rows.length) {
      const { error } = await supabase.from("manual_publications").insert(rows);
      fail(error);
    }
  }

  const { data: brandRow, error: brandError } = await supabase
    .from("workspace_brand")
    .select("id, logo_base64")
    .eq("id", 1)
    .maybeSingle();
  fail(brandError);

  let logoBase64: string | null = null;
  let logoMime: string | null = null;
  if (!brandRow?.logo_base64) {
    const bytes = await readLocalLogo();
    if (bytes) {
      logoBase64 = bytes.toString("base64");
      logoMime = local?.brand?.logoMime || "image/jpeg";
    }
  }

  if (!brandRow) {
    const { error } = await supabase.from("workspace_brand").insert({
      id: 1,
      company_name: local?.brand?.companyName?.trim() || brand.productName,
      logo_base64: logoBase64,
      logo_mime: logoMime,
    });
    fail(error);
  } else if (logoBase64) {
    const { error } = await supabase
      .from("workspace_brand")
      .update({ logo_base64: logoBase64, logo_mime: logoMime })
      .eq("id", 1);
    fail(error);
  }
}

export async function readPublicBrand(): Promise<PublicBrand> {
  await ensureReady();
  const supabase = await workspaceDb();
  const { data, error } = await supabase
    .from("workspace_brand")
    .select("company_name, logo_mime, logo_base64")
    .eq("id", 1)
    .maybeSingle();
  fail(error);
  const companyName = data?.company_name?.trim() || brand.productName;
  const logoUrl =
    data?.logo_mime && data?.logo_base64
      ? `/api/brand/logo?v=${data.logo_base64.length}`
      : "";
  return { companyName, logoUrl };
}

export async function readLogo(): Promise<{ bytes: Buffer; mime: string } | null> {
  await ensureReady();
  const supabase = await workspaceDb();
  const { data, error } = await supabase
    .from("workspace_brand")
    .select("logo_base64, logo_mime")
    .eq("id", 1)
    .maybeSingle();
  fail(error);
  if (!data?.logo_base64 || !data.logo_mime) return null;
  return { bytes: Buffer.from(data.logo_base64, "base64"), mime: data.logo_mime };
}

export async function saveBrand(input: {
  companyName: string;
  logo?: { bytes: Buffer; mime: string } | null;
  removeLogo?: boolean;
}): Promise<{ ok: true; brand: PublicBrand } | { ok: false; error: string }> {
  const companyName = input.companyName.trim().slice(0, 80);
  if (!companyName) return { ok: false, error: "Escribe el nombre de la empresa." };
  if (input.logo && !LOGO_TYPES.has(input.logo.mime)) {
    return { ok: false, error: "El logotipo debe ser PNG, JPG, WEBP o GIF." };
  }
  if (input.logo && input.logo.bytes.length > 1_500_000) {
    return { ok: false, error: "El logotipo pesa más de 1.5 MB." };
  }

  return locked(async () => {
    await ensureReady();
    const supabase = await workspaceDb();
    const patch: { company_name: string; logo_base64?: string | null; logo_mime?: string | null } = {
      company_name: companyName,
    };
    if (input.removeLogo) {
      patch.logo_base64 = null;
      patch.logo_mime = null;
    }
    if (input.logo) {
      patch.logo_base64 = input.logo.bytes.toString("base64");
      patch.logo_mime = input.logo.mime;
    }
    const { error } = await supabase.from("workspace_brand").update(patch).eq("id", 1);
    fail(error);
    return { ok: true as const, brand: await readPublicBrand() };
  });
}

export async function listUsers(): Promise<SessionUser[]> {
  await ensureReady();
  const supabase = await workspaceDb();
  const { data, error } = await supabase.from("workspace_users").select("id, email, name, role");
  fail(error);
  return (data ?? [])
    .map((row) => ({
      id: row.id as string,
      email: row.email as string,
      name: row.name as string,
      role: row.role as Role,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  await ensureReady();
  const supabase = await workspaceDb();
  const needle = email.trim().toLowerCase();
  const { data, error } = await supabase
    .from("workspace_users")
    .select("id, email, name, role, password_hash")
    .eq("email", needle)
    .maybeSingle();
  fail(error);
  return data ? toStored(data as UserRow) : null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  await ensureReady();
  const supabase = await workspaceDb();
  const { data, error } = await supabase
    .from("workspace_users")
    .select("id, email, name, role, password_hash")
    .eq("id", id)
    .maybeSingle();
  fail(error);
  return data ? toStored(data as UserRow) : null;
}

export async function authenticate(email: string, password: string): Promise<SessionUser | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;
  return toPublic(user);
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role: Role;
}): Promise<{ ok: true; user: SessionUser } | { ok: false; error: string }> {
  const name = input.name.trim().slice(0, 80);
  const email = input.email.trim().toLowerCase();
  if (!name) return { ok: false, error: "Escribe el nombre." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Escribe un correo válido." };
  }
  if (input.password.length < 6) return { ok: false, error: "La contraseña necesita al menos 6 caracteres." };
  if (input.role !== "admin" && input.role !== "operator") {
    return { ok: false, error: "Elige un rol." };
  }

  return locked(async () => {
    await ensureReady();
    const supabase = await workspaceDb();
    const { data: existing, error: existingError } = await supabase
      .from("workspace_users")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    fail(existingError);
    if (existing) return { ok: false as const, error: "Ese correo ya tiene cuenta." };

    const user: StoredUser = {
      id: randomUUID(),
      email,
      name,
      role: input.role,
      passwordHash: hashPassword(input.password),
      createdAt: new Date().toISOString(),
    };
    const { error } = await supabase.from("workspace_users").insert({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      password_hash: user.passwordHash,
    });
    if (error?.code === "23505") return { ok: false as const, error: "Ese correo ya tiene cuenta." };
    fail(error);
    return { ok: true as const, user: toPublic(user) };
  });
}

export async function updateUser(
  id: string,
  patch: { password?: string; role?: Role },
): Promise<{ ok: true; user: SessionUser } | { ok: false; error: string }> {
  if (patch.password != null && patch.password.length < 6) {
    return { ok: false, error: "La contraseña necesita al menos 6 caracteres." };
  }
  if (patch.role && patch.role !== "admin" && patch.role !== "operator") {
    return { ok: false, error: "Elige un rol." };
  }

  return locked(async () => {
    await ensureReady();
    const supabase = await workspaceDb();
    const { data: rows, error: listError } = await supabase
      .from("workspace_users")
      .select("id, email, name, role, password_hash");
    fail(listError);
    const users = (rows ?? []) as UserRow[];
    const user = users.find((item) => item.id === id);
    if (!user) return { ok: false as const, error: "No está ese usuario." };
    if (patch.role && patch.role !== "admin" && user.role === "admin") {
      const admins = users.filter((item) => item.role === "admin");
      if (admins.length <= 1) {
        return { ok: false as const, error: "Tiene que quedar al menos un administrador." };
      }
    }
    const next: { password_hash?: string; role?: Role } = {};
    if (patch.password) next.password_hash = hashPassword(patch.password);
    if (patch.role) next.role = patch.role;
    if (Object.keys(next).length) {
      const { error } = await supabase.from("workspace_users").update(next).eq("id", id);
      fail(error);
    }
    return {
      ok: true as const,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: patch.role ?? user.role,
      },
    };
  });
}

export async function deleteUser(
  id: string,
  actorId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (id === actorId) return { ok: false, error: "No puedes quitar tu propia cuenta." };

  return locked(async () => {
    await ensureReady();
    const supabase = await workspaceDb();
    const { data: rows, error: listError } = await supabase
      .from("workspace_users")
      .select("id, role");
    fail(listError);
    const users = (rows ?? []) as { id: string; role: Role }[];
    const user = users.find((item) => item.id === id);
    if (!user) return { ok: false as const, error: "No está ese usuario." };
    if (user.role === "admin") {
      const admins = users.filter((item) => item.role === "admin");
      if (admins.length <= 1) {
        return { ok: false as const, error: "Tiene que quedar al menos un administrador." };
      }
    }
    const { error } = await supabase.from("workspace_users").delete().eq("id", id);
    fail(error);

    const { data: pubs, error: pubError } = await supabase
      .from("manual_publications")
      .select("manual_id, invitee_ids");
    fail(pubError);
    for (const publication of pubs ?? []) {
      const inviteeIds = (publication.invitee_ids ?? []) as string[];
      if (!inviteeIds.includes(id)) continue;
      const { error: updateError } = await supabase
        .from("manual_publications")
        .update({ invitee_ids: inviteeIds.filter((inviteeId) => inviteeId !== id) })
        .eq("manual_id", publication.manual_id);
      fail(updateError);
    }
    return { ok: true as const };
  });
}

export async function getPublication(manualId: string): Promise<ManualPublication> {
  await ensureReady();
  const supabase = await workspaceDb();
  const { data, error } = await supabase
    .from("manual_publications")
    .select("status, invitee_ids")
    .eq("manual_id", manualId)
    .maybeSingle();
  fail(error);
  if (!data) return { status: "draft", inviteeIds: [] };
  return {
    status: data.status === "published" ? "published" : "draft",
    inviteeIds: (data.invitee_ids ?? []) as string[],
  };
}

export async function listPublications(): Promise<Record<string, ManualPublication>> {
  await ensureReady();
  const supabase = await workspaceDb();
  const { data, error } = await supabase
    .from("manual_publications")
    .select("manual_id, status, invitee_ids");
  fail(error);
  const publications: Record<string, ManualPublication> = {};
  for (const row of data ?? []) {
    publications[row.manual_id as string] = {
      status: row.status === "published" ? "published" : "draft",
      inviteeIds: (row.invitee_ids ?? []) as string[],
    };
  }
  return publications;
}

export async function setPublication(
  manualId: string,
  publication: ManualPublication,
): Promise<void> {
  await locked(async () => {
    await ensureReady();
    const supabase = await workspaceDb();
    const { error } = await supabase.from("manual_publications").upsert(
      {
        manual_id: manualId,
        status: publication.status,
        invitee_ids: [...new Set(publication.inviteeIds)],
      },
      { onConflict: "manual_id" },
    );
    fail(error);
  });
}
