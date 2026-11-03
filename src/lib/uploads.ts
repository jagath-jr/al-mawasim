import fs from "fs/promises";
import path from "path";

const configuredDir = process.env.UPLOAD_DIR;

if (configuredDir && !path.isAbsolute(configuredDir)) {
  throw new Error("UPLOAD_DIR must be an absolute filesystem path.");
}

export const UPLOAD_DIR = path.resolve(
  configuredDir || path.join(process.cwd(), "public", "uploads")
);

export function getUploadedFilePath(url: string | null): string | null {
  if (!url || !url.startsWith("/uploads/")) return null;

  const filename = url.slice("/uploads/".length);

  // Uploaded filenames are generated from safe alphanumeric characters.
  if (
    !filename ||
    filename === "." ||
    filename === ".." ||
    !/^[A-Za-z0-9._-]+$/.test(filename) ||
    filename !== path.basename(filename)
  ) {
    return null;
  }

  return path.join(UPLOAD_DIR, filename);
}

export async function deleteUploadedFile(url: string | null): Promise<void> {
  const filePath = getUploadedFilePath(url);
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}
