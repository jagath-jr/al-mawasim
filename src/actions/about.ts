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
      console.log(`Successfully deleted Cloudinary about image: ${publicId}`);
    }
  } catch (error) {
    console.error(`Failed to delete image ${imageUrl}:`, error);
  }
}

export async function getAboutSettings() {
  let settings = await prisma.aboutSettings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.aboutSettings.create({ data: { id: "default" } });
  }
  return settings;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateAboutSettings(data: any) {
  const existing = await prisma.aboutSettings.findUnique({ where: { id: "default" } });

  // If the admin uploaded NEW images, delete the OLD ones from Cloudinary
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