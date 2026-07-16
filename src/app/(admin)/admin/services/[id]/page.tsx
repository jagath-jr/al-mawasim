import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditServiceForm from "./EditServiceForm";
import SubCardManager from "./SubCardManager"; // We will create this next

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Added `include: { subCards: true }` to fetch the related cards
  const service = await prisma.service.findUnique({
    where: { id: id },
    include: { subCards: true }, 
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-12">
      {/* 1. The Main Service Form */}
      <div>
        <EditServiceForm service={service} />
      </div>

      <hr className="border-gray-300" />

      {/* 2. The Sub-Cards Manager */}
      <div>
        <SubCardManager serviceId={service.id} subCards={service.subCards} />
      </div>
    </div>
  );
}