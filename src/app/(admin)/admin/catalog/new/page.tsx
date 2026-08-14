// src/app/(admin)/admin/catalog/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createCatalog } from "@/actions/catalogs";

export default function NewCatalogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pdfFile) return alert("Please select a PDF catalog.");
    
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      
      // 1. Upload PDF to Google Drive
      const pdfUploadData = new FormData();
      pdfUploadData.append("file", pdfFile);
      const driveRes = await fetch("/api/upload-drive", {
        method: "POST",
        body: pdfUploadData,
      });
      if (!driveRes.ok) throw new Error("Google Drive upload failed");
      const driveJson = await driveRes.json();

      // 2. Upload Thumbnail to Local VPS
      let imageUrl = "";
      if (imageFile) {
        const imgUploadData = new FormData();
        imgUploadData.append("file", imageFile);
        const imgRes = await fetch("/api/upload", {
          method: "POST",
          body: imgUploadData,
        });
        if (!imgRes.ok) throw new Error("Image upload failed");
        const imgJson = await imgRes.json();
        imageUrl = imgJson.url;
      }

      // 3. Save to Database
      await createCatalog({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        pdfUrl: driveJson.url, 
        thumbnail: imageUrl,
        isActive: formData.get("isActive") === "on",
      });
      
      router.push("/admin/catalog");
    } catch (error: any) {
      console.error(error);
      // Show the specific limit error message, or a general failure message
      if (error.message && error.message.includes("limit")) {
        alert(error.message);
      } else {
        alert("Failed to save catalog.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "mt-1 w-full px-4 py-2.5 border border-[#9C7C3E]/30 rounded-lg text-[#1A1A1A] bg-[#FDFBF7] outline-none focus:ring-2 focus:ring-[#C5A869]/50 focus:border-[#C5A869] transition-all placeholder-gray-400";
  const labelStyles = "block text-sm font-semibold text-[#1A1A1A] mb-1.5";
  const fileInputStyles = "w-full text-sm text-[#1A1A1A] file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1A1A1A] file:text-[#C5A869] hover:file:bg-[#C5A869] hover:file:text-[#1A1A1A] file:transition-all cursor-pointer";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-6 sm:p-8 text-white shadow-lg border border-[#9C7C3E]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            Catalog Creator
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Add New Catalog</h2>
        </div>
        <Link href="/admin/catalog" className="relative z-10 bg-[#FFFFFF]/10 text-white px-5 py-2.5 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-semibold backdrop-blur-sm border border-[#FFFFFF]/20 hover:border-[#C5A869] flex items-center gap-2 text-sm">
          &larr; Back to Catalogs
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20 space-y-6">
        <div>
          <label className={labelStyles}>Catalog Title</label>
          <input type="text" name="title" required className={inputStyles} placeholder="e.g., 2024 Curtains Collection" />
        </div>

        <div>
          <label className={labelStyles}>Description / Details</label>
          <textarea name="description" required rows={4} className={inputStyles} placeholder="Describe what is inside the catalog..."></textarea>
        </div>

        <div className="p-6 border-2 border-dashed border-[#9C7C3E]/30 rounded-xl bg-[#FDFBF7]">
          <label className={labelStyles}>Upload PDF (Google Drive)</label>
          <input type="file" accept="application/pdf" required onChange={(e) => setPdfFile(e.target.files?.[0] || null)} className={fileInputStyles} />
        </div>

        <div className="p-6 border-2 border-dashed border-[#9C7C3E]/30 rounded-xl bg-[#FDFBF7]">
          <label className={labelStyles}>Upload Cover Image (Thumbnail - Optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className={fileInputStyles} />
        </div>

        <div className="flex items-center space-x-4 bg-[#FDFBF7] p-5 rounded-xl border border-[#9C7C3E]/30">
          <input type="checkbox" name="isActive" id="isActive" defaultChecked className="h-5 w-5 text-[#C5A869] focus:ring-[#C5A869] border-[#9C7C3E]/40 rounded cursor-pointer accent-[#C5A869]" />
          <label htmlFor="isActive" className="text-sm font-bold text-[#1A1A1A] cursor-pointer select-none">
            Publish this Catalog (Active)
          </label>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-[#1A1A1A] text-[#C5A869] py-4 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-bold disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-md border border-[#9C7C3E]/30 mt-4">
          {isSubmitting ? "Uploading & Saving..." : "Save Catalog"}
        </button>
      </form>
    </div>
  );
}