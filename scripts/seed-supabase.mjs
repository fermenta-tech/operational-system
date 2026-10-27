#!/usr/bin/env node
/**
 * Seed remoto: usuario demo + manual REDUCTION CIRCUIT.
 * Requiere tabla public.manuals (ejecutar supabase/migrations/001_manuals.sql en el dashboard).
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function fallbackFromConfig(name) {
  const src = fs.readFileSync(path.join(root, "lib/supabase/config.ts"), "utf8");
  const match = src.match(new RegExp(`const ${name} =\\s*\\n\\s*"([^"]+)"`));
  if (!match) throw new Error(`No está ${name} en lib/supabase/config.ts`);
  return match[1];
}

const supabaseConfig = {
  url: process.env.SUPABASE_URL || "https://xyuhembqovjwivtzxaqm.supabase.co",
  secretKey: process.env.SUPABASE_SERVICE_ROLE_KEY || fallbackFromConfig("serviceRoleKey"),
};

const demoAuth = {
  email: "demo@demo.com",
  password: "demo123",
};

const EXAMPLE_MANUAL_ID = "m-reduction-circuit-example";
const MANUAL_CONTENT_VER = 7;

function loadReductionSlides() {
  const contentPath = path.join(root, "ejemplos/manual-interactivo/content.js");
  const code = fs.readFileSync(contentPath, "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`${code}\n;globalThis.__slides = REDUCTION_SLIDES;`, sandbox, {
    filename: contentPath,
  });
  const slides = sandbox.__slides;
  if (!Array.isArray(slides) || !slides.length) {
    throw new Error("REDUCTION_SLIDES vacío o no encontrado en content.js");
  }
  return slides;
}

async function ensureDemoUser(admin) {
  const { data: list, error: listErr } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (listErr) throw listErr;
  const existing = list.users.find((u) => u.email === demoAuth.email);
  if (existing) {
    console.log(`Usuario demo ya existe: ${demoAuth.email} (${existing.id})`);
    return existing.id;
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: demoAuth.email,
    password: demoAuth.password,
    email_confirm: true,
  });
  if (error) throw error;
  console.log(`Usuario demo creado: ${demoAuth.email} (${data.user.id})`);
  return data.user.id;
}

async function main() {
  const admin = createClient(supabaseConfig.url, supabaseConfig.secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  await ensureDemoUser(admin);

  const { error: probeErr } = await admin.from("manuals").select("id").limit(1);
  if (probeErr) {
    console.error("\n❌ Tabla public.manuals no accesible:", probeErr.message);
    console.error(
      "Ejecuta el SQL en Supabase Dashboard → SQL Editor:\n",
      path.join(root, "supabase/migrations/001_manuals.sql"),
    );
    console.error("Luego vuelve a ejecutar: npm run seed:supabase");
    process.exit(1);
  }

  const pages = loadReductionSlides();
  const now = new Date().toISOString();
  const content = {
    ver: MANUAL_CONTENT_VER,
    meta: {
      title: "REDUCTION CIRCUIT",
      subtitle: "Complete source manual",
      createdAt: now,
      updatedAt: now,
    },
    pages,
  };

  const { error: upsertErr } = await admin.from("manuals").upsert(
    {
      id: EXAMPLE_MANUAL_ID,
      title: content.meta.title,
      subtitle: content.meta.subtitle,
      kind: "example",
      owner_id: null,
      content,
      updated_at: now,
    },
    { onConflict: "id" },
  );

  if (upsertErr) {
    console.error("❌ Error al sembrar manual de ejemplo:", upsertErr.message);
    process.exit(1);
  }

  console.log(
    `✅ Manual de ejemplo sembrado: ${EXAMPLE_MANUAL_ID} (${pages.length} slides)`,
  );
  console.log(`   API pública: GET /api/manuals/public/example`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
