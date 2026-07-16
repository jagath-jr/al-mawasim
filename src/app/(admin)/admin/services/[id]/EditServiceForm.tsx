"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateService } from "@/actions/services";

export default function EditServiceForm({ service }: { service: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      let imageUrl = service.image; // Default to existing image

      // Only upload a new image if the admin selected one
      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed");
        
        const uploadJson = await uploadRes.json();
        imageUrl = uploadJson.url;
      }

      await updateService(service.id, {
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        description: formData.get("description") as string,
        layout: formData.get("layout") as string,
        subSectionTitle: formData.get("subSectionTitle") as string,
        image: imageUrl,
        isActive: formData.get("isActive") === "on",
      });

      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "mt-1 w-full px-4 py-2.5 border border-[#9C7C3E]/30 rounded-lg text-[#1A1A1A] bg-[#FDFBF7] outline-none focus:ring-2 focus:ring-[#C5A869]/50 focus:border-[#C5A869] transition-all placeholder-gray-400";
  const labelStyles = "block text-sm font-semibold text-[#1A1A1A] mb-1";
  const fileInputStyles = "w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1A1A1A] file:text-[#C5A869] hover:file:bg-[#C5A869] hover:file:text-[#1A1A1A] file:transition-all cursor-pointer";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A] to-[#9C7C3E]/40 p-6 sm:p-8 text-white shadow-lg border border-[#9C7C3E]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest bg-[#C5A869] text-[#1A1A1A] rounded-full mb-3">
            Service Editor
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Edit Service</h2>
        </div>
        
        <Link 
          href="/admin/services" 
          className="relative z-10 bg-[#FFFFFF]/10 text-white px-5 py-2.5 rounded-xl hover:bg-[#C5A869] hover:text-[#1A1A1A] transition-all font-semibold backdrop-blur-sm border border-[#FFFFFF]/20 hover:border-[#C5A869] flex items-center gap-2 text-sm"
        >
          &larr; Back to Services
        </Link>
        
        {/* Decorative background element */}
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#C5A869]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] p-6 sm:p-10 rounded-2xl shadow-sm border border-[#9C7C3E]/20 space-y-6">
        <div>
          <label className={labelStyles}>Service Title</label>
          <input 
            type="text" name="title" required defaultValue={service.title}
            className={inputStyles}
          />
        </div>

        <div>
          <label className={labelStyles}>Subtitle</label>
          <input 
            type="text" name="subtitle" defaultValue={service.subtitle || ""}
            className={inputStyles}
          />
        </div>

        <div>
          <label className={labelStyles}>Description</label>
          <textarea 
            name="description" required rows={5} defaultValue={service.description}
            className={inputStyles}
          ></textarea>
        </div>

        {/* NEW FIELD: Sub-Cards Header Title */}
        <div>
          <label className={labelStyles}>Sub-Cards Header Title (Optional)</label>
          <input 
            type="text" name="subSectionTitle" defaultValue={service.subSectionTitle || ""}
            className={inputStyles}
            placeholder="e.g., Available Curtain Types"
          />
        </div>

        <div>
          <label className={labelStyles}>Layout Style</label>
          <select name="layout" defaultValue={service.layout} className={inputStyles}>
            <option value="textLeft">Text Left, Image Right</option>
            <option value="imageLeft">Image Left, Text Right</option>
            <option value="textLeftResponsive">Text Left (Responsive Style)</option>
          </select>
        </div>

        <div className="p-6 border-2 border-dashed border-[#9C7C3E]/30 rounded-xl bg-[#FDFBF7]">
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
            Update Display Image (Leave blank to keep current image)
          </label>
          {service.image && (
             <p className="text-xs font-medium text-[#9C7C3E] mb-4 bg-[#FFFFFF] inline-block px-3 py-1 rounded-md border border-[#9C7C3E]/20">
               Current: <span className="text-gray-500 truncate max-w-[200px] inline-block align-bottom">{service.image}</span>
             </p>
          )}
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className={fileInputStyles}
          />
        </div>

        {/* NEW FIELD: Status Toggle */}
        <div className="flex items-center space-x-4 bg-[#FDFBF7] p-5 rounded-xl border border-[#9C7C3E]/30">
          <input 
            type="checkbox" 
            name="isActive" 
            id="isActive"
            defaultChecked={service.isActive}
            className="h-5 w-5 text-[#C5A869] focus:ring-[#C5A869] border-[#9C7C3E]/40 rounded cursor-pointer accent-[#C5A869]"
          />
          <label htmlFor="isActive" className="text-sm font-bold text-[#1A1A1A] cursor-pointer select-none">
            Publish this Service (Active)
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
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
          ) : "Update Service"}
        </button>
      </form>
    </div>
  );
}