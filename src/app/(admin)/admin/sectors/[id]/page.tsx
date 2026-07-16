import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditSectorForm from "./EditSectorForm";

export default async function EditSectorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sector = await prisma.sector.findUnique({ where: { id } });
  if (!sector) notFound();
  return <EditSectorForm sector={sector} />;
}