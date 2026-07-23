"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// --- HELPER: Delete Image ---
async function deleteImageFile(imageUrl: string | null) {
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;
  try {
    const filePath = path.join(process.cwd(), "public", imageUrl);
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete image:`, error);
  }
}

// --- 1. HOME SETTINGS ACTIONS ---
export async function getHomeSettings() {
  const settings = await prisma.homeSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });
  return settings;
}

export async function updateHomeSettings(data: any) {
  const existing = await prisma.homeSettings.findUnique({ where: { id: "default" } });

  if (existing) {
    if (existing.heroImage !== data.heroImage) await deleteImageFile(existing.heroImage);
    if (existing.aboutImage1 !== data.aboutImage1) await deleteImageFile(existing.aboutImage1);
    if (existing.aboutImage2 !== data.aboutImage2) await deleteImageFile(existing.aboutImage2);
  }

  await prisma.homeSettings.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });

  revalidatePath("/");
  revalidatePath("/admin/home");
}

// --- 2. CLIENT LOGOS ACTIONS ---
export async function getClientLogos() {
  return await prisma.clientLogo.findMany({ orderBy: { order: 'asc' } });
}

export async function addClientLogo(data: { name: string; image: string }) {
  const lastLogo = await prisma.clientLogo.findFirst({ orderBy: { order: 'desc' } });
  const newOrder = lastLogo ? lastLogo.order + 1 : 0;

  await prisma.clientLogo.create({ data: { ...data, order: newOrder } });
  revalidatePath("/");
  revalidatePath("/admin/home");
}

export async function deleteClientLogo(id: string) {
  const logo = await prisma.clientLogo.findUnique({ where: { id } });
  await prisma.clientLogo.delete({ where: { id } });
  if (logo && logo.image) await deleteImageFile(logo.image);
  
  revalidatePath("/");
  revalidatePath("/admin/home");
}