import { redirect } from "next/navigation";
import { Desk } from "@/components/Desk";
import { ManualsScreen } from "@/components/ManualsScreen";
import { getSession } from "@/lib/auth/session";
import { readPublicBrand } from "@/lib/workspace/store";

export const dynamic = "force-dynamic";

export default async function ManualsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  const brandInfo = await readPublicBrand();

  return (
    <Desk
      session={session}
      brandInfo={brandInfo}
      title="Manuales"
      lede={
        session.role === "admin"
          ? "Un borrador lo ves tú. Al publicarlo, invitas a las personas que pueden abrirlo."
          : "Solo ves los manuales publicados a los que te invitaron."
      }
    >
      <ManualsScreen session={session} />
    </Desk>
  );
}
