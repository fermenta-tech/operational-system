import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, "..");
const publicRoot = path.join(projectRoot, "public");

const assets = [
  ["ejemplos/manual-interactivo", "ejemplos/manual-interactivo"],
  ["manual", "manual"],
];

for (const [source, destination] of assets) {
  const destinationRoot = path.join(publicRoot, destination.split("/")[0]);
  const destinationPath = path.join(publicRoot, destination);
  await rm(destinationRoot, { recursive: true, force: true });
  await mkdir(path.dirname(destinationPath), { recursive: true });
  await cp(path.join(projectRoot, source), destinationPath, { recursive: true });
}
