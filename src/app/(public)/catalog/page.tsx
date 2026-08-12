// src/app/(public)/catalog/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  const catalogs = await prisma.catalog.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#C5A869]/20 text-[#9C7C3E] px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Our Collections
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">Product Catalogs</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Browse our extensive collection of premium curtains, flooring, and interior solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogs.map((catalog) => (
            <div key={catalog.id} className="bg-white rounded-2xl overflow-hidden border border-[#9C7C3E]/20 shadow-sm hover:shadow-md transition-shadow">
              {catalog.thumbnail ? (
                <div className="relative h-64 w-full">
                  <Image src={catalog.thumbnail} alt={catalog.title} fill className="object-cover" />
                </div>
              ) : (
                <div className="h-64 w-full bg-gray-100 flex items-center justify-center border-b border-[#9C7C3E]/20">
                  <span className="text-gray-400 font-medium">No Cover</span>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{catalog.title}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">{catalog.description}</p>
                
               <Link 
  href={catalog.pdfUrl} 
  className="inline-flex w-full justify-center items-center gap-2 bg-[#1A1A1A] text-[#C5A869] py-3 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-colors font-bold"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
  View PDF Catalog
</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}