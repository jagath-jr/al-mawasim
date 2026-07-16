import { prisma } from "@/lib/prisma";
import ProjectsClient from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.clientProject.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return <ProjectsClient projects={projects} />;
}