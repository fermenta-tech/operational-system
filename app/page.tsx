import Link from "next/link";
import { redirect } from "next/navigation";
import { Desk } from "@/components/Desk";
import { getSession } from "@/lib/auth/session";
import { readPublicBrand } from "@/lib/workspace/store";

export const dynamic = "force-dynamic";

const ADMIN_MODULES = [
  {
    href: "/marca",
    title: "Marca",
    text: "Sube el logotipo y el nombre de la empresa. Se ven en todos los manuales.",
  },
  {
    href: "/usuarios",
    title: "Usuarios",
    text: "Crea cuentas, cambia contraseñas y elige administrador u operador.",
  },
  {
    href: "/manuals",
    title: "Manuales",
    text: "Trabaja borradores y publícalos invitando a quién puede verlos.",
  },
];

export default async function HomePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const brandInfo = await readPublicBrand();
  const modules =
    session.role === "admin"
      ? ADMIN_MODULES
      : [
          {
            href: "/manuals",
            title: "Manuales",
            text: "Aquí están los manuales publicados a los que te invitaron.",
          },
        ];

  return (
    <Desk
      session={session}
      brandInfo={brandInfo}
      title={session.role === "admin" ? "Módulos" : "Tu espacio"}
      lede={
        session.role === "admin"
          ? "Elige un módulo para continuar."
          : "Como operador ves los manuales publicados y nada más."
      }
    >
      <div className="desk-grid">
        {modules.map((item) => (
          <Link key={item.href} className="desk-card" href={item.href}>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </Link>
        ))}
      </div>
    </Desk>
  );
}
