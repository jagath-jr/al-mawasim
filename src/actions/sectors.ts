"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// --- HELPER FUNCTION: Deletes image from the public folder ---
async function deleteImageFile(imageUrl: string | null) {
  // Only attempt to delete if it's an uploaded file (avoids deleting default seed images)
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;
  
  try {
    const filePath = path.join(process.cwd(), "public", imageUrl);
    await fs.unlink(filePath);
    console.log(`Successfully deleted orphaned image: ${filePath}`);
  } catch (error) {
    console.error(`Failed to delete image ${imageUrl}:`, error);
  }
}

// 1. CREATE
export async function createSector(data: { title: string; subtitle: string; description: string; image: string; isActive: boolean }) {
  const lastSector = await prisma.sector.findFirst({ orderBy: { order: 'desc' } });
  const newOrder = lastSector ? lastSector.order + 1 : 0;

  await prisma.sector.create({
    data: { ...data, order: newOrder },
  });
  
  revalidatePath("/sectors");
  revalidatePath("/admin/sectors");
}

// 2. UPDATE (With Old Image Deletion)
export async function updateSector(id: string, data: { title: string; subtitle: string; description: string; image: string; isActive: boolean }) {
  // Find the existing sector first to check if the image changed
  const existingSector = await prisma.sector.findUnique({ where: { id } });

  // If the admin uploaded a NEW image, delete the OLD image from the server
  if (existingSector && existingSector.image !== data.image) {
    await deleteImageFile(existingSector.image);
  }

  await prisma.sector.update({ where: { id }, data });
  
  revalidatePath("/sectors");
  revalidatePath("/admin/sectors");
}

// 3. DELETE (With Image Deletion)
export async function deleteSector(id: string) {
  // Find the sector first so we know which image to delete
  const sector = await prisma.sector.findUnique({ where: { id } });
  
  // Delete from PostgreSQL
  await prisma.sector.delete({ where: { id } });

  // Delete the physical file from the uploads folder
  if (sector && sector.image) {
    await deleteImageFile(sector.image);
  }
  
  revalidatePath("/sectors");
  revalidatePath("/admin/sectors");
}

// 4. MOVE UP
export async function moveSectorUp(id: string) {
  const current = await prisma.sector.findUnique({ where: { id } });
  if (!current) return;
  const above = await prisma.sector.findFirst({ where: { order: { lt: current.order } }, orderBy: { order: 'desc' } });
  if (above) {
    await prisma.$transaction([
      prisma.sector.update({ where: { id: current.id }, data: { order: above.order } }),
      prisma.sector.update({ where: { id: above.id }, data: { order: current.order } }),
    ]);
    revalidatePath("/sectors");
    revalidatePath("/admin/sectors");
  }
}

// 5. MOVE DOWN
export async function moveSectorDown(id: string) {
  const current = await prisma.sector.findUnique({ where: { id } });
  if (!current) return;
  const below = await prisma.sector.findFirst({ where: { order: { gt: current.order } }, orderBy: { order: 'asc' } });
  if (below) {
    await prisma.$transaction([
      prisma.sector.update({ where: { id: current.id }, data: { order: below.order } }),
      prisma.sector.update({ where: { id: below.id }, data: { order: current.order } }),
    ]);
    revalidatePath("/sectors");
    revalidatePath("/admin/sectors");
  }
}