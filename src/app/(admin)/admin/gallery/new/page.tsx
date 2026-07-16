"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createGalleryImage } from "@/actions/gallery";

export default function NewGalleryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    // NEW: Enforce 5MB file size limit (5 * 1024 * 1024 bytes)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      alert("This image is too large! Please select an image under 5MB.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      
      // Upload to your VPS
      const uploadData = new FormData();
      uploadData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");
      const uploadJson = await uploadRes.json();

      // Save to database
      await createGalleryImage({
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        imageUrl: uploadJson.url,
        isPublished: formData.get("isPublished") === "on",
      });

      router.push("/admin/gallery");
    } catch (error: any) {
      console.error(error);
      
      // Handle the custom error thrown by our Server Action
      if (error.message?.includes("GALLERY_FULL")) {
        alert("Upload failed: Your gallery has reached the maximum limit of 18 images. Please delete an old image before uploading a new one.");
      } else {
        alert("Upload failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "mt-1 w-full px-4 py-2.5 border border-[#9C7C3E]/30 rounded-lg text-[#1A1A1A] bg-[#FDFBF7] outline-none focus:ring-2 focus:ring-[#C5A869]/50 focus:border-[#C5A869] transition-all placeholder-gray-400";
  const labelStyles = "block text-sm font-semibold text-[#1A1A1A] mb-1";
  const fileInputStyles = "w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1A1A1A] file:text-[#C5A869] hover:file:bg-[#C5A869] hover:file:text-[#1A1A1A] file:transition-all cursor-pointer";

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-6 sm:p-8 text-white shadow-lg border border-[#9C7C3E]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            Media Upload
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Upload to Gallery</h2>
        </div>
        
        <Link 
          href="/admin/gallery" 
          className="relative z-10 bg-[#FFFFFF]/10 text-white px-5 py-2.5 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-semibold backdrop-blur-sm border border-[#FFFFFF]/20 hover:border-[#C5A869] flex items-center gap-2 text-sm"
        >
          &larr; Back to Gallery
        </Link>
        
        {/* Decorative background element */}
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20 space-y-6">
        
        {/* Helper Note for the Admin */}
        <div className="bg-[#C5A869]/10 border border-[#C5A869]/30 text-[#1A1A1A] p-4 rounded-xl text-sm flex items-start gap-3">
          <svg className="w-5 h-5 text-[#9C7C3E] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>
            <span className="font-bold text-[#9C7C3E]">Storage Note:</span> A maximum of 18 images is allowed in the gallery to maintain optimal layout performance. Maximum file size per image is 5MB.
          </p>
        </div>

        <div>
          <label className={labelStyles}>Image Title (Used for SEO / Lightbox)</label>
          <input 
            type="text" name="title" required 
            className={inputStyles}
            placeholder="e.g., Wave Fold Curtains in Villa"
          />
        </div>

        <div>
          <label className={labelStyles}>Category</label>
          <select name="category" className={inputStyles}>
            <option value="Curtains">Curtains</option>
            <option value="Blinds">Blinds</option>
            <option value="Flooring">Flooring</option>
            <option value="Upholstery">Upholstery</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="p-6 border-2 border-dashed border-[#9C7C3E]/30 rounded-xl bg-[#FDFBF7]">
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Select Image File (Max: 5MB)</label>
          <input 
            type="file" 
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className={fileInputStyles}
          />
        </div>

        {/* Status Toggle */}
        <div className="flex items-center space-x-4 bg-[#FDFBF7] p-5 rounded-xl border border-[#9C7C3E]/30">
          <input 
            type="checkbox" 
            name="isPublished" 
            id="isPublished" 
            defaultChecked 
            className="h-5 w-5 text-[#C5A869] focus:ring-[#C5A869] border-[#9C7C3E]/40 rounded cursor-pointer accent-[#C5A869]"
          />
          <label htmlFor="isPublished" className="text-sm font-bold text-[#1A1A1A] cursor-pointer select-none">
            Publish Image to Public Gallery
          </label>
        </div>

        <button 
          type="submit" disabled={isSubmitting}
          className="w-full bg-[#1A1A1A] text-[#C5A869] py-4 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-bold disabled:opacity-70 disabled:cursor-not-allowed text-lg shadow-md border border-[#9C7C3E]/30 flex justify-center items-center gap-3 mt-4"
        >
          {isSubmitting ? (
             <>
               <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Uploading...
             </>
          ) : "Upload Image"}
        </button>
      </form>
    </div>
  );
}