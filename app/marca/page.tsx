import { redirect } from "next/navigation";
import { Desk } from "@/components/Desk";
import { MarcaForm } from "@/components/MarcaForm";
import { getSession } from "@/lib/auth/session";
import { readPublicBrand } from "@/lib/workspace/store";

export const dynamic = "force-dynamic";

export default async function MarcaPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/manuals");
  const brandInfo = await readPublicBrand();

  return (
    <Desk
      session={session}
      brandInfo={brandInfo}
      title="Marca"
      lede="El logotipo y el nombre se ven en la portada y en el menú de cada manual."
    >
      <MarcaForm initial={brandInfo} />
    </Desk>
  );
}
