import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteCatalogButton from "./DeleteCatalogButton";
import OrderCatalogButtons from "./OrderCatalogButtons"; 

export default async function AdminCatalogPage() {
  const catalogs = await prisma.catalog.findMany({
    orderBy: { order: 'asc' } 
  });

  const isLimitReached = catalogs.length >= 6;

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-5 sm:p-8 text-white shadow-lg border border-[#9C7C3E]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            Catalog Management
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Visual Catalog Manager</h2>
          <p className="mt-2 text-sm text-gray-300 max-w-xl">
            Upload, arrange, and manage your PDF catalogs (Max limit: 6 catalogs).
          </p>
        </div>
        
        {isLimitReached ? (
          <div className="relative z-10 w-full sm:w-auto justify-center bg-gray-500 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center gap-2 whitespace-nowrap opacity-80 cursor-not-allowed">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Limit Reached (6/6)
          </div>
        ) : (
          <Link 
            href="/admin/catalog/new" 
            className="relative z-10 w-full sm:w-auto justify-center bg-[#C5A869] text-[#1A1A1A] px-6 py-3 rounded-xl hover:bg-[#9C7C3E] hover:text-white transition-all font-bold shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Catalog
          </Link>
        )}
        
        {/* Decorative background element */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {catalogs.length === 0 ? (
        <div className="bg-[#FDFBF7] p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-[#9C7C3E]/30 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#9C7C3E]/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#C5A869]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-[#1A1A1A] font-bold text-lg mb-1">No catalogs found</p>
          <p className="text-[#9C7C3E] text-sm font-medium">Upload your first PDF catalog to display it on the website!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 bg-[#FFFFFF] p-4 sm:p-8 rounded-2xl shadow-sm border border-[#9C7C3E]/20">
          {catalogs.map((catalog, index) => (
            <div 
              key={catalog.id} 
              className="group relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-[#9C7C3E]/30 bg-[#FDFBF7] shadow-sm hover:shadow-md transition-shadow"
            >
              {/* The Cover Image or PDF Placeholder */}
              {catalog.thumbnail ? (
                <Image 
                  src={catalog.thumbnail} 
                  alt={catalog.title} 
                  fill 
                  className="object-cover transition-transform duration-700 sm:group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-[#9C7C3E]">
                   <svg className="w-12 h-12 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                   </svg>
                   <span className="font-bold text-sm tracking-widest uppercase opacity-70">PDF Document</span>
                </div>
              )}

              {/* Status Badge (Top Left) */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                {catalog.isActive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#FDFBF7] text-[#1A1A1A] border border-[#9C7C3E]/30 shadow-md">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#C5A869] animate-pulse"></span>
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#1A1A1A]/80 backdrop-blur-sm text-white border border-white/20 shadow-md">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-gray-400"></span>
                    Draft
                  </span>
                )}
              </div>
              
              {/* Mobile-Friendly Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 sm:bg-[#1A1A1A]/70 sm:backdrop-blur-[2px] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4 z-10 pointer-events-none">
                
                {/* Actions (Top Right) */}
                <div className="flex justify-end gap-2 pointer-events-auto">
                  {/* View PDF Button */}
                  <a 
                    href={catalog.pdfUrl}
                    
                    className="bg-[#FFFFFF] text-[#1A1A1A] hover:text-[#C5A869] rounded-full shadow-lg transition-colors flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 border border-transparent hover:border-[#C5A869]/50"
                    title="View PDF"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </a>
                  
                  {/* Edit Button */}
                  <Link 
                    href={`/admin/catalog/${catalog.id}`} 
                    className="bg-[#FFFFFF] text-[#1A1A1A] hover:text-[#C5A869] rounded-full shadow-lg transition-colors flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 border border-transparent hover:border-[#C5A869]/50"
                    title="Edit Details"
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>

                  {/* Delete Button (Wrapped in container to handle the icon sizing) */}
                  <div className="bg-red-500/90 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 cursor-pointer hover:bg-red-600 active:scale-95 pointer-events-auto">
                    <DeleteCatalogButton id={catalog.id} />
                  </div>
                </div>

                {/* Move Left / Right Controls & Title (Bottom) */}
                <div className="mb-1 sm:mb-2 pointer-events-auto">
                  <p className="text-white text-center font-bold text-sm sm:text-lg truncate px-2 mb-2 sm:mb-3 drop-shadow-md tracking-wide">
                    {catalog.title}
                  </p>
                  <div className="scale-90 sm:scale-100 origin-bottom">
                    <OrderCatalogButtons 
                      id={catalog.id} 
                      isFirst={index === 0} 
                      isLast={index === catalogs.length - 1} 
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}