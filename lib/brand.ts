/**
 * Identidad de la instalación.
 * Nombre, logo y color primario se pueden cambiar aquí.
 * El login solo usa el nombre, el logo (si existe) y el color del botón.
 */
export const brand = {
  productName: "Operational System",
  logoUrl: "",
  primary: "#c45c26",
} as const;

/** Texto legible sobre el color primario, claro u oscuro. */
export function onPrimary(hex: string): "#1f1f1f" | "#ffffff" {
  const raw = hex.trim().replace("#", "");
  const full =
    raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return "#ffffff";
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.62 ? "#1f1f1f" : "#ffffff";
}
