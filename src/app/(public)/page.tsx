import { getHomeSettings, getClientLogos } from "@/actions/home";
import { getContactSettings } from "@/actions/contact";
import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch everything simultaneously for max speed
  const [homeSettings, contactSettings, logos, topServices] = await Promise.all([
    getHomeSettings(),
    getContactSettings(),
    getClientLogos(),
    // Pull the top 3 active services for the cards automatically!
    prisma.service.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 3 })
  ]);

  return (
    <HomeClient 
      homeSettings={homeSettings} 
      contactSettings={contactSettings} 
      logos={logos} 
      services={topServices} 
    />
  );
}