import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import DeleteGalleryButton from "./DeleteGalleryButton";
import VisualOrderButtons from "./VisualOrderButtons";

export default async function AdminGalleryPage() {
  const images = await prisma.project.findMany({
    orderBy: { order: 'asc' } 
  });

  return (
    // Added px-4 sm:px-6 lg:px-8 to prevent content from touching screen edges on mobile
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-20 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-5 sm:p-8 text-white shadow-lg border border-[#9C7C3E]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            Media Management
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Visual Gallery Manager</h2>
          <p className="mt-2 text-sm text-gray-300 max-w-xl">
            Upload, arrange, and manage the images exactly as they will appear on the public website grid.
          </p>
        </div>
        
        <Link 
          href="/admin/gallery/new" 
          className="relative z-10 w-full sm:w-auto justify-center bg-[#C5A869] text-[#1A1A1A] px-6 py-3 rounded-xl hover:bg-[#9C7C3E] hover:text-white transition-all font-bold shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Image
        </Link>
        
        {/* Decorative background element */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {images.length === 0 ? (
        <div className="bg-[#FDFBF7] p-8 sm:p-12 text-center rounded-2xl border-2 border-dashed border-[#9C7C3E]/30 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#9C7C3E]/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#C5A869]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-[#1A1A1A] font-bold text-lg mb-1">No images in gallery</p>
          <p className="text-[#9C7C3E] text-sm font-medium">Upload your first image to start building the visual grid!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 bg-[#FFFFFF] p-4 sm:p-8 rounded-2xl shadow-sm border border-[#9C7C3E]/20">
          {images.map((img: any, index: number) => (
            <div 
              key={img.id} 
              className="group relative w-full aspect-square overflow-hidden rounded-2xl border border-[#9C7C3E]/30 bg-[#FDFBF7] shadow-sm hover:shadow-md transition-shadow"
            >
              {/* The Image */}
              <Image 
                src={img.imageUrl} 
                alt={img.title} 
                fill 
                className="object-cover transition-transform duration-700 sm:group-hover:scale-105"
              />

              {/* Status Badge (Top Left) - Adjusted padding for mobile */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20">
                {img.isPublished ? (
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
              {/* CHANGED: Always visible gradient on mobile, transitions to solid hover overlay on desktop */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 sm:bg-[#1A1A1A]/70 sm:backdrop-blur-[2px] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4 z-10 pointer-events-none">
                
                {/* Edit & Delete (Top Right) */}
                <div className="flex justify-end gap-2 sm:gap-3 pointer-events-auto">
                  <Link 
                    href={`/admin/gallery/${img.id}`} 
                    className="bg-[#FFFFFF] text-[#1A1A1A] hover:text-[#C5A869] rounded-full shadow-lg transition-colors flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 border border-transparent hover:border-[#C5A869]/50"
                    title="Edit Details"
                  >
                    <svg className="w-4 h-4 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>
                  <div className="bg-red-500/90 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 cursor-pointer hover:bg-red-600 active:scale-95">
                    <DeleteGalleryButton id={img.id} />
                  </div>
                </div>

                {/* Move Left / Right Controls (Bottom) */}
                <div className="mb-1 sm:mb-2 pointer-events-auto">
                  <p className="text-white text-center font-bold text-sm sm:text-base truncate px-2 mb-2 sm:mb-3 drop-shadow-md tracking-wide">
                    {img.title}
                  </p>
                  <div className="scale-90 sm:scale-100 origin-bottom">
                    <VisualOrderButtons 
                      id={img.id} 
                      isFirst={index === 0} 
                      isLast={index === images.length - 1} 
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