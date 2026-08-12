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
  await prisma.catalog.create({ data });
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