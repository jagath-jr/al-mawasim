import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditGalleryForm from "./EditGalleryForm";

export default async function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const image = await prisma.project.findUnique({ where: { id } });

  if (!image) notFound();

  return <EditGalleryForm project={image} />;
}