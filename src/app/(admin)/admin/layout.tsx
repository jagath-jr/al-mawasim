import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "./Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if the user is logged in
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    // Background (Light): Warm Cream #FDFBF7
    <div className="flex min-h-screen bg-[#FDFBF7]">
      {/* Client-side Sidebar for Mobile Responsiveness */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 w-full md:ml-64 transition-all duration-300">
        <div className="p-4 md:p-8 pt-20 md:pt-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}