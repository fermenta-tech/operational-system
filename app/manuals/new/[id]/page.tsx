import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditManualRedirect({ params }: Props) {
  const { id } = await params;
  redirect(`/manuals/view/${id}`);
}
