import { cp, lstat, mkdir, rm, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "public");

// public/ejemplos and public/manual were symlinks to ../ejemplos and ../manual
// with a trailing newline, so realpath failed (ENOENT) and Next returned 404.
// A symlink that leaves public/ also breaks on Vercel. Publish real copies.
const assets = [
  ["ejemplos/manual-interactivo", "ejemplos/manual-interactivo"],
  ["manual", "manual"],
  ["robot.png", "robot.png"],
  ["robot.png", "manual-asset/robot.png"],
];

function shouldCopy(source) {
  const relative = path.relative(projectRoot, source);
  const parts = relative.split(path.sep);
  return !parts.includes("node_modules") && !parts.includes("data");
}

async function removePath(target) {
  let info;
  try {
    info = await lstat(target);
  } catch (error) {
    if (error?.code === "ENOENT") return;
    throw error;
  }
  if (info.isSymbolicLink()) {
    await unlink(target);
    return;
  }
  await rm(target, { recursive: true, force: true });
}

for (const [sourceRel, destinationRel] of assets) {
  const source = path.join(projectRoot, sourceRel);
  const destination = path.join(publicRoot, destinationRel);
  const top = path.join(publicRoot, destinationRel.split("/")[0]);
  if (top !== destination) await removePath(top);
  await removePath(destination);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, { recursive: true, filter: shouldCopy });
}
