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
      console.log(`Successfully deleted Cloudinary home image: ${publicId}`);
    }
  } catch (error) {
    console.error(`Failed to delete home image ${imageUrl}:`, error);
  }
}

// --- 1. HOME SETTINGS ACTIONS ---
export async function getHomeSettings() {
  let settings = await prisma.homeSettings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.homeSettings.create({ data: { id: "default" } });
  }
  return settings;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateHomeSettings(data: any) {
  const existing = await prisma.homeSettings.findUnique({ where: { id: "default" } });

  // If the admin uploaded NEW images, delete the OLD ones from Cloudinary
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
  
  // Delete from PostgreSQL
  await prisma.clientLogo.delete({ where: { id } });
  
  // Delete from Cloudinary
  if (logo && logo.image) {
    await deleteImageFile(logo.image);
  }
  
  revalidatePath("/");
  revalidatePath("/admin/home");
}