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

  // If the admin uploaded a NEW image, delete the OLD image from Cloudinary
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

  // Clean up all Cloudinary files
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

  // Delete the Cloudinary file
  if (subCard && subCard.img) {
    await deleteImageFile(subCard.img);
  }

  revalidatePath(`/admin/services/${serviceId}`);
  revalidatePath("/services");
}