import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { VisualProjectOrderButtons, DeleteProjectButton } from "./ProjectButtons";

export default async function AdminProjectsPage() {
  const projects = await prisma.clientProject.findMany({ orderBy: { order: 'asc' } });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-6 sm:p-8 text-white shadow-lg border border-[#9C7C3E]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            Portfolio Management
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Visual Projects Manager</h2>
          <p className="mt-2 text-sm text-gray-300 max-w-xl">
            Arrange projects exactly as they will appear in your public portfolio.
          </p>
        </div>
        
        <Link 
          href="/admin/projects/new" 
          className="relative z-10 bg-[#C5A869] text-[#1A1A1A] px-6 py-3 rounded-xl hover:bg-[#9C7C3E] hover:text-white transition-all font-bold shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </Link>
        
        {/* Decorative background element */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {projects.length === 0 ? (
        <div className="bg-[#FDFBF7] p-12 text-center rounded-2xl border-2 border-dashed border-[#9C7C3E]/30 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#9C7C3E]/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#C5A869]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-[#1A1A1A] font-bold text-lg mb-1">No projects found</p>
          <p className="text-[#9C7C3E] text-sm font-medium">Upload your first project to start building the grid!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl shadow-sm border border-[#9C7C3E]/20">
          {projects.map((project: any, index: number) => (
            <div key={project.id} className="group relative w-full h-[280px] overflow-hidden rounded-[1.25rem] border border-[#9C7C3E]/30 bg-[#FDFBF7] shadow-sm hover:shadow-md transition-shadow">
              <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <div className="absolute top-4 left-4 z-10">
                {project.isActive ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FDFBF7] text-[#1A1A1A] border border-[#9C7C3E]/30 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-[#C5A869] animate-pulse"></span>
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1A1A1A]/80 backdrop-blur-sm text-white border border-white/20 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-gray-400"></span>
                    Draft
                  </span>
                )}
              </div>
              
              <div className="absolute inset-0 bg-[#1A1A1A]/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-20">
                <div className="flex justify-end gap-3">
                  <Link 
                    href={`/admin/projects/${project.id}`} 
                    className="bg-[#FFFFFF] text-[#1A1A1A] hover:text-[#C5A869] rounded-full shadow-lg transition-colors flex items-center justify-center w-10 h-10 border border-transparent hover:border-[#C5A869]/50" 
                    title="Edit Details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>
                  <DeleteProjectButton id={project.id} />
                </div>
                <div className="mb-2">
                  <p className="text-white text-center font-bold truncate px-2 tracking-wide">{project.title}</p>
                  <p className="text-[#C5A869] text-xs text-center truncate px-2 mb-3 font-medium">{project.location}</p>
                  <VisualProjectOrderButtons id={project.id} isFirst={index === 0} isLast={index === projects.length - 1} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}