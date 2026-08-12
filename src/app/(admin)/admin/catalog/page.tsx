// src/app/(admin)/admin/catalog/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteCatalogButton from "./DeleteCatalogButton"; // Create this right below

export default async function AdminCatalogPage() {
  const catalogs = await prisma.catalog.findMany({
    orderBy: { createdAt: 'desc' } 
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-6 sm:p-8 text-white shadow-lg border border-[#9C7C3E]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            Catalog Management
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Manage PDF Catalogs</h2>
          <p className="mt-2 text-sm text-gray-300 max-w-xl">
            Upload and manage your PDF catalogs .
          </p>
        </div>
        
        <Link 
          href="/admin/catalog/new" 
          className="relative z-10 bg-[#C5A869] text-[#1A1A1A] px-6 py-3 rounded-xl hover:bg-[#9C7C3E] hover:text-white transition-all font-bold shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload New Catalog
        </Link>
      </div>

      {/* Catalog Table */}
      <div className="bg-[#FFFFFF] rounded-2xl shadow-sm border border-[#9C7C3E]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-[#FDFBF7] border-b border-[#9C7C3E]/20">
                <th className="p-5 font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Cover</th>
                <th className="p-5 font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Title</th>
                <th className="p-5 font-bold text-[#1A1A1A] text-sm uppercase tracking-wider">Status</th>
                <th className="p-5 font-bold text-[#1A1A1A] text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {catalogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-[#9C7C3E] font-medium">
                    No catalogs found. Upload your first one above!
                  </td>
                </tr>
              ) : (
                catalogs.map((catalog) => (
                  <tr key={catalog.id} className="border-b border-[#9C7C3E]/10 hover:bg-[#FDFBF7] transition-colors">
                    <td className="p-5">
                      {catalog.thumbnail ? (
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-[#9C7C3E]/20 shadow-sm bg-gray-100">
                          <Image src={catalog.thumbnail} alt={catalog.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500 font-bold">PDF</div>
                      )}
                    </td>
                    <td className="p-5 font-bold text-[#1A1A1A]">{catalog.title}</td>
                    <td className="p-5">
                      {catalog.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C5A869]/10 text-[#9C7C3E]">Active</span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">Draft</span>
                      )}
                    </td>
                    <td className="p-5 text-right space-x-4">
                      <Link 
                        href={`/admin/catalog/${catalog.id}`}
                        className="text-[#9C7C3E] hover:text-[#C5A869] font-bold text-sm transition-colors inline-flex items-center gap-1"
                      >
                        Edit
                      </Link>
                      <a 
                        href={catalog.pdfUrl}
                        
                        className="text-blue-600 hover:text-blue-800 font-bold text-sm transition-colors"
                      >
                        View
                      </a>
                      <span className="inline-block translate-y-1">
                        <DeleteCatalogButton id={catalog.id} />
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