"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// --- HELPER FUNCTION: Deletes image from the public folder ---
async function deleteImageFile(imageUrl: string | null) {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;
  try {
    const filePath = path.join(process.cwd(), "public", imageUrl);
    await fs.unlink(filePath);
    console.log(`Successfully deleted orphaned project image: ${filePath}`);
  } catch (error) {
    console.error(`Failed to delete image ${imageUrl}:`, error);
  }
}

export async function createProject(data: { title: string; location: string; image: string; isActive: boolean }) {
  const lastProject = await prisma.clientProject.findFirst({ orderBy: { order: 'desc' } });
  const newOrder = lastProject ? lastProject.order + 1 : 0;

  await prisma.clientProject.create({
    data: { ...data, order: newOrder },
  });
  
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, data: { title: string; location: string; image: string; isActive: boolean }) {
  const existingProject = await prisma.clientProject.findUnique({ where: { id } });
  
  if (existingProject && existingProject.image !== data.image) {
    await deleteImageFile(existingProject.image);
  }

  await prisma.clientProject.update({ where: { id }, data });
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const project = await prisma.clientProject.findUnique({ where: { id } });
  await prisma.clientProject.delete({ where: { id } });

  if (project && project.image) {
    await deleteImageFile(project.image);
  }
  
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function moveProjectUp(id: string) {
  const current = await prisma.clientProject.findUnique({ where: { id } });
  if (!current) return;
  const above = await prisma.clientProject.findFirst({ where: { order: { lt: current.order } }, orderBy: { order: 'desc' } });
  if (above) {
    await prisma.$transaction([
      prisma.clientProject.update({ where: { id: current.id }, data: { order: above.order } }),
      prisma.clientProject.update({ where: { id: above.id }, data: { order: current.order } }),
    ]);
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  }
}

export async function moveProjectDown(id: string) {
  const current = await prisma.clientProject.findUnique({ where: { id } });
  if (!current) return;
  const below = await prisma.clientProject.findFirst({ where: { order: { gt: current.order } }, orderBy: { order: 'asc' } });
  if (below) {
    await prisma.$transaction([
      prisma.clientProject.update({ where: { id: current.id }, data: { order: below.order } }),
      prisma.clientProject.update({ where: { id: below.id }, data: { order: current.order } }),
    ]);
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  }
}