import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file received." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "al-mawasim",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });

 } catch (error) {
  console.error("Cloudinary Upload Error:", error);

  return NextResponse.json(
    {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    },
    { status: 500 }
  );
}
}