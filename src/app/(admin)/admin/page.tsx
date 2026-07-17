import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  
  // Fetching counts using the EXACT model names from your schema.prisma
  const projectsCount = prisma.clientProject ? await prisma.clientProject.count() : 0;
  const servicesCount = prisma.service ? await prisma.service.count({ where: { isActive: true } }) : 0;
  const galleryCount = prisma.project ? await prisma.project.count() : 0; // Your schema names the Gallery table "Project"
  const sectorsCount = prisma.sector ? await prisma.sector.count() : 0;

  const quickStats = [
    { label: "Total Projects", value: projectsCount.toString(), change: "Published in portfolio" },
    { label: "Active Services", value: servicesCount.toString(), change: "Currently offered" },
    { label: "Gallery Media", value: galleryCount.toString(), change: "Images in showcase" },
    { label: "Total Sectors", value: sectorsCount.toString(), change: "Industries served" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-6 sm:p-8 text-white shadow-lg border border-[#9C7C3E]/30">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            CMS Management
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Welcome to the Admin Dashboard
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
            Manage your corporate web presence, update project portfolios, and monitor your digital content seamlessly from one location.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#FFFFFF] p-5 rounded-xl border border-[#9C7C3E]/20 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-[#1A1A1A] mt-2">{stat.value}</p>
            <div className="mt-2 flex items-center text-xs font-medium text-[#9C7C3E]">
              <span>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action Cards */}
      <div>
        <h2 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C5A869]" />
          Quick Shortcuts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          
          <Link
            href="/admin/projects"
            className="group bg-[#FFFFFF] p-6 rounded-xl border border-[#9C7C3E]/20 shadow-sm hover:border-[#C5A869] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FDFBF7] border border-[#9C7C3E]/30 flex items-center justify-center text-[#9C7C3E] group-hover:bg-[#C5A869] group-hover:text-[#1A1A1A] transition-colors mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#9C7C3E] transition-colors">
                Add New Project
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Publish new case studies, architectural renderings, or completed works.
              </p>
            </div>
            <span className="mt-4 text-xs font-semibold text-[#9C7C3E] group-hover:underline flex items-center gap-1">
              Manage Projects &rarr;
            </span>
          </Link>

          <Link
            href="/admin/gallery"
            className="group bg-[#FFFFFF] p-6 rounded-xl border border-[#9C7C3E]/20 shadow-sm hover:border-[#C5A869] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FDFBF7] border border-[#9C7C3E]/30 flex items-center justify-center text-[#9C7C3E] group-hover:bg-[#C5A869] group-hover:text-[#1A1A1A] transition-colors mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#9C7C3E] transition-colors">
                Upload to Gallery
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Upload high-resolution media and organize promotional galleries.
              </p>
            </div>
            <span className="mt-4 text-xs font-semibold text-[#9C7C3E] group-hover:underline flex items-center gap-1">
              Open Gallery &rarr;
            </span>
          </Link>

          <Link
            href="/admin/sectors"
            className="group bg-[#FFFFFF] p-6 rounded-xl border border-[#9C7C3E]/20 shadow-sm hover:border-[#C5A869] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FDFBF7] border border-[#9C7C3E]/30 flex items-center justify-center text-[#9C7C3E] group-hover:bg-[#C5A869] group-hover:text-[#1A1A1A] transition-colors mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#9C7C3E] transition-colors">
                Manage Sectors
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Update the industries you serve and showcase relevant expertise.
              </p>
            </div>
            <span className="mt-4 text-xs font-semibold text-[#9C7C3E] group-hover:underline flex items-center gap-1">
              Edit Sectors &rarr;
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
}