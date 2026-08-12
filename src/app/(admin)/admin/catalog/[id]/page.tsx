// src/app/(admin)/admin/catalog/[id]/page.tsx
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateCatalog } from "@/actions/catalogs";

// Fetch function specifically for client components
async function getCatalog(id: string) {
  const res = await fetch(`/api/catalog/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default function EditCatalogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  const [catalog, setCatalog] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    // Basic API call to fetch existing data (Requires API route, see below)
    fetch(`/api/catalog-data?id=${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => setCatalog(data));
  }, [resolvedParams.id]);

  if (!catalog) return <div className="text-center p-20 font-bold text-[#1A1A1A]">Loading...</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      let finalPdfUrl = catalog.pdfUrl;
      let finalThumbnail = catalog.thumbnail;
      
      // Upload NEW PDF if selected
      if (pdfFile) {
        const pdfUploadData = new FormData();
        pdfUploadData.append("file", pdfFile);
        const driveRes = await fetch("/api/upload-drive", { method: "POST", body: pdfUploadData });
        if (!driveRes.ok) throw new Error("Google Drive upload failed");
        finalPdfUrl = (await driveRes.json()).url;
      }

      // Upload NEW Thumbnail if selected
      if (imageFile) {
        const imgUploadData = new FormData();
        imgUploadData.append("file", imageFile);
        const imgRes = await fetch("/api/upload", { method: "POST", body: imgUploadData });
        if (!imgRes.ok) throw new Error("Image upload failed");
        finalThumbnail = (await imgRes.json()).url;
      }

      await updateCatalog(catalog.id, {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        pdfUrl: finalPdfUrl,
        thumbnail: finalThumbnail,
        isActive: formData.get("isActive") === "on",
      });
      
      router.push("/admin/catalog");
    } catch (error) {
      alert("Failed to update catalog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "mt-1 w-full px-4 py-2.5 border border-[#9C7C3E]/30 rounded-lg text-[#1A1A1A] bg-[#FDFBF7] outline-none focus:ring-2 focus:ring-[#C5A869]/50 focus:border-[#C5A869]";
  const labelStyles = "block text-sm font-semibold text-[#1A1A1A] mb-1.5";
  const fileInputStyles = "w-full text-sm text-[#1A1A1A] file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1A1A1A] file:text-[#C5A869] hover:file:bg-[#C5A869] hover:file:text-[#1A1A1A] cursor-pointer";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-6 text-white shadow-lg border border-[#9C7C3E]/30 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Catalog</h2>
        <Link href="/admin/catalog" className="bg-[#FFFFFF]/10 px-4 py-2 rounded-xl text-sm border border-[#FFFFFF]/20 hover:border-[#C5A869]">&larr; Back</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20 space-y-6">
        <div>
          <label className={labelStyles}>Catalog Title</label>
          <input type="text" name="title" defaultValue={catalog.title} required className={inputStyles} />
        </div>

        <div>
          <label className={labelStyles}>Description</label>
          <textarea name="description" defaultValue={catalog.description} required rows={4} className={inputStyles}></textarea>
        </div>

        <div className="p-6 border-2 border-dashed border-[#9C7C3E]/30 rounded-xl bg-[#FDFBF7]">
          <label className={labelStyles}>Replace PDF (Leave blank to keep current)</label>
          <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} className={fileInputStyles} />
          <p className="text-xs mt-2 text-gray-500">Current PDF: <a href={catalog.pdfUrl} target="_blank" className="text-blue-500 underline">View File</a></p>
        </div>

        <div className="p-6 border-2 border-dashed border-[#9C7C3E]/30 rounded-xl bg-[#FDFBF7]">
          <label className={labelStyles}>Replace Cover Image (Leave blank to keep current)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className={fileInputStyles} />
        </div>

        <div className="flex items-center space-x-4 bg-[#FDFBF7] p-5 rounded-xl border border-[#9C7C3E]/30">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked={catalog.isActive} className="h-5 w-5 accent-[#C5A869]" />
          <label htmlFor="isActive" className="text-sm font-bold text-[#1A1A1A]">Publish this Catalog</label>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-[#1A1A1A] text-[#C5A869] py-4 rounded-xl font-bold">
          {isSubmitting ? "Updating..." : "Update Catalog"}
        </button>
      </form>
    </div>
  );
}