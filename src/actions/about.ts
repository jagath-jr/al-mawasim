"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

async function deleteImageFile(imageUrl: string | null) {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;
  try {
    const filePath = path.join(process.cwd(), "public", imageUrl);
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete image:`, error);
  }
}

export async function getAboutSettings() {
  let settings = await prisma.aboutSettings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.aboutSettings.create({ data: { id: "default" } });
  }
  return settings;
}

export async function updateAboutSettings(data: any) {
  const existing = await prisma.aboutSettings.findUnique({ where: { id: "default" } });

  if (existing) {
    if (existing.heroImage !== data.heroImage) await deleteImageFile(existing.heroImage);
    if (existing.gridImage1 !== data.gridImage1) await deleteImageFile(existing.gridImage1);
    if (existing.gridImage2 !== data.gridImage2) await deleteImageFile(existing.gridImage2);
    if (existing.servicesImage !== data.servicesImage) await deleteImageFile(existing.servicesImage);
  }

  await prisma.aboutSettings.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });

  revalidatePath("/about");
  revalidatePath("/admin/about");
}