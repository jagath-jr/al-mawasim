import { prisma } from "@/lib/prisma";
import ServicesClient from "./ServicesClient";

// Force Next.js to fetch fresh data dynamically (optional but good for a CMS)
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  // 1. Fetch active services and their sub-cards from PostgreSQL
  const dbServices = await prisma.service.findMany({
    where: { isActive: true },
    include: {
      subCards: true, // Includes the related SubCard records
    },
    orderBy: {
      createdAt: "asc", // Keeps the order consistent
    },
  });

  // 2. Define the hero data (You can also move this to the DB later if you want!)
  const heroData = {
    tagline: "Our Service",
    title: "Our Services",
    description: "Premium Curtains, Blinds & Interior Solutions Abu Dhabi",
    backgroundImage: "/services/bg-services.webp",
  };

  return (
    // 3. Pass the fetched data to the Client Component
    <ServicesClient heroData={heroData} servicesData={dbServices} />
  );
}