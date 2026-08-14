"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { google } from "googleapis";
import fs from "fs/promises";
import path from "path";

// --- HELPER: Delete local thumbnail image ---
async function deleteLocalFile(fileUrl: string | null) {
  if (!fileUrl || !fileUrl.startsWith("/uploads/")) return;
  try {
    const filePath = path.join(process.cwd(), "public", fileUrl);
    await fs.unlink(filePath);
    console.log(`Deleted local file: ${fileUrl}`);
  } catch (error) {
    console.error(`Failed to delete local file ${fileUrl}:`, error);
  }
}

// --- HELPER: Delete PDF from Google Drive ---
async function deleteFromGoogleDrive(pdfUrl: string) {
  try {
    // 1. Extract the file ID from the Google Drive URL using Regex
    // Example: https://drive.google.com/file/d/14EgjuDsk.../view -> 14EgjuDsk...
    const match = pdfUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!match || !match[1]) {
      console.log("Could not extract Google Drive File ID from URL.");
      return;
    }
    const fileId = match[1];

    // 2. Set up OAuth2 Client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // 3. Delete the file from Google Drive
    await drive.files.delete({ fileId });
    console.log(`Successfully deleted file ${fileId} from Google Drive.`);
    
  } catch (error: any) {
    // We catch the error so that if the file was already deleted manually in Google Drive, 
    // it doesn't crash the website and still deletes the database record.
    console.error("Failed to delete from Google Drive:", error?.message || error);
  }
}

// -----------------------------------------
// 1. CREATE CATALOG
// -----------------------------------------
export async function createCatalog(data: {
  title: string;
  description: string;
  pdfUrl: string;
  thumbnail: string;
  isActive: boolean;
}) {
  const catalogCount = await prisma.catalog.count();
  if (catalogCount >= 6) {
    throw new Error("Maximum limit of 6 catalogs reached. Please delete an existing catalog first.");
  }

  // Find the highest current order number so we can put the new one at the bottom
  const lastCatalog = await prisma.catalog.findFirst({
    orderBy: { order: 'desc' }
  });
  const nextOrder = lastCatalog ? lastCatalog.order + 1 : 0;

  await prisma.catalog.create({ 
    data: { ...data, order: nextOrder } 
  });
  
  revalidatePath("/catalog");
  revalidatePath("/admin/catalog");
}


// ADD THIS NEW FUNCTION TO THE BOTTOM OF THE FILE:
export async function moveCatalog(id: string, direction: 'up' | 'down') {
  // 1. Get all catalogs ordered by current order
  const catalogs = await prisma.catalog.findMany({ orderBy: { order: 'asc' } });
  
  // 2. Ensure they have sequential order numbers (fixes existing items that all have 0)
  const currentOrder = catalogs.map((c, index) => ({ ...c, order: index }));

  // 3. Find the item we want to move
  const currentIndex = currentOrder.findIndex(c => c.id === id);
  if (currentIndex === -1) return;

  // 4. Find the item we are swapping with
  const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  if (swapIndex < 0 || swapIndex >= currentOrder.length) return;

  // 5. Swap the order numbers
  const tempOrder = currentOrder[currentIndex].order;
  currentOrder[currentIndex].order = currentOrder[swapIndex].order;
  currentOrder[swapIndex].order = tempOrder;

  // 6. Save the new orders to the database in a single transaction
  await prisma.$transaction(
    currentOrder.map(c => prisma.catalog.update({
      where: { id: c.id },
      data: { order: c.order }
    }))
  );

  revalidatePath("/catalog");
  revalidatePath("/admin/catalog");
}
// -----------------------------------------
// 2. UPDATE CATALOG
// -----------------------------------------
export async function updateCatalog(id: string, data: {
  title: string;
  description: string;
  pdfUrl: string;
  thumbnail: string;
  isActive: boolean;
}) {
  const existing = await prisma.catalog.findUnique({ where: { id } });

  // If the admin uploaded a NEW thumbnail, delete the OLD one from the server
  if (existing && existing.thumbnail && existing.thumbnail !== data.thumbnail) {
    await deleteLocalFile(existing.thumbnail);
  }

  // If the admin uploaded a NEW PDF, delete the OLD one from Google Drive
  if (existing && existing.pdfUrl && existing.pdfUrl !== data.pdfUrl) {
    if (existing.pdfUrl.includes("drive.google.com")) {
      await deleteFromGoogleDrive(existing.pdfUrl);
    }
  }

  await prisma.catalog.update({
    where: { id },
    data,
  });

  revalidatePath("/catalog");
  revalidatePath("/admin/catalog");
  revalidatePath(`/admin/catalog/${id}`);
}

// -----------------------------------------
// 3. DELETE CATALOG
// -----------------------------------------
export async function deleteCatalog(id: string) {
  // 1. Fetch the catalog details first so we have the URLs
  const catalog = await prisma.catalog.findUnique({ where: { id } });
  
  if (catalog) {
    // 2. Delete the PDF from Google Drive
    if (catalog.pdfUrl && catalog.pdfUrl.includes("drive.google.com")) {
      await deleteFromGoogleDrive(catalog.pdfUrl);
    }

    // 3. Delete the thumbnail from your local VPS
    if (catalog.thumbnail) {
      await deleteLocalFile(catalog.thumbnail);
    }
  }

  // 4. Delete the record from the PostgreSQL database
  await prisma.catalog.delete({ where: { id } });
  
  revalidatePath("/catalog");
  revalidatePath("/admin/catalog");
}