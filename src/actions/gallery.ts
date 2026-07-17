"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using your .env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- HELPER FUNCTION: Upload File to Cloudinary (Exported so you can use it in form handlers) ---
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "almawasim" }, // Saves images inside a specific folder in Cloudinary
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url as string);
        }
      )
      .end(buffer);
  });
}

// --- HELPER FUNCTION: Deletes image from Cloudinary ---
async function deleteImageFile(imageUrl: string | null) {
  // Only attempt to delete if it's a valid Cloudinary URL
  if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) return;
  
  try {
    // Safely extract the public ID from the Cloudinary URL
    const urlParts = imageUrl.split("/upload/");
    if (urlParts.length === 2) {
      const afterUpload = urlParts[1];
      const pathParts = afterUpload.split("/");
      
      // Remove the version tag (e.g., 'v1234567') if it exists
      if (pathParts[0].startsWith("v")) {
        pathParts.shift();
      }
      
      const publicIdWithExtension = pathParts.join("/");
      // Remove the file extension (e.g., '.jpg' or '.png')
      const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf(".")) || publicIdWithExtension;

      await cloudinary.uploader.destroy(publicId);
      console.log(`Successfully deleted Cloudinary gallery image: ${publicId}`);
    }
  } catch (error) {
    console.error(`Failed to delete gallery image ${imageUrl}:`, error);
  }
}

export async function createGalleryImage(data: {
  title: string;
  category: string;
  imageUrl: string;
  isPublished: boolean;
}) {
  const currentCount = await prisma.project.count();
  if (currentCount >= 18) throw new Error("GALLERY_FULL");

  // Put new images at the end of the list automatically
  const lastProject = await prisma.project.findFirst({ orderBy: { order: 'desc' } });
  const newOrder = lastProject ? lastProject.order + 1 : 0;

  await prisma.project.create({
    data: { ...data, order: newOrder },
  });
  
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function updateGalleryImage(id: string, data: {
  title: string;
  category: string;
  imageUrl: string;
  isPublished: boolean;
}) {
  // Find the existing gallery image first
  const existingProject = await prisma.project.findUnique({ where: { id } });

  // If the admin uploaded a NEW image, delete the OLD image from Cloudinary
  if (existingProject && existingProject.imageUrl !== data.imageUrl) {
    await deleteImageFile(existingProject.imageUrl);
  }

  await prisma.project.update({
    where: { id },
    data,
  });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function deleteGalleryImage(id: string) {
  // Find the gallery image first so we know which physical file to delete
  const project = await prisma.project.findUnique({ where: { id } });
  
  // Delete from PostgreSQL
  await prisma.project.delete({ where: { id } });

  // Delete the file from Cloudinary
  if (project && project.imageUrl) {
    await deleteImageFile(project.imageUrl);
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

// Moves an image UP in the gallery (lower order number)
export async function moveImageUp(id: string) {
  const current = await prisma.project.findUnique({ where: { id } });
  if (!current) return;

  const above = await prisma.project.findFirst({
    where: { order: { lt: current.order } },
    orderBy: { order: 'desc' },
  });

  if (above) {
    await prisma.$transaction([
      prisma.project.update({ where: { id: current.id }, data: { order: above.order } }),
      prisma.project.update({ where: { id: above.id }, data: { order: current.order } }),
    ]);
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
  }
}

// Moves an image DOWN in the gallery (higher order number)
export async function moveImageDown(id: string) {
  const current = await prisma.project.findUnique({ where: { id } });
  if (!current) return;

  const below = await prisma.project.findFirst({
    where: { order: { gt: current.order } },
    orderBy: { order: 'asc' },
  });

  if (below) {
    await prisma.$transaction([
      prisma.project.update({ where: { id: current.id }, data: { order: below.order } }),
      prisma.project.update({ where: { id: below.id }, data: { order: current.order } }),
    ]);
    revalidatePath("/gallery");
    revalidatePath("/admin/gallery");
  }
}

// 🛠️ Fixes the database ordering by assigning proper sequential numbers
export async function fixImageOrdering() {
  // Fetch all images ordered by when they were created
  const allImages = await prisma.project.findMany({
    orderBy: { createdAt: 'asc' }
  });

  // Loop through and assign proper sequential numbers (0, 1, 2, 3...)
  for (let i = 0; i < allImages.length; i++) {
    await prisma.project.update({
      where: { id: allImages[i].id },
      data: { order: i }
    });
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}