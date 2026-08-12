import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "stream";

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

    // -----------------------------------------
    // OAuth 2.0 authentication
    // -----------------------------------------
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    // -----------------------------------------
    // Google Drive API
    // -----------------------------------------
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });

    // -----------------------------------------
    // Convert uploaded file to stream
    // -----------------------------------------
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    // -----------------------------------------
    // File metadata
    // -----------------------------------------
    const fileMetadata = {
      name: file.name,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
    };

    const media = {
      mimeType: file.type || "application/pdf",
      body: stream,
    };

    // -----------------------------------------
    // Upload PDF to Google Drive
    // -----------------------------------------
    const driveRes = await drive.files.create({
      requestBody: fileMetadata,
      media,
      fields: "id, webViewLink, webContentLink",
    });

    console.log("Google Drive upload successful:", driveRes.data);

    // -----------------------------------------
    // Make file publicly accessible
    // -----------------------------------------
    try {
      await drive.permissions.create({
        fileId: driveRes.data.id!,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      console.log("Google Drive public permission added.");
    } catch (permissionError) {
      console.error(
        "Google Drive public permission failed:",
        permissionError
      );
    }

    // -----------------------------------------
    // Return URL
    // -----------------------------------------
    return NextResponse.json({
      success: true,
      url:
        driveRes.data.webViewLink ||
        `https://drive.google.com/file/d/${driveRes.data.id}/view`,
      fileId: driveRes.data.id,
    });
  } catch (error: any) {
    console.error("Google Drive upload error:", error);

    return NextResponse.json(
      {
        error: "Failed to upload file to Drive.",
        details:
          error?.response?.data ||
          error?.message ||
          String(error),
      },
      { status: 500 }
    );
  }
}