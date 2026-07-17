"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import path from "path";
import { headers } from "next/headers";
import { v2 as cloudinary } from "cloudinary";

// --- CLOUDINARY CONFIGURATION ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- SECURITY HELPER: Prevent HTML Injection / XSS ---
function escapeHTML(str: string) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- SECURITY HELPER: Spam Rate Limiter ---
// Stores IPs and the exact timestamp of their last email
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds cooldown

// ============================================================================
// 1. SEND CONTACT EMAIL ACTION (For Contact Page)
// ============================================================================
export async function sendContactEmail(formData: FormData) {
  // 1. Rate Limiting Check (Spam Protection)
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown-ip";
  
  const lastRequestTime = rateLimitMap.get(ip);
  if (lastRequestTime && Date.now() - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
    throw new Error("RATE_LIMIT_EXCEEDED");
  }

  // Record this new attempt
  rateLimitMap.set(ip, Date.now());

  // 2. Extract Data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) throw new Error("Missing required fields");

  // 3. Sanitize Inputs (XSS Protection)
  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safePhone = escapeHTML(phone);
  const safeMessage = escapeHTML(message).replace(/\n/g, "<br>");

  // 4. Send Email
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: safeEmail,
    subject: `New Website Lead from: ${safeName}`,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(process.cwd(), "public", "AL MAWASIM LOGO (1).png"),
        cid: "companylogo", 
      },
    ],
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FDFBF7; padding: 40px 20px; color: #1A1A1A;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
          <div style="background-color: #1A1A1A; padding: 35px 20px; text-align: center; border-bottom: 5px solid #C5A869;">
            <img src="cid:companylogo" alt="Al Mawasim Decor" style="max-width: 220px; height: auto;" />
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #1A1A1A; margin-top: 0; font-size: 24px; text-align: center;">New Contact Request</h2>
            <p style="font-size: 16px; color: #666; text-align: center; margin-bottom: 30px;">You have received a new inquiry from your website.</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 15px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; width: 100px; color: #888;"><strong>Name:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #1A1A1A; font-weight: 500;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #888;"><strong>Email:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0;">
                  <a href="mailto:${safeEmail}" style="color: #C5A869; text-decoration: none; font-weight: 500;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #888;"><strong>Phone:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #1A1A1A; font-weight: 500;">${safePhone || "Not provided"}</td>
              </tr>
            </table>
            <div>
              <h3 style="color: #1A1A1A; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Message:</h3>
              <div style="background-color: #F5F0E6; padding: 20px; border-radius: 8px; border-left: 4px solid #C5A869; color: #333; line-height: 1.6; font-size: 15px;">
                ${safeMessage}
              </div>
            </div>
          </div>
          <div style="background-color: #1A1A1A; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            <p style="margin: 0;">This email was sent automatically from the Al Mawasim Decor website contact form.</p>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { success: true };
}

// ============================================================================
// 2. SEND QUOTE EMAIL ACTION (For Home Page Hero Form)
// ============================================================================
export async function sendQuoteEmail(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown-ip";
  
  const lastRequestTime = rateLimitMap.get(ip);
  if (lastRequestTime && Date.now() - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
    throw new Error("RATE_LIMIT_EXCEEDED");
  }

  rateLimitMap.set(ip, Date.now());

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const service = formData.get("service") as string; // Pulled from the dropdown

  if (!name || !email || !service) throw new Error("Missing required fields");

  const safeName = escapeHTML(name);
  const safeEmail = escapeHTML(email);
  const safePhone = escapeHTML(phone);
  const safeService = escapeHTML(service);

  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: safeEmail,
    subject: `New Quote Request: ${safeService} - ${safeName}`,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(process.cwd(), "public", "AL MAWASIM LOGO (1).png"),
        cid: "companylogo", 
      },
    ],
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FDFBF7; padding: 40px 20px; color: #1A1A1A;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
          <div style="background-color: #1A1A1A; padding: 35px 20px; text-align: center; border-bottom: 5px solid #C5A869;">
            <img src="cid:companylogo" alt="Al Mawasim Decor" style="max-width: 220px; height: auto;" />
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #1A1A1A; margin-top: 0; font-size: 24px; text-align: center;">New Quote Request</h2>
            <p style="font-size: 16px; color: #666; text-align: center; margin-bottom: 30px;">A customer has requested an estimation via the Home Page.</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 15px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; width: 140px; color: #888;"><strong>Name:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #1A1A1A; font-weight: 500;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #888;"><strong>Email:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0;">
                  <a href="mailto:${safeEmail}" style="color: #C5A869; text-decoration: none; font-weight: 500;">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #888;"><strong>Phone:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #1A1A1A; font-weight: 500;">${safePhone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #888;"><strong>Service Needed:</strong></td>
                <td style="padding: 12px 0; border-bottom: 1px solid #EAE1D0; color: #1A1A1A; font-weight: 500;">
                  <span style="background-color: #F5F0E6; color: #9C7C3E; padding: 4px 10px; border-radius: 4px; border: 1px solid #EAE1D0;">${safeService}</span>
                </td>
              </tr>
            </table>
          </div>
          <div style="background-color: #1A1A1A; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            <p style="margin: 0;">This email was sent automatically from the Al Mawasim Decor website quote form.</p>
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return { success: true };
}

// ============================================================================
// 3. ADMIN SETTINGS ACTIONS
// ============================================================================

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
      console.log(`Successfully deleted Cloudinary contact image: ${publicId}`);
    }
  } catch (error) {
    console.error(`Failed to delete contact image ${imageUrl}:`, error);
  }
}

export async function getContactSettings() {
  let settings = await prisma.contactSettings.findUnique({ where: { id: "default" } });
  if (!settings) {
    settings = await prisma.contactSettings.create({ data: { id: "default" } });
  }
  return settings;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateContactSettings(data: any) {
  const existing = await prisma.contactSettings.findUnique({ where: { id: "default" } });
  
  if (existing) {
    if (existing.heroImage !== data.heroImage) await deleteImageFile(existing.heroImage);
    if (existing.officeImage !== data.officeImage) await deleteImageFile(existing.officeImage);
  }
  
  await prisma.contactSettings.upsert({
    where: { id: "default" },
    update: data,
    create: { id: "default", ...data },
  });
  
  revalidatePath("/contact");
  revalidatePath("/admin/contact");
}