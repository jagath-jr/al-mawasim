import Link from "next/link";

export default function AdminDashboard() {
  const quickStats = [
    { label: "Total Projects", value: "24", change: "+3 this month" },
    { label: "Active Services", value: "8", change: "All operational" },
    { label: "Gallery Media", value: "142", change: "+18 new images" },
    { label: "Pending Inquiries", value: "5", change: "Needs attention" },
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
            Manage your corporate web presence, update project portfolios, and monitor client inquiries seamlessly from one location.
          </p>
        </div>
        {/* Decorative background element */}
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
            href="/admin/contact"
            className="group bg-[#FFFFFF] p-6 rounded-xl border border-[#9C7C3E]/20 shadow-sm hover:border-[#C5A869] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FDFBF7] border border-[#9C7C3E]/30 flex items-center justify-center text-[#9C7C3E] group-hover:bg-[#C5A869] group-hover:text-[#1A1A1A] transition-colors mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#9C7C3E] transition-colors">
                View Inquiries
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Check client messages, quote requests, and consultation submissions.
              </p>
            </div>
            <span className="mt-4 text-xs font-semibold text-[#9C7C3E] group-hover:underline flex items-center gap-1">
              Check Messages &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}