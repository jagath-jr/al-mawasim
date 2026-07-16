"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateSector } from "@/actions/sectors";
import Image from "next/image";

export default function EditSectorForm({ sector }: { sector: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      let imageUrl = sector.image;

      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: uploadData });
        if (!res.ok) throw new Error("Upload failed");
        imageUrl = (await res.json()).url;
      }

      await updateSector(sector.id, {
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        description: formData.get("description") as string,
        image: imageUrl,
        isActive: formData.get("isActive") === "on",
      });

      router.push("/admin/sectors");
      router.refresh();
    } catch (err) {
      alert("Failed to update sector.");
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
            Sector Editor
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Edit Sector</h2>
        </div>
        
        <Link 
          href="/admin/sectors" 
          className="relative z-10 bg-[#FFFFFF]/10 text-white px-5 py-2.5 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-semibold backdrop-blur-sm border border-[#FFFFFF]/20 hover:border-[#C5A869] flex items-center gap-2 text-sm"
        >
          &larr; Back to Sectors
        </Link>
        
        {/* Decorative background element */}
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20 space-y-6">
        <div>
          <label className={labelStyles}>Sector Title</label>
          <input 
            type="text" name="title" defaultValue={sector.title} required 
            className={inputStyles} 
          />
        </div>

        <div>
          <label className={labelStyles}>Subtitle</label>
          <input 
            type="text" name="subtitle" defaultValue={sector.subtitle} required 
            className={inputStyles} 
          />
        </div>

        <div>
          <label className={labelStyles}>Description</label>
          <textarea 
            name="description" defaultValue={sector.description} required rows={5} 
            className={inputStyles}
          ></textarea>
        </div>

        <div className="p-6 border-2 border-dashed border-[#9C7C3E]/30 rounded-xl bg-[#FDFBF7] flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="relative h-24 w-32 rounded-lg overflow-hidden shadow-md flex-shrink-0 border border-[#9C7C3E]/20">
             <Image src={sector.image} alt="Current" fill className="object-cover" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Update Image File (Leave blank to keep current)</label>
            <input 
              type="file" accept="image/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className={fileInputStyles} 
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 bg-[#FDFBF7] p-5 rounded-xl border border-[#9C7C3E]/30">
          <input 
            type="checkbox" name="isActive" id="isActive" defaultChecked={sector.isActive} 
            className="h-5 w-5 text-[#C5A869] focus:ring-[#C5A869] border-[#9C7C3E]/40 rounded cursor-pointer accent-[#C5A869]" 
          />
          <label htmlFor="isActive" className="text-sm font-bold text-[#1A1A1A] cursor-pointer select-none">Publish Sector</label>
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
               Updating...
             </>
          ) : "Update Sector"}
        </button>
      </form>
    </div>
  );
}