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
      console.log(`Successfully deleted Cloudinary project image: ${publicId}`);
    }
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
  
  // If the admin uploaded a NEW image, delete the OLD image from Cloudinary
  if (existingProject && existingProject.image !== data.image) {
    await deleteImageFile(existingProject.image);
  }

  await prisma.clientProject.update({ where: { id }, data });
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const project = await prisma.clientProject.findUnique({ where: { id } });
  
  // Delete from PostgreSQL
  await prisma.clientProject.delete({ where: { id } });

  // Delete the file from Cloudinary
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