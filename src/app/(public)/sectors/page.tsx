import { prisma } from "@/lib/prisma";
import SectorsClient from "./SectorsClient";

export const dynamic = "force-dynamic";

export default async function SectorPage() {
  const sectors = await prisma.sector.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return <SectorsClient sectors={sectors} />;
}