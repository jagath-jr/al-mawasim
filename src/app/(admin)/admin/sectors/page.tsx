import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { SectorOrderButtons, DeleteSectorButton } from "./SectorButtons";

export default async function AdminSectorsPage() {
  const sectors = await prisma.sector.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Sectors</h2>
        <Link href="/admin/sectors/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">+ Add Sector</Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 w-16 text-center">Order</th>
              <th className="p-4">Image</th>
              <th className="p-4">Sector Title</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sectors.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-gray-500">No sectors found.</td></tr>
            ) : (
              sectors.map((sector, index) => (
                <tr key={sector.id} className="border-b hover:bg-gray-50">
                  <td className="p-4"><SectorOrderButtons id={sector.id} isFirst={index === 0} isLast={index === sectors.length - 1} /></td>
                  <td className="p-4"><Image src={sector.image} alt={sector.title} width={64} height={40} className="object-cover rounded-md shadow-sm h-10 w-16" /></td>
                  <td className="p-4 font-medium text-gray-900">{sector.title}</td>
                  <td className="p-4">
                    {sector.isActive ? <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span> : <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">Draft</span>}
                  </td>
                  <td className="p-4 text-right space-x-4">
                    <Link href={`/admin/sectors/${sector.id}`} className="text-blue-600 text-sm font-medium">Edit</Link>
                    <DeleteSectorButton id={sector.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}