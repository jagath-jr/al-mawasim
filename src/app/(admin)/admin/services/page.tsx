import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./DeleteButton"; // Import the new button

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' } 
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Services</h2>
        <Link 
          href="/admin/services/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add New Service
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Image</th>
              <th className="p-4 font-semibold text-gray-700">Title</th>
              <th className="p-4 font-semibold text-gray-700">Layout</th>
              <th className="p-4 font-semibold text-gray-700">Status</th> {/* New Status Header */}
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500"> {/* Updated colSpan from 4 to 5 */}
                  No services found. Add one above!
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {service.image ? (
                      <Image src={service.image} alt={service.title} width={48} height={48} className="object-cover rounded-md h-12 w-12 shadow-sm" />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">None</div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-900">{service.title}</td>
                  <td className="p-4 text-gray-700">{service.layout}</td>
                  
                  {/* Status Pill Badge */}
                  <td className="p-4">
                    {service.isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                        <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                        Draft
                      </span>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="p-4 text-right space-x-4">
                    <Link 
                      href={`/admin/services/${service.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={service.id} />
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