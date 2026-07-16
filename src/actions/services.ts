"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// --- HELPER FUNCTION: Deletes image from the public folder ---
async function deleteImageFile(imageUrl: string | null) {
  // Only attempt to delete if it's an uploaded file
  if (!imageUrl || !imageUrl.startsWith("/uploads/")) return;
  
  try {
    const filePath = path.join(process.cwd(), "public", imageUrl);
    await fs.unlink(filePath);
    console.log(`Successfully deleted orphaned image: ${filePath}`);
  } catch (error) {
    console.error(`Failed to delete image ${imageUrl}:`, error);
  }
}

// 1. CREATE A SERVICE
export async function createService(data: {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  layout: string;
  subSectionTitle: string; 
  isActive: boolean;
}) {
  await prisma.service.create({
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      image: data.image,
      layout: data.layout,
      subSectionTitle: data.subSectionTitle, 
      isActive: data.isActive,
    },
  });

  revalidatePath("/services");
  revalidatePath("/admin/services");
}

// 2. UPDATE A SERVICE
export async function updateService(id: string, data: {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  layout: string;
  subSectionTitle: string; 
  isActive: boolean;
}) {
  // Find the existing service first to check if the main image changed
  const existingService = await prisma.service.findUnique({ where: { id } });

  // If the admin uploaded a NEW image, delete the OLD image from the server
  if (existingService && existingService.image !== data.image) {
    await deleteImageFile(existingService.image);
  }

  await prisma.service.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      image: data.image,
      layout: data.layout,
      subSectionTitle: data.subSectionTitle, 
      isActive: data.isActive,
    },
  });

  revalidatePath("/services");
  revalidatePath(`/admin/services/${id}`);
  revalidatePath("/admin/services");
}

// 3. DELETE A SERVICE (And all its sub-card images)
export async function deleteService(id: string) {
  // Find the service AND its sub-cards so we know which physical files to delete
  const service = await prisma.service.findUnique({ 
    where: { id },
    include: { subCards: true } // Fetch attached sub-cards
  });
  
  // Delete from PostgreSQL
  await prisma.service.delete({
    where: { id },
  });

  // Clean up all physical files
  if (service) {
    // 1. Delete main service image
    if (service.image) {
      await deleteImageFile(service.image);
    }
    // 2. Delete all attached sub-card images
    for (const card of service.subCards) {
      if (card.img) {
        await deleteImageFile(card.img);
      }
    }
  }

  revalidatePath("/services");
  revalidatePath("/admin/services");
}

// 4. ADD A SUB-CARD
export async function addSubCard(serviceId: string, data: { title: string; desc: string; img: string }) {
  await prisma.subCard.create({
    data: {
      title: data.title,
      desc: data.desc,
      img: data.img,
      serviceId: serviceId,
    },
  });

  revalidatePath(`/admin/services/${serviceId}`);
  revalidatePath("/services");
}

// 5. DELETE A SUB-CARD
export async function deleteSubCard(id: string, serviceId: string) {
  // Find the sub-card first to get its image URL
  const subCard = await prisma.subCard.findUnique({ where: { id } });

  // Delete from PostgreSQL
  await prisma.subCard.delete({
    where: { id },
  });

  // Delete the physical file
  if (subCard && subCard.img) {
    await deleteImageFile(subCard.img);
  }

  revalidatePath(`/admin/services/${serviceId}`);
  revalidatePath("/services");
}