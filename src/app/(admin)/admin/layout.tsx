import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if the user is logged in
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">CMS Panel</h1>
        <nav className="space-y-4">
          <Link href="/admin" className="block hover:text-gray-300">Dashboard</Link>
          <Link href="/admin/services" className="block hover:text-gray-300">Services</Link>
          <Link href="/admin/gallery" className="block hover:text-gray-300">Gallery</Link>
          <Link href="/admin/sectors" className="block hover:text-gray-300">Sectors</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}