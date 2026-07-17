import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./DeleteButton"; // Import the new button

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' } 
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-6 sm:p-8 text-white shadow-lg border border-[#9C7C3E]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            Service Management
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Manage Services</h2>
          <p className="mt-2 text-sm text-gray-300 max-w-xl">
            View, edit, or add new services to your portfolio. Manage their publication status and adjust layouts.
          </p>
        </div>
        
        <Link 
          href="/admin/services/new" 
          className="relative z-10 bg-[#C5A869] text-[#1A1A1A] px-6 py-3 rounded-xl hover:bg-[#9C7C3E] hover:text-white transition-all font-bold shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Service
        </Link>
        
        {/* Decorative background element */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Services Table */}
      <div className="bg-[#FFFFFF] rounded-2xl shadow-sm border border-[#9C7C3E]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#FDFBF7] border-b border-[#9C7C3E]/20">
                <th className="p-5 font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Image</th>
                <th className="p-5 font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Title</th>
                <th className="p-5 font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Layout</th>
                <th className="p-5 font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Status</th>
                <th className="p-5 font-bold text-[#1A1A1A] text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-[#9C7C3E]">
                      <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border border-[#9C7C3E]/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#C5A869]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <span className="font-medium text-sm">No services found. Add your first service above!</span>
                    </div>
                  </td>
                </tr>
              ) : (
                services.map((service: any) => (
                  <tr key={service.id} className="border-b border-[#9C7C3E]/10 hover:bg-[#FDFBF7] transition-colors">
                    <td className="p-5">
                      {service.image ? (
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-[#9C7C3E]/20 shadow-sm bg-gray-100">
                          <Image src={service.image} alt={service.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-12 w-16 bg-[#FDFBF7] border border-[#9C7C3E]/20 rounded-lg flex items-center justify-center text-xs text-[#9C7C3E] font-medium">None</div>
                      )}
                    </td>
                    <td className="p-5 font-bold text-[#1A1A1A]">{service.title}</td>
                    <td className="p-5 text-gray-600 font-medium">
                      <span className="px-3 py-1 bg-[#FFFFFF] rounded-md text-xs border border-[#9C7C3E]/20 shadow-sm">
                        {service.layout}
                      </span>
                    </td>
                    
                    {/* Status Pill Badge */}
                    <td className="p-5">
                      {service.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C5A869]/10 text-[#9C7C3E] border border-[#C5A869]/20">
                          <span className="h-2 w-2 rounded-full bg-[#C5A869] animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">
                          <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="p-5 text-right space-x-4">
                      <Link 
                        href={`/admin/services/${service.id}`}
                        className="text-[#9C7C3E] hover:text-[#C5A869] font-bold text-sm transition-colors inline-flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit
                      </Link>
                      <span className="inline-block translate-y-1">
                        <DeleteButton id={service.id} />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}