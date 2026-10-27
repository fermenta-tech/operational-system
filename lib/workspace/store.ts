import { randomUUID } from "crypto";
import { mkdir, readFile, unlink, writeFile, access } from "fs/promises";
import path from "path";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { DEMO_USER_ID } from "@/lib/auth/demo-session";
import { brand } from "@/lib/brand";
import { demoAuth } from "@/lib/supabase/config";
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

const LOGO_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

let chain: Promise<unknown> = Promise.resolve();

function locked<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(fn, fn);
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function emptyWorkspace(): Workspace {
  return {
    brand: { companyName: brand.productName, logoMime: null, logoUpdatedAt: null },
    users: [],
    publications: {},
  };
}

function seedUser(input: {
  id: string;
  email: string;
  name: string;
  password: string;
}): StoredUser {
  return {
    id: input.id,
    email: input.email,
    name: input.name,
    role: "admin",
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
}

function toPublic(user: StoredUser): SessionUser {
  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

async function load(): Promise<Workspace> {
  await mkdir(DATA_DIR, { recursive: true });
  let workspace = emptyWorkspace();
  try {
    workspace = JSON.parse(await readFile(STORE_FILE, "utf8")) as Workspace;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") throw error;
  }

  if (!workspace.brand) workspace.brand = emptyWorkspace().brand;
  if (!Array.isArray(workspace.users)) workspace.users = [];
  if (!workspace.publications) workspace.publications = {};

  let changed = false;
  if (!workspace.users.some((user) => user.email === demoAuth.email)) {
    workspace.users.push(
      seedUser({
        id: DEMO_USER_ID,
        email: demoAuth.email,
        name: "Demo",
        password: demoAuth.password,
      }),
    );
    changed = true;
  }
  if (!workspace.users.some((user) => user.email === "carlos@example.com")) {
    workspace.users.push(
      seedUser({
        id: CARLOS_ID,
        email: "carlos@example.com",
        name: "Carlos",
        password: "Carlos123",
      }),
    );
    changed = true;
  }
  if (!workspace.brand.companyName?.trim()) {
    workspace.brand.companyName = brand.productName;
    changed = true;
  }
  if (changed) await writeFile(STORE_FILE, JSON.stringify(workspace, null, 2));
  return workspace;
}

async function save(workspace: Workspace): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(STORE_FILE, JSON.stringify(workspace, null, 2));
}

export async function readPublicBrand(): Promise<PublicBrand> {
  const workspace = await load();
  let logoUrl = "";
  if (workspace.brand.logoMime) {
    try {
      await access(LOGO_FILE);
      logoUrl = `/api/brand/logo?v=${encodeURIComponent(workspace.brand.logoUpdatedAt || "1")}`;
    } catch {
      logoUrl = "";
    }
  }
  return { companyName: workspace.brand.companyName, logoUrl };
}

export async function readLogo(): Promise<{ bytes: Buffer; mime: string } | null> {
  const workspace = await load();
  if (!workspace.brand.logoMime) return null;
  try {
    const bytes = await readFile(LOGO_FILE);
    return { bytes, mime: workspace.brand.logoMime };
  } catch {
    return null;
  }
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
    const workspace = await load();
    workspace.brand.companyName = companyName;
    if (input.removeLogo) {
      workspace.brand.logoMime = null;
      workspace.brand.logoUpdatedAt = null;
      await unlink(LOGO_FILE).catch(() => undefined);
    }
    if (input.logo) {
      await writeFile(LOGO_FILE, input.logo.bytes);
      workspace.brand.logoMime = input.logo.mime;
      workspace.brand.logoUpdatedAt = new Date().toISOString();
    }
    await save(workspace);
    return { ok: true as const, brand: await readPublicBrand() };
  });
}

export async function listUsers(): Promise<SessionUser[]> {
  const workspace = await load();
  return workspace.users
    .map(toPublic)
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const workspace = await load();
  const needle = email.trim().toLowerCase();
  return workspace.users.find((user) => user.email === needle) ?? null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  const workspace = await load();
  return workspace.users.find((user) => user.id === id) ?? null;
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
    const workspace = await load();
    if (workspace.users.some((user) => user.email === email)) {
      return { ok: false as const, error: "Ese correo ya tiene cuenta." };
    }
    const user: StoredUser = {
      id: randomUUID(),
      email,
      name,
      role: input.role,
      passwordHash: hashPassword(input.password),
      createdAt: new Date().toISOString(),
    };
    workspace.users.push(user);
    await save(workspace);
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
    const workspace = await load();
    const user = workspace.users.find((item) => item.id === id);
    if (!user) return { ok: false as const, error: "No está ese usuario." };
    if (patch.role && patch.role !== "admin" && user.role === "admin") {
      const admins = workspace.users.filter((item) => item.role === "admin");
      if (admins.length <= 1) {
        return { ok: false as const, error: "Tiene que quedar al menos un administrador." };
      }
    }
    if (patch.password) user.passwordHash = hashPassword(patch.password);
    if (patch.role) user.role = patch.role;
    await save(workspace);
    return { ok: true as const, user: toPublic(user) };
  });
}

export async function deleteUser(
  id: string,
  actorId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (id === actorId) return { ok: false, error: "No puedes quitar tu propia cuenta." };

  return locked(async () => {
    const workspace = await load();
    const user = workspace.users.find((item) => item.id === id);
    if (!user) return { ok: false as const, error: "No está ese usuario." };
    if (user.role === "admin") {
      const admins = workspace.users.filter((item) => item.role === "admin");
      if (admins.length <= 1) {
        return { ok: false as const, error: "Tiene que quedar al menos un administrador." };
      }
    }
    workspace.users = workspace.users.filter((item) => item.id !== id);
    for (const publication of Object.values(workspace.publications)) {
      publication.inviteeIds = publication.inviteeIds.filter((inviteeId) => inviteeId !== id);
    }
    await save(workspace);
    return { ok: true as const };
  });
}

export async function getPublication(manualId: string): Promise<ManualPublication> {
  const workspace = await load();
  return workspace.publications[manualId] ?? { status: "draft", inviteeIds: [] };
}

export async function listPublications(): Promise<Record<string, ManualPublication>> {
  const workspace = await load();
  return workspace.publications;
}

export async function setPublication(
  manualId: string,
  publication: ManualPublication,
): Promise<void> {
  await locked(async () => {
    const workspace = await load();
    workspace.publications[manualId] = {
      status: publication.status,
      inviteeIds: [...new Set(publication.inviteeIds)],
    };
    await save(workspace);
  });
}
