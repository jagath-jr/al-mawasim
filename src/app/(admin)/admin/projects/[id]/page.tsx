import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProjectForm from "./EditProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.clientProject.findUnique({ where: { id } });
  if (!project) notFound();
  return <EditProjectForm project={project} />;
}