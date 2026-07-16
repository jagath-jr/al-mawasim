import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: { email: "admin@almawasim.com", password: hashedPassword },
  });
  return NextResponse.json({ message: "Admin recreated!" });
}