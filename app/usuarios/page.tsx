import { redirect } from "next/navigation";
import { Desk } from "@/components/Desk";
import { UsersScreen } from "@/components/UsersScreen";
import { getSession } from "@/lib/auth/session";
import { readPublicBrand } from "@/lib/workspace/store";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/manuals");
  const brandInfo = await readPublicBrand();

  return (
    <Desk
      session={session}
      brandInfo={brandInfo}
      title="Usuarios"
      lede="El administrador entra a todo. El operador solo abre manuales ya publicados a los que lo invites."
    >
      <UsersScreen session={session} />
    </Desk>
  );
}
