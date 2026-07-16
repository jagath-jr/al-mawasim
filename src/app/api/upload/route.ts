import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // 1. Convert the file into a Node.js Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Clean up the filename to prevent URL issues (removes spaces and weird characters)
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    
    // 3. Create a highly unique filename so we never overwrite existing files
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const uniqueFilename = `${uniqueSuffix}-${originalName}`;

    // 4. Define where the file will be saved (public/uploads)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, uniqueFilename);

    // 5. Ensure the "public/uploads" directory exists. If it doesn't, create it automatically.
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // 6. Save the physical file to the disk
    await fs.writeFile(filePath, buffer);

    // 7. Return the public URL so the Next.js frontend and Database can use it
    const publicUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({ url: publicUrl, success: true });
    
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
  }
}