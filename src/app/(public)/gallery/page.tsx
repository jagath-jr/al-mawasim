import { prisma } from "@/lib/prisma";
import GalleryClient from "./GalleryClient";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  // Fetch only published images, ordered by our NEW custom order field!
  const images = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" }, // <-- THIS IS THE MAGIC LINE
  });

  return <GalleryClient images={images} />;
}