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
    // Typical URL: https://res.cloudinary.com/cloud_name/image/upload/v1234567/folder/filename.jpg
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
      console.log(`Successfully deleted Cloudinary image: ${publicId}`);
    }
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

  // If the admin uploaded a NEW image, delete the OLD image from Cloudinary
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

  // Delete the file from Cloudinary
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