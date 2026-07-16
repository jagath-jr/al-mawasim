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
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Visual Gallery Manager</h2>
          <p className="text-gray-500 mt-1 text-sm">Arrange images exactly as they will appear on the public website.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/gallery/new" 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium shadow-sm"
          >
            + Upload Image
          </Link>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500">No images in gallery. Upload your first image to start building the grid!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          {images.map((img, index) => (
            <div 
              key={img.id} 
              className="group relative w-full aspect-square overflow-hidden rounded-2xl border border-[#EAE1D0] bg-[#F5F0E6] shadow-sm"
            >
              {/* The Image */}
              <Image 
                src={img.imageUrl} 
                alt={img.title} 
                fill 
                className="object-cover"
              />

              {/* Status Badge (Top Left) */}
              <div className="absolute top-3 left-3 z-10">
                {img.isPublished ? (
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Published
                  </span>
                ) : (
                  <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    Draft
                  </span>
                )}
              </div>
              
              {/* Hover Overlay Controls */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-20">
                
                {/* Edit & Delete (Top Right) */}
                <div className="flex justify-end gap-2">
                  <Link 
                    href={`/admin/gallery/${img.id}`} 
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition flex items-center justify-center w-10 h-10"
                    title="Edit Details"
                  >
                    ✎
                  </Link>
                  <div className="bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center w-10 h-10 cursor-pointer hover:scale-110 active:scale-95">
  <DeleteGalleryButton id={img.id} />
</div>
                </div>

                {/* Move Left / Right Controls (Bottom) */}
                <div className="mb-2">
                  <p className="text-white text-center font-medium truncate px-2 mb-2 drop-shadow-md">
                    {img.title}
                  </p>
                  <VisualOrderButtons 
                    id={img.id} 
                    isFirst={index === 0} 
                    isLast={index === images.length - 1} 
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}