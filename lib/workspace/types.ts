export type Role = "admin" | "operator";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type PublicBrand = {
  companyName: string;
  logoUrl: string;
};

export type ManualPublication = {
  status: "draft" | "published";
  inviteeIds: string[];
};

export function roleLabel(role: Role): string {
  return role === "admin" ? "Administrador" : "Operador";
}
